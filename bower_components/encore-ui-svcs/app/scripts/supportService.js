angular.module('encore.svcs.supportService', ['ngResource', 'encore.util.transform'])
    /**
    * @ngdoc filter
    * @name encore.svcs.supportSvcs:RoleName
    * @description
    * Filter a list of account roles by a specific name.
    *
    * @param {Array} roles - collection of Contacts to be filtered.
    * @param {String} name - Key to filter by
    */
    .filter('RoleName', function () {
        return function (roles, name) {
            return _.filter(roles, { role: { name: name }});
        };
    })
   /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:SupportAccount
    * @description
    * SupportAccount Service for interaction with Support Service Account Details API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    */
    .factory('SupportAccount', function ($resource, $q, Q, Pluck, RoleNameFilter) {
        var transform = Pluck('items', '');
        var account = $resource('/api/support/support-accounts/:accountNumber/:relation',
                {
                    accountNumber: '@accountNumber'
                },
                {
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
                    update: {
                        method: 'PUT',
                    },
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
            account.getRoles(
                { accountNumber: accountNumber },
                function (roles) {
                    var result = _.first(RoleNameFilter(roles, name));
                    if (!_.isEmpty(result)) {
                        return deferred.resolve(result.user);
                    }
                    deferred.resolve(undefined);
                },
                function (err) {
                    deferred.reject(err.data);
                });
            return deferred.promise;
        };

        account.addTeams = function (accountNumber, teamIds, type) {
            var errors = {
                others: [],
                invalidTeams: [],
            };
            var promises = [];

            _.forEach(teamIds, function (id) {
                var resource = account.update(
                    {
                        accountNumber: accountNumber,
                        relation: 'teams'
                    },
                    {
                        team: {
                            number: id.toString(),
                            type: type
                        }
                    },
                    function () {
                        return '';
                    },
                    function (err) {
                        if (err.data.description.match(/does not exist/)) {
                            return errors.invalidTeams.push(err.config.data.team.number);
                        }
                        $q.reject(err.data.description);
                    }
                );

                promises.push(resource.$promise);
            });

            return Q.allSettled(promises)
            .then(null, function (err) {
                errors.others.push(err.data.description);
            })
            .finally(function () {
                return $q.reject(errors);
            });
        };

        return account;
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Roles
    * @description
    * SupportRoles Service for interaction with Support Service Roles API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    * @requires Transform - Service used to transform JSON response from the API.
    */
    .factory('Roles', function ($resource, Transform) {
        return $resource('/api/support/roles/:id',
            null,
            {
                query: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: Transform.customTransform('roles')
                }
            });
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Teams
    * @description
    * Teams Service for interaction with Support Service Teams API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    * @requires $q - AngularJS promise library for interacting with Search API
    * @requires Transform - Service used to transform JSON response from the API.
    */
    .factory('Teams', function ($resource, $q, Transform) {
        var svc = $resource('/api/support/teams/:id/:relation',
            null,
            {
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
                    },
                },
                addAccounts: {
                    method: 'POST',
                    params: { relation: 'accounts' },
                    transformResponse: Transform.customTransform('bulkResponse')
                },
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
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Users
    * @description
    * Users Service for interaction with Support Service Users API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    * @requires Transform - Service used to transform JSON response from the API.
    * @requires TransformRequest - Service used to transform UI requests send to the API.
    */
    .factory('Users', function ($resource, Transform, TransformRequest) {
        return $resource('/api/support/users/:sso/:relation',
            null,
            {
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
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Groups
    * @description
    * Groups Service for interaction with Support Service Groups API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    * @requires Transform - Service used to transform JSON response from the API.
    */
    .factory('Groups', function ($resource, Transform) {
        return $resource('/api/support/groups/:id',
            null,
            {
                search: {
                    method: 'GET',
                    isArray: true,
                    transformResponse: Transform.customTransform('groups')
                }
            });
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Badges
    * @description
    * Badges Service for interaction with Support Service Badges API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    */
    .factory('Badges', function ($resource) {
        return $resource('/api/support/badges/:id');
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Categories
    * @description
    * Categories Service for interaction with Support Service Categories API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    * @requires Transform - Service used to transform JSON response from the API.
    */
    .factory('Categories', function ($resource, Transform) {
        return $resource('/api/support/note-categories/:id',
            null,
            {
                query: {
                    method: 'GET',
                    cache: true,
                    transformResponse: Transform.customTransform('categories'),
                    isArray: true
                },
                update: {
                    method: 'PUT'
                }
            }
        );
    })
    /**
    * @ngdoc service
    * @name encore.svcs.supportSvcs:Notes
    * @description
    * Notes Service for interaction with Support Service Roles API
    *
    * @requires $resource - AngularJS service to extend the $http and wrap AJAX calls to API's.
    * @requires Transform - Service used to transform JSON response from the API.
    */
    .factory('Notes', function ($resource, Transform) {
        return $resource('/api/support/support-accounts/:accountNumber/notes',
            {
                accountNumber: '@accountNumber'
            },
            {
                save: { method: 'POST', transformResponse: Transform.customTransform('note') }
            });
    })
    // TODO convert this to an addon of for $q
    .service('Q', function ($q) {
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
                    (hasPromiseFailed) ? deferred.reject(data) : deferred.resolve(data);
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

        return {
            allSettled: allSettled
        };
    });
