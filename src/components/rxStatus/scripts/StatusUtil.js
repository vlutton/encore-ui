angular.module('encore.ui.rxStatus')
/**
 * @ngdoc service
 * @name rxStatus.service:StatusUtil
 * @description
 * Manipulates references to needed $scope input for proper notification functionality
 *
 * @example
 * <pre>
 * $rootScope.$on('$routeChangeSuccess', function () {
 *     Status.setScope(); // no input results in $rootScope being used
 *     Status.setUtil($rootScope); // forcibly set $rootScope as the scope to be used
 * });
 * </pre>
 */
.service('StatusUtil', function ($route, $rootScope, Status) {
    return {
        setupScope: function (scope) {
            Status.setScope(scope || $rootScope);
        }
    };
});
