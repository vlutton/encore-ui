angular.module('encore.ui.rxApp', [])
.value('encoreNav', [{
    title: 'All Tools',
    children: [{
        href: 'https://{{environment}}.encore.rackspace.com',
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
                href: '/cbs',
                linkText: 'Block Storage'
            }, {
                href: '/servers',
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
.directive('rxAppNavItem', function ($compile, $location) {
    var isActive = function (pattern) {
        return $location.path().indexOf(pattern) !== -1;
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