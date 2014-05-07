angular.module('encore.ui.rxUnauthorizedInterceptor', [])
    /**
    *
    * @ngdoc service
    * @name encore.ui.rxUnauthorizedInterceptor:UnauthorizedInterceptor
    * @description
    * Simple injector which will intercept http responses. If a 401 is returned,
    * the ui redirects to /login.
    *
    * @requires $q
    * @requires @window
    *
    * @example
    * <pre>
    * angular.module('encoreApp', ['encore.ui'])
    *     .config(function ($httpProvider) {
    *         $httpProvider.interceptors.push('UnauthorizedInterceptor');
    *     });
    * </pre>
    */
    .factory('UnauthorizedInterceptor', function ($q, $window, $location) {
        return {
            responseError: function (response) {
                var returnPath = $location.absUrl()
                    .replace('://', '') // protocol seperator
                    .replace(':', '') // port seperator
                    .replace($location.protocol(), '')
                    .replace($location.host(), '')
                    .replace($location.port(), '');

                if (response.status === 401) {
                    $window.location = '/login?redirect=' + returnPath;
                }

                return $q.reject(response);
            }
        };
    });
