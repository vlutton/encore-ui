/**
 * @ngdoc overview
 * @name rxSearchBox
 * @description
 * # rxSearchBox Component
 *
 * The rxSearchBox component provides functionality around creating a search input box.
 *
 * ## Directives
 * * {@link rxSearchBox.directive:rxSearchBox rxSearchBox}
 */
angular.module('encore.ui.rxSearchBox', [])
/**
 * @name rxSearchBox.directive:rxSearchBox
 * @ngdoc directive
 * @restrict E
 * @description
 * The rxSearchBox directive behaves similar to the HTML "Search" input type. When
 * the search box is not empty, an "X" button within the element will allow you to
 * clear the value. Once clear, the "X" will disappear. A disabled search box cannot
 * be cleared of its value via the "X" button because the button will display.
 *
 * @param {String} ng-model Model value to bind the search value.
 * @param {Boolean=} ng-disabled Boolean value to enable/disable the search box.
 * @param {String=} [ng-placeholder='Search...'] String to override the default placeholder.
 *
 * @example
 * <pre>
 * <rx-search-box ng-model="searchModel"></rx-search-box>
 * </pre>
 */
.directive('rxSearchBox', function () {
    return {
        restrict: 'E',
        require: ['ngModel', '?^rxFloatingHeader'],
        templateUrl: 'templates/rxSearchBox.html',
        scope: {
            searchVal: '=ngModel',
            isDisabled: '@ngDisabled',
            rxPlaceholder: '=?'
        },
        controller: function ($scope) {
            $scope.searchVal = $scope.searchVal || '';
            $scope.rxPlaceholder = $scope.rxPlaceholder || 'Search...';

            $scope.$watch('searchVal', function (newVal) {
                if ($scope.isDisabled) {
                    $scope.isClearable = false;
                } else {
                    $scope.isClearable = newVal.toString() !== '';
                }
            });

            $scope.clearSearch = function () {
                $scope.searchVal = '';
            };
        },
        link: function (scope, element, attrs, controllers) {
            var rxFloatingHeaderCtrl = controllers[1];
            if (!_.isUndefined(rxFloatingHeaderCtrl)) {
                rxFloatingHeaderCtrl.update();
            }
        }
    };
});
