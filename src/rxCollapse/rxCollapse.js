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
            var storedTitles = ['See More', 'See Less'];
            scope.isExpanded = (attrs.expanded === 'false') ? false : true;

            var doSeeMoreOrLess = function () {
                scope.toggleTitle = storedTitles[+scope.isExpanded];
                scope.cContainer = 'hideBorder';
                scope.tabToShow = true;
            };

            scope.toggleTitleAndCollapse = function () {
                scope.isExpanded = !scope.isExpanded;
                scope.toggleTitle = storedTitles[+scope.isExpanded];
                setChev();
            };

            var setChev = function () {
                if (scope.isExpanded === false) {
                    scope.arrowChange = 'fa-angle-double-down';
                } else {
                    scope.arrowChange = 'fa-angle-double-up';
                }
            };

            if (!scope.title) {
                doSeeMoreOrLess();
            } else {
                scope.tabToShow = false;
                scope.ispad = 'collapse-body';
            }
            setChev();
        }
    };
});
