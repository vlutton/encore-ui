angular.module('encore.util.transform', [])
    .factory('Pluck', function () {
        var fromPath = function (obj, path) {
            obj = _.reduce(path, function (val, key) {
                return _.has(val, key) ? val[key] : false;
            }, obj);
            return obj;
        };
        return function (path, msgPath) {
            // Pre parse the path into an array
            // Set path to empty string if not given
            var splitPath = _.isEmpty(path) ? [] : path.split('.'),
            msgSplitPath = _.isEmpty(msgPath) ? [] : msgPath.split('.');
            return function (data) {
                var json = angular.fromJson(data),
                errorMsg = fromPath(json, msgSplitPath);
                return errorMsg && !_.isEqual(errorMsg, json) ? errorMsg : fromPath(json, splitPath);
            };
        };
    })
    .service('TransformRequest', function ($http) {
        var svc = {
            customTransform: function (transform) {
                return [svc[transform]].concat($http.defaults.transformRequest);
            },
            updateUserGroups: function (data) {
                return JSON.stringify({
                    'group_ids': _.map(data, function (num) { return num.toString(); })
                });
            },
            addUserAccounts: function (data) {
                return JSON.stringify({
                    'role_id': data.roleId,
                    'account_numbers': data.accounts
                });
            }
        };

        return svc;
    })
    .service('Transform', function ($http, Pluck) {

        var toCamelCase = function (string) {
          return string
              .replace(/[ _](\w)/g, function (_, $1) {
                  return $1.toUpperCase();
              });
        };

        var camelCase = function (data) {
            if (_.isArray(data)) {
                _.forEach(data, function (item) {
                    camelCase(item);
                });
            } else if (_.isObject(data)) {
                _.forEach(_.keys(data), function (oldKey) {
                    var newKey = toCamelCase(oldKey);
                    if (newKey !== oldKey) {
                        data[newKey] = _.cloneDeep(data[oldKey]);
                        delete(data[oldKey]);
                    }

                    if (_.isObject(data[newKey])) {
                        camelCase(data[newKey]);
                    }
                });
            }

            return data;
        };

        var stringToInt = function (num) {
            var val = parseInt(num);
            if (!_.isNaN(val)) {
                return val;
            }
            return num;
        };

        var transformList = function (data) {
            var result = [];
            if (!_.has(data, 'items')) { return result; }

            _.forEach(data.items, function (item) {
                result.push({
                    id: _.has(item, '_links') ? stringToInt(item['_links'].self.id) : -1,
                    name: item.name
                });
            });

            return result;
        };

        var removeLinks = function (data) {
            if (_.isArray(data)) {
                _.forEach(data, function (obj) {
                    _.omit(obj, '_links');
                });
            } else if (_.isObject(data)) {
                _.omit(data, '_links');
            }

            return data;
        };

        var svc = {
            stringToInt: stringToInt,
            customTransform: function (transform) {
                return $http.defaults.transformResponse.concat([svc[transform], removeLinks, camelCase]);
            },
            accountRoles: function (data) {
                var map = {};
                _.forEach(data.users, function (user) {
                    if (!map[user.teamId]) {
                        map[user.teamId] = [];
                    }

                    map[user.teamId].push(user);
                });

                return map;
            },
            group: function (data) {
                data.id = Pluck('_links.self.id')(data);
                return data;
            },
            groups: function (data) {
                data = _.map(data.items, function (i) {
                    i = svc.group(i);
                    return i;
                });

                // Convert ID to integer so groups are sortable by ID
                _.forEach(data, function (obj) {
                    obj.id = stringToInt(obj.id);
                });

                return data;
            },
            user: function (data) {
                var transformRole = function (roleType, data) {
                    if (_.has(data, roleType)) {
                        var roles = [];
                        _.forEach(data[roleType], function (item) {
                            var existingRole = _.find(roles, { name: item.role.name });
                            if (!_.isEmpty(existingRole)) {
                                existingRole.items.push(item);
                                return;
                            }

                            roles.push({
                                name: item.role.name,
                                items: [ item ]
                            });
                        });

                        return roles;
                    }
                };

                data['teamRolesGrouped'] = transformRole('teamRoles', data);
                data['accountRolesGrouped'] = transformRole('accountRoles', data);

                return data;
            },
            note: function (data) {
                _.forEach(data.categories, function (cat) {
                    cat.id = cat['_links'].self.id;
                });
                return data;
            },
            teams: function (data) {
                // Can't return just items here as we need
                // the entire object to figure out pagination
                return data;
            },
            accounts: function (data) {
                return data.items;
            },
            roles: function (data) {
                return transformList(data);
            },
            categories: function (data) {
                return transformList(data);
            },
            bulkResponse: function (data) {
                var result = { success: [] };
                if (!_.has(data, 'items')) { return result; }

                _.forEach(data.items, function (item) {
                    var accountNumber = item['account_number'];
                    if (!item.success) {
                        if (_.has(result, item.message)) {
                            result[item.message].push(accountNumber);
                        } else {
                            result[item.message] = [ accountNumber ];
                        }
                    } else {
                        result.success.push(accountNumber);
                    }
                });

                return result;
            }
        };

        return svc;
    });
