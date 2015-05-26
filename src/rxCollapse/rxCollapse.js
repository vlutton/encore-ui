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

            //When the see more/less version is chosed, 
            //take the value and togle the title accordingly
            //either way, hide the border and hide the default style
            scope.doSeeMoreOrLess = function (expVal) {
                if (expVal) {
                    scope.toggleTitle = scope.storedTitles[0];
                    
                } else {
                    scope.toggleTitle = scope.storedTitles[1];
                }

                scope.cContainer = 'hideBorder';
                scope.tabToShow = true;
                
            };

            //When a user clicks on see more/less, toggle the
            //boolean statement involving expansion and toggle
            //the title accordingly
            scope.toggleTitleAndCollapse = function () {

                scope.isExpanded = !scope.isExpanded;

                if (scope.isExpanded) {
                    scope.toggleTitle = scope.storedTitles[0];
                } else {
                    scope.toggleTitle = scope.storedTitles[1];
                }
            };

            //Check if the title exists. If it does not, show other version
            //if it does exist, hide the markup for the previous version
            if (!scope.title) {
                scope.doSeeMoreOrLess(scope.isExpanded);
                  
            } else {
                scope.tabToShow = false;
            }
            
            
        }
    };
});
