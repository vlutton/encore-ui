angular.module('encore.ui.rxUnauthorizedInterceptor', ['encore.ui.rxSession'])
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
    * @requires encore.ui.rxSession:Session
    *
    * @example
    * <pre>
    * angular.module('encoreApp', ['encore.ui'])
    *     .config(function ($httpProvider) {
    *         $httpProvider.interceptors.push('UnauthorizedInterceptor');
    *     });
    * </pre>
    */
    .factory('UnauthorizedInterceptor', function ($q, $window, Session) {
        var svc = {
            redirectPath: function () {
                return $window.location.pathname;
            },
            redirect: function (loginPath) {
                loginPath = loginPath ? loginPath : '/login?redirect=';
                $window.location = loginPath + encodeURIComponent(svc.redirectPath());
            },
            responseError: function (response) {
                if (response.status === 401) {
                    Session.logout(); // Logs out user by removing token
                    svc.redirect();
                }

                return $q.reject(response);
            }
        };

        return svc;
    });
