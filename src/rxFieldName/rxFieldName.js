angular.module('encore.ui.rxFieldName', [])
.directive('rxFieldName', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            ngRequired: '=?'
        },
        templateUrl: 'templates/rxFieldName.html'
    };
});
