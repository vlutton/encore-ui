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
        var permissionSvc = {},
            trim = String.prototype.trim,
            call = Function.prototype.call;

        permissionSvc.getRoles = function () {
            var token = Session.getToken();
            return (token && token.access && token.access.user && token.access.user.roles) ?
                token.access.user.roles : [];
        };

        permissionSvc.hasRole = function (role) {
            return _.some(this.getRoles(), function (item) {
                return item.name === role;
            });
        };

        permissionSvc.hasRoles = function (roles) {
            if (_.isString(roles)) {
                roles = roles.split(',');
                roles = roles.map(call, trim);
            }
            return !_(this.getRoles()).pluck('name').intersection(roles).isEmpty();
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
                role: '@',
                roles: '@'
            },
            templateUrl: 'templates/rxPermission.html',
            controller: function ($scope, Permission) {
                $scope.hasRole = function (role) {
                    return Permission.hasRole(role);
                };
                $scope.hasRoles = function (roles) {
                    return Permission.hasRoles(roles);
                };
            }
        };
    });
