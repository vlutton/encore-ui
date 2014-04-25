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
    .factory('UnauthorizedInterceptor', function ($q, $window) {
        return {
            responseError: function (response) {
                if (response.status === 401) {
                    $window.location = '/login';
                }

                return $q.reject(response);
            }
        };
    });
