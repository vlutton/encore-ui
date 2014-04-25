angular.module('encore.ui.rxTokenInterceptor', ['encore.ui.rxSession'])
    /**
    *
    * @ngdoc service
    * @name encore.ui.rxTokenInjector:TokenInjector
    * @description
    * Simple injector which will intercept http request and inject the
    * Rackspace Identity's token into every http request.
    *
    * @requires encore.ui.rxSession:Session
    *
    * @example
    * <pre>
    * angular.module('encoreApp', ['encore.ui'])
    *     .config(function ($httpProvider) {
    *         $httpProvider.interceptors.push('TokenInterceptor');
    *     });
    * </pre>
    */
    .factory('TokenInterceptor', function (Session) {
        return {
            request: function (config) {
                config.headers['X-Auth-Token'] = Session.getTokenId();
            }
        };
    });
