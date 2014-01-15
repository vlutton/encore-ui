angular.module('encore.ui.rxProductResources', [])
    .directive('rxProductResources', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/rxProductResources/rxProductResources.html',
            scope: {
                user: '='
            }
        };
    });