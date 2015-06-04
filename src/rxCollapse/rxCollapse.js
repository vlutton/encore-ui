angular.module('encore.ui.rxCollapse', [])
/**
 * @ngdoc directive
 * @name encore.ui.rxCollapse:rxCollapse
 * @restrict E
 * @scope
 * @description
 * Hide and show an element with a transition.
 *
 * @param {string} [title] The title to display next to the toggle button and toggle different rxCollapse
 * @param {string} [expanded] Initially expanded or collapsed.  Default is expanded.
 *
 * @example
 * <pre>
 *     <rx-collapse title="Filter results" expanded="true">Text Here</rx-collapse>
 *     <rx-collapse expanded="true">Text Here</rx-collapse>
 * </pre>
 */
.directive('rxCollapse', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxCollapse.html',
        transclude: true,
        scope: {
            title: '@',
            toggleTitle: '&'
        },
        link: function (scope, element, attrs) {
            scope.storedTitles = ['See Less', 'See More'];
            scope.isExpanded = (attrs.expanded === 'false') ? false : true;

            scope.doSeeMoreOrLess = function (expVal) {
                if (expVal) {
                    scope.toggleTitle = scope.storedTitles[0];
                } else {
                    scope.toggleTitle = scope.storedTitles[1];
                }
                scope.cContainer = 'hideBorder';
                scope.tabToShow = true;
            };

            scope.toggleTitleAndCollapse = function () {
                scope.isExpanded = !scope.isExpanded;
                if (scope.isExpanded) {
                    scope.toggleTitle = scope.storedTitles[0];
                } else {
                    scope.toggleTitle = scope.storedTitles[1];
                }
                scope.setChev(scope.isExpanded);
            };

            scope.setChev = function (val) {
                if (val === false) {
                    scope.arrowChange = 'fa-angle-double-up';
                } else {
                    scope.arrowChange = 'fa-angle-double-down';
                }
            };

            if (!scope.title) {
                scope.doSeeMoreOrLess(scope.isExpanded);
            } else {
                scope.tabToShow = false;
            }
            scope.setChev(scope.isExpanded);
        }
    };
});
