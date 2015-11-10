angular.module('encore.ui.rxStatus')
/**
 * @ngdoc service
 * @name rxStatus.service:ErrorFormatter
 * @description
 * Provides a helper method to parse error objects for 'message' and format them
 * as necessary for Status.setError()
 */
.factory('ErrorFormatter', function () {
    /*
     * formatString is a string with ${message} in it somewhere, where ${message}
     * will come from the `error` object. The `error` object either needs to have
     * a `message` property, or a `statusText` property.
     */
    var buildErrorMsg = function (formatString, error) {
        error = error || {};
        if (!_.has(error, 'message')) {
            error.message = _.has(error, 'statusText') ? error.statusText : 'Unknown error';
        }
        return _.template(formatString, error);
    };

    return {
        buildErrorMsg: buildErrorMsg
    };
});
