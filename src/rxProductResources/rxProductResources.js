angular.module('encore.ui.rxProductResources', [])
    .directive('rxProductResources', function () {
        return {
            restrict: 'E',
            templateUrl: 'template/rxProductResources/rxProductResources.html',
            scope: {
                user: '='
            }
        };
    });