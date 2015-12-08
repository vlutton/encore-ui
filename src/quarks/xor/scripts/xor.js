angular.module('encore.ui.quarks')
/**
 * @ngdoc filter
 * @name quarks.filter:xor
 * @description
 * Returns the exclusive or of two arrays.
 *
 * @param {Array} array The first input array
 * @param {Array} excluded The second input array
 * @returns {Array} - A new array of the unique elements in each array.
 */
.filter('xor', function () {
    return function () {
        return _.xor.apply(_, arguments);
    };
});
