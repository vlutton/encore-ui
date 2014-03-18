angular.module('encore.ui.rxIdentity', ['ngResource'])
    .factory('Identity', function ($resource) {
        var authSvc = $resource('/identity/:action',
            {},
            {
                loginWithJSON: { method: 'POST', isArray: false, params: { action: 'tokens' }},
                validate: { method: 'GET', url: '/identity/login/session/:id', isArray: false }
            });

        authSvc.login = function (credentials, success, error) {
            var body = {
                auth: {
                    passwordCredentials: {
                        username: credentials.username,
                        password: credentials.password
                    }
                }
            };

            return authSvc.loginWithJSON(body, success, error);
        };

        return authSvc;
    });
