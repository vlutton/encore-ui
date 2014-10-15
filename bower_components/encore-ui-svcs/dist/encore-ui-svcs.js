angular.module('encore.svcs.customerAdmin', [
  'ngResource',
  'encore.util.transform'
]).factory('Account', [
  '$resource',
  function ($resource) {
    return $resource('/api/customer-admin/customer_accounts/:type/:accountNumber', {
      accountNumber: '@accountNumber',
      type: '@type'
    }, {
      get: {
        cache: true,
        params: { type: 'CLOUD' }
      }
    });
  }
]).factory('Contact', [
  '$resource',
  'Pluck',
  function ($resource, Pluck) {
    var transformList = Pluck('contact');
    return $resource('/api/customer-admin/customer_accounts/:type/:accountNumber/contacts', { accountNumber: '@accountNumber' }, {
      list: {
        method: 'GET',
        isArray: true,
        transformResponse: transformList,
        params: {
          type: 'CLOUD',
          marker: 1,
          limit: 10
        }
      }
    });
  }
]);angular.module('encore.svcs.encore', [
  'ngResource',
  'encore.util.transform'
]).factory('Encore', [
  '$resource',
  '$cacheFactory',
  'EncoreTransformer',
  'Transform',
  function ($resource, $cacheFactory, EncoreTransformer, Transform) {
    return $resource('/api/encore/:action/:id/:method', {
      id: '@id',
      action: 'accounts'
    }, {
      search: {
        method: 'GET',
        params: {
          term: '@id',
          action: 'search'
        }
      },
      getAccount: {
        method: 'GET',
        transformResponse: EncoreTransformer.customTransformResponse('convertRoles')
      },
      getAccountNotes: {
        method: 'GET',
        cache: true,
        params: {
          action: 'accounts',
          method: 'notes'
        }
      },
      getAccountByIdentityUsername: {
        method: 'GET',
        params: {
          action: 'users',
          method: 'account'
        },
        cache: $cacheFactory('encore-account-identity')
      },
      getQuestions: {
        method: 'GET',
        params: { method: 'questions' },
        transformResponse: EncoreTransformer.customTransformResponse('convertQuestions')
      },
      getTeam: {
        method: 'GET',
        isArray: false,
        params: {
          action: 'teams',
          method: null
        },
        transformResponse: EncoreTransformer.customTransformResponse('convertRoles')
      },
      getAllTeams: {
        method: 'GET',
        isArray: true,
        cache: true,
        params: { action: 'teams' },
        transformResponse: Transform.customTransform('teams')
      },
      getTeamAccounts: {
        method: 'GET',
        isArray: true,
        param: {
          action: 'teams',
          method: 'accounts'
        }
      },
      getTeamUsers: {
        method: 'GET',
        isArray: true,
        param: {
          action: 'teams',
          method: 'users'
        }
      },
      getUser: {
        method: 'GET',
        transformResponse: Transform.customTransform('user')
      },
      getGroups: {
        method: 'GET',
        params: { action: 'groups' }
      }
    });
  }
]).factory('EncoreTransformer', [
  '$http',
  function ($http) {
    var svc = {};
    svc.customTransformResponse = function (transform) {
      return $http.defaults.transformResponse.concat([svc[transform]]);
    };
    svc.convertQuestions = function (data) {
      var map = {};
      _.each(data.questions, function (question) {
        map[question.userId] = question;
      });
      return map;
    };
    svc.convertRoles = function (data) {
      if (!_.has(data, 'roles') || _.isEmpty(data.roles)) {
        return data;
      }
      var roles = [];
      _.forEach(data.roles, function (obj) {
        var existingRole = _.find(roles, { name: obj.role.name });
        if (!_.isEmpty(existingRole)) {
          existingRole.users.push(obj.user);
          return;
        }
        roles.push({
          name: obj.role.name,
          users: [obj.user]
        });
      });
      data.roles = roles;
      return data;
    };
    return svc;
  }
]);angular.module('encore.svcs.supportService', [
  'ngResource',
  'encore.util.transform'
]).filter('RoleName', function () {
  return function (roles, name) {
    return _.filter(roles, { role: { name: name } });
  };
}).factory('SupportAccount', [
  '$resource',
  '$q',
  'Q',
  'Pluck',
  'RoleNameFilter',
  function ($resource, $q, Q, Pluck, RoleNameFilter) {
    var transform = Pluck('items', '');
    var account = $resource('/api/support/support-accounts/:accountNumber/:relation', { accountNumber: '@accountNumber' }, {
        getRoles: {
          method: 'GET',
          params: { relation: 'roles' },
          isArray: true,
          transformResponse: transform
        },
        getTeams: {
          method: 'GET',
          params: { relation: 'teams' },
          isArray: true,
          transformResponse: transform
        },
        update: { method: 'PUT' },
        getNotes: {
          method: 'GET',
          params: { relation: 'notes' },
          isArray: true,
          transformResponse: transform
        },
        getBadges: {
          method: 'GET',
          params: { relation: 'badges' },
          isArray: true,
          transformResponse: transform
        },
        removeUser: {
          method: 'DELETE',
          params: {
            'user_sso': '@sso',
            'role_id': '@roleId',
            relation: 'roles'
          }
        }
      });
    account.getRoleByName = function (accountNumber, name) {
      var deferred = $q.defer();
      account.getRoles({ accountNumber: accountNumber }, function (roles) {
        var result = _.first(RoleNameFilter(roles, name));
        if (!_.isEmpty(result)) {
          return deferred.resolve(result.user);
        }
        deferred.resolve(undefined);
      }, function (err) {
        deferred.reject(err.data);
      });
      return deferred.promise;
    };
    account.addTeams = function (accountNumber, teamIds, type) {
      var errors = {
          others: [],
          invalidTeams: []
        };
      var promises = [];
      _.forEach(teamIds, function (id) {
        var resource = account.update({
            accountNumber: accountNumber,
            relation: 'teams'
          }, {
            team: {
              number: id.toString(),
              type: type
            }
          }, function () {
            return '';
          }, function (err) {
            if (err.data.description.match(/does not exist/)) {
              return errors.invalidTeams.push(err.config.data.team.number);
            }
            $q.reject(err.data.description);
          });
        promises.push(resource.$promise);
      });
      return Q.allSettled(promises).then(null, function (err) {
        errors.others.push(err.data.description);
      }).finally(function () {
        return $q.reject(errors);
      });
    };
    return account;
  }
]).factory('Roles', [
  '$resource',
  'Transform',
  function ($resource, Transform) {
    return $resource('/api/support/roles/:id', null, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: Transform.customTransform('roles')
      }
    });
  }
]).factory('Teams', [
  '$resource',
  '$q',
  'Transform',
  function ($resource, $q, Transform) {
    var svc = $resource('/api/support/teams/:id/:relation', null, {
        query: {
          method: 'GET',
          transformResponse: Transform.customTransform('teams')
        },
        accounts: {
          method: 'GET',
          params: { relation: 'accounts' },
          isArray: true,
          transformResponse: Transform.customTransform('accounts')
        },
        addUser: {
          method: 'PUT',
          params: { relation: 'roles' }
        },
        removeUser: {
          method: 'DELETE',
          params: {
            'user_sso': '@sso',
            'role_id': '@roleId',
            relation: 'roles'
          }
        },
        addAccounts: {
          method: 'POST',
          params: { relation: 'accounts' },
          transformResponse: Transform.customTransform('bulkResponse')
        }
      });
    svc.search = function (args) {
      var result = [];
      var deferred = $q.defer();
      var callback = function (teams) {
        result = result.concat(teams.items);
        if (!teams.nextPage) {
          // Convert team number to integer for proper sorting
          _.forEach(result, function (obj) {
            obj.number = Transform.stringToInt(obj.number);
          });
          return deferred.resolve(result);
        }
        window.url.setUrl(teams.nextPage);
        args.page = window.url.page;
        svc.query(args).$promise.then(callback);
      };
      svc.query(args).$promise.then(callback);
      return deferred.promise;
    };
    return svc;
  }
]).factory('Users', [
  '$resource',
  'Transform',
  'TransformRequest',
  function ($resource, Transform, TransformRequest) {
    return $resource('/api/support/users/:sso/:relation', null, {
      addAccounts: {
        method: 'POST',
        params: { relation: 'account-roles' },
        transformRequest: TransformRequest.addUserAccounts,
        transformResponse: Transform.customTransform('bulkResponse')
      },
      getGroups: {
        method: 'GET',
        params: { relation: 'groups' },
        transformResponse: Transform.customTransform('groups')
      },
      updateGroups: {
        method: 'PUT',
        params: { relation: 'groups' },
        transformRequest: TransformRequest.updateUserGroups
      }
    });
  }
]).factory('Groups', [
  '$resource',
  'Transform',
  function ($resource, Transform) {
    return $resource('/api/support/groups/:id', null, {
      search: {
        method: 'GET',
        isArray: true,
        transformResponse: Transform.customTransform('groups')
      }
    });
  }
]).factory('Badges', [
  '$resource',
  function ($resource) {
    return $resource('/api/support/badges/:id');
  }
]).factory('Categories', [
  '$resource',
  'Transform',
  function ($resource, Transform) {
    return $resource('/api/support/note-categories/:id', null, {
      query: {
        method: 'GET',
        cache: true,
        transformResponse: Transform.customTransform('categories'),
        isArray: true
      },
      update: { method: 'PUT' }
    });
  }
]).factory('Notes', [
  '$resource',
  'Transform',
  function ($resource, Transform) {
    return $resource('/api/support/support-accounts/:accountNumber/notes', { accountNumber: '@accountNumber' }, {
      save: {
        method: 'POST',
        transformResponse: Transform.customTransform('note')
      }
    });
  }
]).service('Q', [
  '$q',
  function ($q) {
    // Because $q does not have an 'allSettled' function, we need to recreate the functionality
    // so, we'll manually check if all the promises have been resolved, and respond accordingly
    /*
         * Creates a new promise that resolves only when all promises have completed
         * @param {Array} promises - The promises that we're going to wait for
         * @returns {Object} Promise tied to promises passed in
         */
    var allSettled = function (promises) {
      var deferred = $q.defer();
      var promisesCount = promises.length;
      var promisesComplete = 0;
      /*
             * increments the number of resolved promises, checks if they've all resolved,
             * and resolves parent promise accordingly
             */
      var resolvePromise = function (data, hasPromiseFailed) {
        promisesComplete++;
        if (promisesComplete === promisesCount) {
          hasPromiseFailed ? deferred.reject(data) : deferred.resolve(data);
        }
      };
      var rejectPromise = function (data) {
        resolvePromise(data, true);
      };
      _.each(promises, function (promise) {
        promise.then(resolvePromise, rejectPromise);
      });
      return deferred.promise;
    };
    return { allSettled: allSettled };
  }
]);angular.module('encore.util.transform', []).factory('Pluck', function () {
  var fromPath = function (obj, path) {
    obj = _.reduce(path, function (val, key) {
      return _.has(val, key) ? val[key] : false;
    }, obj);
    return obj;
  };
  return function (path, msgPath) {
    // Pre parse the path into an array
    // Set path to empty string if not given
    var splitPath = _.isEmpty(path) ? [] : path.split('.'), msgSplitPath = _.isEmpty(msgPath) ? [] : msgPath.split('.');
    return function (data) {
      var json = angular.fromJson(data), errorMsg = fromPath(json, msgSplitPath);
      return errorMsg && !_.isEqual(errorMsg, json) ? errorMsg : fromPath(json, splitPath);
    };
  };
}).service('TransformRequest', [
  '$http',
  function ($http) {
    var svc = {
        customTransform: function (transform) {
          return [svc[transform]].concat($http.defaults.transformRequest);
        },
        updateUserGroups: function (data) {
          return JSON.stringify({
            'group_ids': _.map(data, function (num) {
              return num.toString();
            })
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
  }
]).service('Transform', [
  '$http',
  'Pluck',
  function ($http, Pluck) {
    var toCamelCase = function (string) {
      return string.replace(/[ _](\w)/g, function (_, $1) {
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
            delete data[oldKey];
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
      if (!_.has(data, 'items')) {
        return result;
      }
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
          return $http.defaults.transformResponse.concat([
            svc[transform],
            removeLinks,
            camelCase
          ]);
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
                  items: [item]
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
          if (!_.has(data, 'items')) {
            return result;
          }
          _.forEach(data.items, function (item) {
            var accountNumber = item['account_number'];
            if (!item.success) {
              if (_.has(result, item.message)) {
                result[item.message].push(accountNumber);
              } else {
                result[item.message] = [accountNumber];
              }
            } else {
              result.success.push(accountNumber);
            }
          });
          return result;
        }
      };
    return svc;
  }
]);