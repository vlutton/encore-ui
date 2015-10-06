/**
 * @ngdoc overview
 * @name rxPermission
 * @description
 * # rxPermission Component
 * The rxPermission component provides functionality to perform checks against existing user permissions in 
 * EncoreUI.  It provides a {@link rxPermission.service:Permission Permission} service for working with roles, and 
 * a {@link rxPermission.directive:rxPermission rxPermission} directive for excluding DOM content based on roles.
 *
 * ## Services
 * * {@link rxPermission.service:Permission Permission}
 *
 * ## Directives
 * * {@link rxPermission.directive:rxPermission rxPermission}
 */
angular.module('encore.ui.rxPermission', ['encore.ui.rxSession'])
/**
 * @ngdoc service
 * @name rxPermission.service:Permission
 * @description
 * Simple service for accessing roles and permissions for a user.
 * 
 * @requires rxSession.service:Session
 *
 * @example
 * <pre>
 * Permission.getRoles() //returns an array of roles for a user
 * Permission.hasRole(role) //returns true/false if user has specified role
 * </pre>
 */
.factory('Permission', function (Session) {
    var permissionSvc = {};

    var cleanRoles = function (roles) {
        return roles.split(',').map(function (r) {
            return r.trim();
        });
    };

    var userRoles = function () {
        return _.pluck(permissionSvc.getRoles(), 'name');
    };
 
    /**
     * @description Takes a function and a list of roles, and returns the
     * result of calling that function with `roles`, and comparing to userRoles().
     * 
     * @param {function} fn - Comparison function to use. _.any, _.all, etc.
     * @param {array} roles - List of desired roles
     */
    var checkRoles = function (roles, fn) {
        // Some code expects to pass a comma-delimited string
        // here, so turn that into an array
        if (_.isString(roles)) {
            roles = cleanRoles(roles);
        }

        var allUserRoles = userRoles();
        return fn(roles, function (role) {
            return _.contains(allUserRoles, role);
        });
    };

    /**
     * @name  getRoles
     * @ngdoc method
     * @methodOf rxPermission.service:Permission
     * @description
     * Fetch all the roles tied to the user (in the exact format available in their Session token).
     * 
     * @returns {Array} List of all roles associated to the user.
     */
    permissionSvc.getRoles = function () {
        var token = Session.getToken();
        return (token && token.access && token.access.user && token.access.user.roles) ?
            token.access.user.roles : [];
    };

    /**
     * @name  hasRole
     * @ngdoc method
     * @methodOf rxPermission.service:Permission 
     * @description Check if user has at least _one_ of the given roles.
     * @param {Array} roles List of roles to check against
     * @returns {Boolean} True if user has at least _one_ of the given roles; otherwise, False.
     */
    permissionSvc.hasRole = function (roles) {
        return checkRoles(roles, _.any);
    };

    /**
     * @name  hasAllRoles
     * @ngdoc method
     * @methodOf rxPermission.service:Permission 
     * @description Checks if user has _every_ role in given list.
     * @param {Array} roles List of roles to check against
     * @returns {Boolean} True if user has _every_ role in given list; otherwise, False.
     * 
     */
    permissionSvc.hasAllRoles = function (roles) {
        return checkRoles(roles, _.all);
    };

    return permissionSvc;
})
/**
 * @ngdoc directive
 * @name rxPermission.directive:rxPermission
 * @restrict E
 * @scope
 * @description
 * Simple directive which will show or hide content based on whether or not the user has the specified role. See 
 * the `rxPermission` component {@link /#/components/rxPermission demo} for an example.
 * 
 * @requires rxPermission.service:Permission
 *
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
            $scope.hasRole = function (roles) {
                return Permission.hasRole(roles);
            };
        }
    };
});
