angular.module('demoApp', ['encore.ui', 'ngRoute'])
.controller('componentCtrl', function ($scope, rxBreadcrumbsSvc, $routeParams, component) {
    rxBreadcrumbsSvc.set([{
        name: component.name
    }]);

    $scope.component = component;
})
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/overview', {
            templateUrl: 'overview.html',
            controller: function (rxBreadcrumbsSvc) {
                rxBreadcrumbsSvc.set();
            }
        })
        .when('/component/:component', {
            controller: 'componentCtrl',
            templateUrl: 'component-template.html',
            resolve: {
                'component': function ($route, components) {
                    return _.find(components, {
                        'name': $route.current.params.component
                    });
                }
            }
        });
})
.run(function ($rootScope, components, $window, Environment, rxBreadcrumbsSvc) {
    var baseGithubUrl = '//rackerlabs.github.io/encore-ui/';
    Environment.add({
        name: 'ghPages',
        pattern: '//rackerlabs.github.io',
        url: baseGithubUrl + '{{path}}'
    });

    if (Environment.get().name === 'ghPages') {
        rxBreadcrumbsSvc.setHome(baseGithubUrl);
    }

    var demoNav = [
        {
            type: 'highlight',
            title: 'Encore-UI',
            children: [
                {
                    href: '#/overview',
                    linkText: 'Overview'
                },
                {
                    href: 'ngdocs/index.html',
                    linkText: 'JS Docs'
                },
                {
                    href: 'styleguide/index.html',
                    linkText: 'Design Styleguide'
                },
                {
                    linkText: 'Other Links',
                    children: [
                        {
                            linkText: 'GitHub Repos',
                            children: [
                                {
                                    href: 'https://github.com/rackerlabs/encore-ui',
                                    linkText: 'Encore-UI'
                                },
                                {
                                    href: 'https://github.com/rackerlabs/encore-ui-template',
                                    linkText: 'App Template (Private Repo)'
                                },
                                {
                                    href: 'https://github.com/rackerlabs/encore-ui-login',
                                    linkText: 'Common Login (Private Repo)'
                                }
                            ]
                        },
                        {
                            href: 'coverage/index.html',
                            linkText: 'Unit Test Coverage'
                        }
                    ]
                }
            ]
        },
        {
            title: 'All Components',
            children: []
        }
    ];

    _.each(components, function (component) {
        demoNav[1].children.push({
            href: '#/component/' + component.name,
            linkText: component.name
        });
    });

    $rootScope.demoNav = demoNav;

    $rootScope.$on('$routeChangeSuccess', function() {
        $window.scrollTo(0,0);
    });
})
.directive('rxPrism', function ($timeout) {
    return {
        restrict: 'E',
        template: '<pre><code class="language-{{language}}" ng-transclude></code></pre>',
        scope: {
            language: '@'
        },
        transclude: true,
        link: function (scope, el) {
            // delay execution of Prism until ng bindings have completed
            $timeout(function () {
                var code = el.find('code')[0];
                Prism.highlightElement(code);
            }, 0);
        }
    };
});
