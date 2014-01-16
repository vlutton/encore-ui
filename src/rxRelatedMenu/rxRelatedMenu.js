angular.module('encore.ui.rxRelatedMenu', [])
/**
 *
 * @ngdoc directive
 * @name encore.directives:rxRelatedMenu
 * @restrict E
 * @description
 * This directive is used to create a menu for a page. By default it shows
 * on the left side, but can be configured for the direction you want.
 * @scope
 * @param {Boolean=false} collapsable - Is this menu going to be collapsable
 * @param {String='open'} default-state - This option is only used 
 * if collapsable is true. Potential values are 'open' or 'closed'.
 * @param {String='click'} trigger - This option is only used if
 * collapsable is true. Potential values are 'click' or 'hover'.
 * @param {Boolean} state - Is the menu opened or closed.
 * @param {String='left'} position - Where should the sidebar live? Possible
 * values are 'left' or 'right'.
 * 
 */
.directive('rxRelatedMenu', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        templateUrl: 'templates/rxRelatedMenu/rxRelatedMenu.html',
        scope: {
            collapsable: '&',
            defaultState: '@',
            trigger: '@',
            state: '=',
            position: '@'
        },
        link: function (scope) {
            scope.menuPosition = (_.isEmpty(scope.position)) ? 'left' : scope.position;
            scope.state = (_.isEmpty(scope.defaultState)) ? 'open' : scope.defaultState == 'open';

            scope.isCollapsable = scope.collapsable();

            scope.toggleRelatedMenu = function () {
                scope.state = !scope.state;
            };

        }
    };
});