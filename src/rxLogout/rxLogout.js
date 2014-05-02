angular.module('encore.ui.rxLogout', [])
.directive('rxLogout', function ($rootScope, Auth) {
    return {
        restrict: 'A',
        controller: function ($scope, $window) {
            var success = function () {
                // fire event to notify auth service about logout
                $rootScope.$broadcast('event:auth-loginRequired');
            };

            $scope.logout = function () {
                Auth.logout(success);
                $window.location = '/login';
            };
        },
        link: function (scope, element) {
            var handleClick = function (ev) {
                if (ev && ev.preventDefault) {
                    ev.preventDefault();
                }

                scope.logout();
            };

            element.bind('click', handleClick);
        }
    };
});
