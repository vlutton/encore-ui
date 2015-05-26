angular.module('encore.ui.rxCollapse', [])
/**
 * @ngdoc directive
 * @name encore.ui.rxCollapse:rxCollapse
 * @restrict E
 * @scope
 * @description
 * Hide and show an element with a transition.
 *
 * @param {string} [title] The title to display next to the toggle button.
 * @param {string} [expanded] Initially expanded or collapsed.  Default is expanded.
 *
 * @example
 * <pre>
 *     <rx-collapse title="Filter results" expanded="true"></rx-collapse>
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

            
            scope.doSeeMoreOrLess = function () {
                
                scope.toggleTitle = scope.storedTitles[0];
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
            };

            if (!scope.title) {
                scope.doSeeMoreOrLess();
                  
            } else {
                scope.tabToShow = false;
            }
            
            
        }
    };
});
