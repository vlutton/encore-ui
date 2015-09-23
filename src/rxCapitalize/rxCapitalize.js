/**
 * @ngdoc overview
 * @name rxCapitalize
 * @description
 * # rxCapitalize Component
 *
 * Capitalizes the first word in a string.
 *
 * ## Filters
 * * {@link rxCapitalize.filter:rxCapitalize rxCapitalize}
 */
angular.module('encore.ui.rxCapitalize', [])
/**
 * @ngdoc filter
 * @name rxCapitalize.filter:rxCapitalize
 * @description
 * Filter for `rxCapitalize`
 */
.filter('rxCapitalize', function () {
    return function (input) {
        if (!_.isString(input)) {
            return '';
        }
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});
