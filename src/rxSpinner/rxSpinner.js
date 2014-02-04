angular.module('encore.ui.rxSpinner', [])
.directive('rxSpinner', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.$watch('loading', function (value) {
                if (value) {
                    element.prepend('<div class="rx-spinner"></div>');
                } else {
                    element.find('div').remove();
                }
            });
        }
    };
});