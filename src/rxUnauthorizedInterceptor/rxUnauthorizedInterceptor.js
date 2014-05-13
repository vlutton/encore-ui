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
                // If one uses the <base /> tag, $location's API is unable to
                // give us a proper path(). Therefore, we have to grab the current
                // browser URL and fetch the proper portion to return to after login.
                //
                // For Example:
                // <base href="/app"></base>
                // current URL: /app/path
                // $location.path(): /path
                // $location.absUrl(): https://localhost:9000/app/path
                var returnPath = '/' + $location.absUrl().split('/').splice(3).join('/');
                if (response.status === 401) {
                    $window.location = '/login?redirect=' + returnPath;
                }

                return $q.reject(response);
            }
        };
    });
