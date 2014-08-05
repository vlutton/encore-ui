angular.module('encore.ui.rxLogout', ['encore.ui.rxAuth'])
/**
* @ngdoc directive
* @name encore.ui.rxLogout:rxLogout
* @restrict A
* @scope
* @description
* Adds logout functionality to an element
*
* @param {string} [rxLogout] URL to redirect to after logging out
*
* @example
* <button rx-logout>Logout</button>
* <button rx-logout="/custom">Logout (w/ custom location)</button>
*/
.directive ('rxLogout', function (Auth, $window, $location) {
    return {
        restrict: 'A',
        scope: {
            rxLogout: '@'
        },
        link: function (scope, element) {
            // if URL not provided to redirect to, use default location
            scope.logoutUrl = (_.isString(scope.rxLogout) && scope.rxLogout.length > 0) ? scope.rxLogout : '/login';

            element.on('click', function () {
                Auth.logout();

                // check if in HTML5 Mode or not (if not, add hashbang)
                // @see http://stackoverflow.com/a/23624785
                if (!$location.$$html5) {
                    scope.logoutUrl = '#' + scope.logoutUrl;
                }

                $window.location = scope.logoutUrl;
            });
        }
    };
});