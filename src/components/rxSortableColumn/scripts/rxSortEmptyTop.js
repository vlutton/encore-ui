angular.module('encore.ui.rxSortableColumn')
/**
 * @ngdoc filter
 * @name rxSortableColumn.filter:rxSortEmptyTop
 * @description
 *
 * Filter that moves rows with an empty predicate to the top of the column in
 * ascending order, and to the bottom in descending order.
 *
 * @example
 * <pre>
 * [{ name: { firstName: 'Adam' } }, { }] | rxSortEmptyTop 'name.firstName':false
 * Will sort as [{}, { name: { firstName: 'Adam' } }].
 *
 * [{ name: { firstName: 'Adam' } }, { name: { firstName: null } ] | rxSortEmptyTop 'name.firstName':true
 * Will sort as [{ name: { firstName: 'Adam' } }, {}]
 * </pre>
 */
.filter('rxSortEmptyTop', ['$filter', '$parse', function ($filter, $parse) {
    return function (array, key, reverse) {

        var predicateGetter = $parse(key);

        var sortFn = function (item) {
            return predicateGetter(item) || '';
        };

        return $filter('orderBy')(array, sortFn, reverse);
    };
}]);
