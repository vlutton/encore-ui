angular.module('encore.ui.rxSession', ['encore.ui.rxLocalStorage'])
/**
    *
    * @ngdoc service
    * @name encore.ui.rxSession:Session
    * @description
    * Service for managing user session in encore-ui.
    *
    * @requires encore.ui.rxLocalStorage:LocalStorage
    *
    * @example
    * <pre>
    * Session.getToken(); //Returns the stored token
    * Session.storeToken(token); //Stores token
    * Session.logoff(); //Logs user off
    * Session.isCurrent(); //Returns true/false if the token has expired.
    * Session.isAuthenticated(); //Returns true/false if the user token is valid.
    * </pre>
    */
    .factory('Session', function (LocalStorage) {
        var TOKEN_ID = 'encoreSessionToken';
        var session = {};

        session.getToken = function () {
            return LocalStorage.getObject(TOKEN_ID);
        };

        session.getTokenId = function () {
            var token = session.getToken();
            return (token && token.access && token.access.token) ?
                token.access.token.id : undefined;
        };

        session.storeToken = function (token) {
            LocalStorage.setObject(TOKEN_ID, token);
        };

        session.logoff = function () {
            LocalStorage.removeItem(TOKEN_ID);
        };

        session.isCurrent = function () {
            var token = session.getToken();

            //Conditional to prevent null exceptions when validating the token
            if (token && token.access && token.access.token &&
                token.access.token.expires) {

                return new Date(token.access.token.expires) > _.now();
            }

            return false;
        };

        session.isAuthenticated = function () {
            var token = session.getToken();
            return _.isEmpty(token) ? false : session.isCurrent();
        };

        return session;
    });
