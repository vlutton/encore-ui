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
            var storedTitles = ['See Less', 'See More'];
            scope.isExpanded = (attrs.expanded === 'false') ? false : true;

            var doSeeMoreOrLess = function (expVal) {
                if (expVal) {
                    scope.toggleTitle = storedTitles[0];
                } else {
                    scope.toggleTitle = storedTitles[1];
                }
                scope.cContainer = 'hideBorder';
                scope.tabToShow = true;
            };

            scope.toggleTitleAndCollapse = function () {
                scope.isExpanded = !scope.isExpanded;
                if (scope.isExpanded) {
                    scope.toggleTitle = storedTitles[0];
                } else {
                    scope.toggleTitle = storedTitles[1];
                }
                setChev(scope.isExpanded);
            };

            var setChev = function (val) {
                if (val === false) {
                    scope.arrowChange = 'fa-angle-double-down';
                } else {
                    scope.arrowChange = 'fa-angle-double-up';
                }
            };

            if (!scope.title) {
                doSeeMoreOrLess(scope.isExpanded);
            } else {
                scope.tabToShow = false;
            }
            setChev(scope.isExpanded);
        }
    };
});
