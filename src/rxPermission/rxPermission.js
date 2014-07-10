angular.module('encore.ui.rxPermission', ['encore.ui.rxSession'])
    /**
    *
    * @ngdoc service
    * @name encore.ui.rxPermission:Permission
    * @description
    * Simple service for accessing roles and permissions for a user.
    * @requires encore.ui.rxSession:Session
    *
    * @example
    * <pre>
    * Permission.getRoles() //returns an array of roles for a user
    * Permission.hasRole(role) //returns true/false if user has specified role
    * </pre>
    */
    .factory('Permission', function (Session) {
        var permissionSvc = {};
        var delimiterRegex = /\s?,\s?/g;
        
        permissionSvc.getRoles = function () {
            var token = Session.getToken();
            return (token && token.access && token.access.user && token.access.user.roles) ?
                token.access.user.roles : [];
        };

        permissionSvc.hasRole = function (role) {
            role = role.replace(delimiterRegex, ',');
            role = role.split(',');
            
            // Get all the role names
            var userRoles = _.pluck(this.getRoles(), 'name');
            var commonRoles = _.intersection(userRoles, role);

            return !_.isEmpty(commonRoles);
        };

        return permissionSvc;
    })
    /**
    * @ngdoc directive
    * @name encore.ui.rxPermission:rxPermission
    * @restrict E
    * @description
    * Simple directive which will show or hide content if user specified role.
    * @requires encore.ui.rxPermission:Permission
    *
    * @scope
    * @param {String} role - Name of required role.
    */
    .directive('rxPermission', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                role: '@'
            },
            templateUrl: 'templates/rxPermission.html',
            controller: function ($scope, Permission) {
                $scope.hasRole = function (role) {
                    return Permission.hasRole(role);
                };
            }
        };
    });
