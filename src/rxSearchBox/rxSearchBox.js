angular.module('encore.ui.rxSearchBox', [])
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
