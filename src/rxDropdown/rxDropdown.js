angular.module('encore.ui.rxDropdown', [])
.directive('rxDropdown', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'rxDropdown/rxDropdown.tpl.html',
        link: function (scope, element) {
            scope.visible = false;

            scope.toggle = function ($event) {
                $event.preventDefault();
                scope.visible = !scope.visible;
                $rootScope.$broadcast('dropdownShow', element);
            };

            scope.$on('dropdownShow', function (ev, el) {
                if (el[0] !== element[0]) {
                    scope.visible = false;
                }
            });
        },
        scope: {
            visible: '&',
            menu: '='
        }
    };
});