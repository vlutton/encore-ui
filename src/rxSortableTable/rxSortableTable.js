(function () {

    /**
    * @ngdoc directive
    * @name encore.ui.rxSortableTable:rxSortableTable
    * @restrict A
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
    angular.module('encore.ui.rxSortableTable', [])
    .directive('rxSortableTable', function () {

        function compile(element, attributes) {

            // Append click handler to header
            var keys = attributes.keys.split(',');
            angular.forEach(element.find('thead').find('th'), function (e) {
                var key = keys.shift().trim();
                e.insertAdjacentHTML('beforeend', '<span ng-class="getArrowClass(\'' + key + '\')" flex></span>');
                e.setAttribute('ng-click', 'sortColumn(\'' + key + '\')');
            });

            // Append sort filter to ng-repeat
            var tr = element.find('tbody').find('tr');
            tr.attr('ng-repeat', tr.attr('ng-repeat') + ' | orderBy:sortKey:sortReverse');

            return link;
        }

        function link ($scope, element, attributes) {
            var scope = $scope;
            scope.sortReverse = false;
            scope.sortKey = attributes.keys.substr(0, attributes.keys.indexOf(','));

            scope.sortColumn = function (key) {
                scope.sortReverse = (key === scope.sortKey ? !scope.sortReverse : false);
                scope.sortKey = key;
            };

            scope.getArrowClass = function (key) {
                if (scope.sortKey == key) {
                    return 'arrow ' + (scope.sortReverse ? 'desc' : 'asc');
                }
                return '';
            };
        }

        return {
            compile: compile,
            restrict: 'A',
            scope: true
        };
    });

})();