angular.module('encore.ui.rxSortableColumn', [])
/**
* @ngdoc directive
* @name encore.ui.rxSortableColumn
* @restrict E
*
* @description
* Renders a clickable link in a table heading which will sort the table by
* the referenced property in ascending or descending order.
*
* @param {String} displayText - The text to be displayed in the link
* @param {Function} sortMethod - The sort function to be called when the link is clicked
* @param {String} sortProperty - The property on the array to sort by when the link is clicked.
* @param {Object} predicate - The current property the collection is sorted by.
* @param {Boolean} reverse - Indicates whether the collection should sort the array in reverse order.
*/
.directive('rxSortableColumn', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSortableColumn.html',
        transclude: true,
        scope: {
            sortMethod: '=',
            sortProperty: '@',
            predicate: '=',
            reverse: '='
        }
    };
})
/**
* @ngdoc service
* @name encore.ui.rxSortUtil
* @description
* Service which provided utility methods for sorting collections.
*
* @example
* <pre>
* rxSortUtil.getDefault() // returns a sort object with name as the default.
* rxSortUtil.sortCol($scope, 'name') // sorts the collection based on the predicate
* </pre>
*/
.factory('rxSortUtil', function () {
    var util = {};

    util.getDefault = function (property, reversed) {
        var prop = property ? property : 'name';
        return { predicate: prop, reverse: reversed };
    };

    util.sortCol = function ($scope, predicate) {
        var reverse = ($scope.sort.predicate === predicate) ? !$scope.sort.reverse : false;
        $scope.sort = { reverse: reverse, predicate: predicate };
        $scope.pager.pageNumber = 0;
    };

    return util;
});