angular.module('encore.ui.rxApp', [])
/*
 * This array defines the default navigation to use for all Encore sites and used by rxAppNap.
 * It can be overwritten if necessary via the 'menu' property of rxAppNap.
 *
 * @property {string} title Only used on the top level, defines the title to use for all sub-navigation
 *
 * Common Properties for all 'children' nav items:
 * @property {string} href The url to use for the menu item
 * @property {string} linkText The text displayed for the menu item
 * @property {array} children Child menu items for the navigation heirarchy
 * @property {string} directive Name of directive to build and show when item is active. For example:
 *                              Value of 'my-directive' becomes '<my-directive></my-directive>'
 */
.value('encoreNav', [{
    title: 'All Tools',
    children: [{
        href: '/',
        linkText: 'Account-level Tools',
        directive: 'account-search',
        children: [
            {
                href: '/account-details',
                linkText: 'Account Details'
            }, {
                href: '/billing',
                linkText: 'Billing',
                children: [
                    {
                        href: '/billing/overview',
                        linkText: 'Overview'
                    }, {
                        href: '/billing/discounts',
                        linkText: 'Discounts'
                    }, {
                        href: '/billing/payments',
                        linkText: 'Payment Options'
                    }, {
                        href: '/billing/taxation',
                        linkText: 'Taxation'
                    }, {
                        href: '/billing/options',
                        linkText: 'Additional Options'
                    }
                ]
            }, {
                href: '/{{username}}/cbs/volumes',
                linkText: 'Block Storage',
                children: [
                    {
                        href: '/{{username}}/cbs/volumes',
                        linkText: 'Volumes'
                    }, {
                        href: '/{{username}}/cbs/snapshots',
                        linkText: 'Snapshots'
                    }
                ]
            }, {
                href: '/{{username}}/servers',
                linkText: 'Cloud Servers'
            }
        ]
    }, {
        href: '/ticketqueues',
        linkText: 'Ticket Queues',
        children: [
            {
                href: '/ticketqueues/queues',
                linkText: 'My Queues'
            }, {
                href: '/ticketqueues/tickets',
                linkText: 'My Tickets'
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
* @param {object} [menu] Menu items used for left-hand navigation
*
* @example
* <pre>
*     <rx-app site-title="Custom Title"></rx-app>
* </pre>
*/
.directive('rxApp', function (encoreNav) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxApp.html',
        scope: {
            siteTitle: '@?',
            menu: '=?'
        },
        link: function (scope) {
            scope.menu = scope.menu || encoreNav;
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
.directive('rxAppNavItem', function ($compile, $location) {
    var isActive = function (pattern) {
        return _.contains($location.path(), pattern);
    };

    var linker = function (scope, element) {
        var injectContent = function (selector, content) {
            var el = element[0].querySelector(selector);
            el = angular.element(el);

            $compile(content)(scope, function (compiledHtml) {
                el.append(compiledHtml);
            });
        };

        scope.level = _.isNumber(scope.level) ? scope.level : 1;
        var childLevel = scope.level + 1;

        var rxNavTemplate = '<rx-app-nav items="item.children" level="' + childLevel + '">' +
            '</rx-app-nav>';
        var directiveHtml = '<directive></directive>';

        // add active class if defined or matches current href
        scope.item.active = scope.item.active || isActive(scope.item.href);
        // listen to location changes and update nav accordingly
        scope.$on('$locationChangeSuccess', function () {
            scope.item.active = isActive(scope.item.href);
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
        link: linker
    };
});