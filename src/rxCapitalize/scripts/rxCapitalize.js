angular.module('encore.ui.rxCapitalize')
/**
 * @ngdoc filter
 * @name rxCapitalize.filter:rxCapitalize
 * @description
 * The `rxCapitalize` filter capitalizes the first word in a string.
 */
.filter('rxCapitalize', function () {
    return function (input) {
        if (!_.isString(input)) {
            return '';
        }
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});
