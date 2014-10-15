angular.module('encore.svcs.encore', ['ngResource', 'encore.util.transform'])
    /**
     * @ngdoc service
     * @name encore.svcs.encore:Encore
     * @description
     * Service for interacting with the EncoreAPI
     *
     * @requires $resource - AngularJS service to extend the $http and wrap Async calls to API's.
     * @requires encore.svcs.encore:EncoreTransformer - Service to create a data transform, to only
     *                       return data at a specific path, mainly used on the response
     */
    .factory('Encore', function ($resource, $cacheFactory, EncoreTransformer, Transform) {
        return $resource('/api/encore/:action/:id/:method',
            {
                id: '@id',
                action: 'accounts'
            },
            {
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
                    params: {
                        method: 'questions'
                    },
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
                    params: {
                        action: 'groups',
                    }
                }
            }
        );
    })
    /**
     * @ngdoc service
     * @name encore.svcs.encore:EncoreTransformer
     * @description
     * Service for transforming responses for different type of Encore API calls.
     */
    .factory('EncoreTransformer', function ($http) {
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
                    users: [ obj.user ]
                });
            });

            data.roles = roles;
            return data;
        };

        return svc;
    });
