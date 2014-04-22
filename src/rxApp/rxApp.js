angular.module('encore.ui.rxApp', ['encore.ui.rxEnvironment', 'ngSanitize', 'ngRoute'])
/*
 * This array defines the default navigation to use for all Encore sites and used by rxAppNap.
 * It can be overwritten if necessary via the 'menu' property of rxAppNap.
 *
 * @property {string} title Only used on the top level, defines the title to use for all sub-navigation
 *
 * Common Properties for all 'children' nav items:
 * @property {string|object} href String url to use for the menu item or object to passed to rxEnvironmentUrl
 * @property {string} linkText The text displayed for the menu item
 * @property {array} children Child menu items for the navigation heirarchy
 * @property {string} directive Name of directive to build and show when item is active. For example:
 *                              Value of 'my-directive' becomes '<my-directive></my-directive>'
 * @property {expression|function} [childVisibility] Rule to determine visibility of child menu
 * @property {expression} [childHeader] Expression which will be displayed above child menu. Access controller
 * scope via: `route.current.scope` @see http://devdocs.io/angular/ngroute.$route#properties_current
 *
 */
.value('encoreNav', [{
    title: 'All Tools',
    children: [{
        linkText: 'Account-level Tools',
        directive: 'rx-global-search',
        childVisibility: function (scope) {
            // We only want to show this nav if user is already defined in the URL
            // (otherwise a user hasn't been chosen yet, so nav won't work, so we hide it)
            if (scope.route.current) {
                return !_.isUndefined(scope.route.current.pathParams.user);
            }
            return false;
        },
        childHeader: '<strong class="current-search">Current User:</strong>' +
            '<span class="current-result">{{route.current.pathParams.user}}</span>',
        children: [
            {
                href: { tld: 'cloudatlas', path: '{{user}}/servers' },
                linkText: 'Cloud Servers'
            },
            {
                href: { tld: 'cloudatlas', path: '{{user}}/cbs/volumes' },
                linkText: 'Block Storage',
                children: [
                    {
                        href: '/{{user}}/cbs/volumes',
                        linkText: 'Volumes'
                    }, {
                        href: '/{{user}}/cbs/snapshots',
                        linkText: 'Snapshots'
                    }
                ]
            }, {
                href: { tld: 'cloudatlas', path: '{{user}}/databases/instances' },
                linkText: 'Databases',
                visibility: '"!production" | rxEnvironmentMatch'
            }
        ]
    }, {
        href: { tld: 'cloudatlas', path: 'ticketqueues' },
        linkText: 'Ticket Queues',
        children: [
            {
                href: '/ticketqueues/my',
                linkText: 'My Tickets'
            }, {
                href: '/ticketqueues/queues',
                linkText: 'Queue Admin'
            }
        ]
    }]
}])
/**
* @ngdoc directive
* @name encore.ui.rxApp:rxApp
* @restrict E
* @scope
* @description
* Responsible for creating the HTML necessary for a common Encore layout.
*
* @param {string} [siteTitle] Title of site to use in upper right hand corner
* @param {array} [menu] Menu items used for left-hand navigation
* @param {string} [collapsibleNav] Set to 'true' if the navigation menu should be collapsible
* @param {string} [collapsedNav] Binding for the collapsed state of the menu.
*
* @example
* <pre>
*     <rx-app site-title="Custom Title"></rx-app>
* </pre>
*/
.directive('rxApp', function ($rootScope, encoreNav) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxApp.html',
        scope: {
            siteTitle: '@?',
            menu: '=?',
            collapsibleNav: '@',
            collapsedNav: '=?',
        },
        link: function (scope) {
            scope.menu = scope.menu || encoreNav;
            if (!_.isBoolean(scope.collapsedNav)) {
                scope.collapsedNav = false;
            }

            scope.collapseMenu = function  () {
                scope.collapsedNav = !scope.collapsedNav;
            };
        }
    };
})
/**
* @ngdoc directive
* @name encore.ui.rxApp:rxPage
* @restrict E
* @scope
* @description
* Responsible for creating the HTML necessary for a page (including breadcrumbs and page title)
*
* @param {expression} [title] Title of page
* @param {expression} [subtitle] Subtitle of page
*
* @example
* <pre>
*     <rx-page title="'Page Title'"></rx-page>
* </pre>
*/
.directive('rxPage', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxPage.html',
        scope: {
            title: '=',
            subtitle: '=',
        }
    };
})
/**
* @ngdoc directive
* @name encore.ui.rxApp:rxAppNav
* @restrict E
* @scope
* @description
* Creates a menu based on items passed in.
*
* @param {object} items Menu items to display. See encoreNav for object definition
* @param {string} [level] Level in heirarchy in page. Higher number is deeper nested. Defaults to 1
*
* @example
* <pre>
*     <rx-app-nav level="1" items="menuItems"></rx-app-nav>
* </pre>
*/
.directive('rxAppNav', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppNav.html',
        scope: {
            items: '=',
            level: '='
        }
    };
})
/**
* @ngdoc directive
* @name encore.ui.rxApp:rxAppNavItem
* @restrict E
* @description
* Creates a menu item. Recursively creates rx-app-nav if 'children' present.
* 'Item' must be avialable via scope
*
* @example
* <pre>
*     <rx-app-nav-item ng-repeat="item in items"></rx-app-nav-item>
* </pre>
*/
.directive('rxAppNavItem', function ($compile, $location, $route, $interpolate, rxEnvironmentUrlFilter) {
    var isActive = function (url) {
        return _.contains($location.absUrl(), url);
    };

    var hasActive = function (item) {
        // check if current active
        var pathMatches = isActive(item.href);

        // if current item not active, check if any children are active
        if (!pathMatches && item.children) {
            pathMatches = _.any(item.children, hasActive);
        }

        return pathMatches;
    };

    var buildUrl = function (url) {
        // sometimes links don't have URLs defined, so we need to exit before $interpolate throws an error
        if (_.isUndefined(url)) {
            return url;
        }

        // run the href through rxEnvironmentUrl in case it's defined as such
        url = rxEnvironmentUrlFilter(url);

        if ($route.current) {
            // convert any nested expressions to defined route params
            url = $interpolate(url)($route.current.pathParams);
        }

        return url;
    };

    var linker = function (scope, element) {
        var injectContent = function (selector, content) {
            var el = element[0].querySelector(selector);
            el = angular.element(el);

            $compile(content)(scope, function (compiledHtml) {
                el.append(compiledHtml);
            });
        };

        scope.item.href = buildUrl(scope.item.href);

        scope.level = _.isNumber(scope.level) ? scope.level : 1;
        var childLevel = scope.level + 1;

        var rxNavTemplate = '<rx-app-nav items="item.children" level="' + childLevel + '">' +
            '</rx-app-nav>';
        var directiveHtml = '<directive></directive>';

        // add active class if matches current href
        scope.item.active = hasActive(scope.item);

        // listen to location changes and update nav accordingly
        scope.$on('$locationChangeSuccess', function () {
            scope.item.href = buildUrl(scope.item.href);
            scope.item.active = hasActive(scope.item);
        });

        // add navDirective if defined
        if (angular.isString(scope.item.directive)) {
            // convert directive string to HTML
            // e.g. my-directive -> <my-directive></my-directive>
            directiveHtml = directiveHtml.replace('directive', scope.item.directive);

            injectContent('.item-directive', directiveHtml);
        }

        // add children if present
        // Note: this can't be added in the HTML due to angular recursion issues
        if (angular.isArray(scope.item.children)) {
            injectContent('.item-children', rxNavTemplate);
        }
    };

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppNavItem.html',
        link: linker,
        controller: function ($scope, $location) {
            $scope.isVisible = function (visibility) {
                if (_.isUndefined(visibility)) {
                    // if undefined, default to true
                    return true;
                }

                $scope.route = $route;

                return $scope.$eval(visibility, {
                    location: $location
                });
            };
            $scope.toggleNav = function (ev, href) {
                // if no href present, simply toggle active state
                if (_.isEmpty(href)) {
                    ev.preventDefault();
                    $scope.item.active = !$scope.item.active;
                }
                // otherwise, let the default nav do it's thing
            };
        }
    };
});
