/*jshint unused:false*/
angular.module('demoApp')
.directive('sampleNavDirective', function () {
    return {
        restrict: 'E',
        template: '<input type="text" placeholder="Search">'
    };
});

function rxAppCtrl ($scope, $location, $rootScope) {
    $scope.subtitle = 'With a subtitle';

    $scope.changeSubtitle = function () {
        $scope.subtitle = 'With a new subtitle at ' + Date.now();
    };

    // Fake navigation
    var customApp = document.getElementById('custom-rxApp');
    customApp.addEventListener('click', function (ev) {
        var target = ev.target;

        if (target.className.indexOf('item-link') > -1) {
            // prevent the default jump to top
            ev.preventDefault();

            // update angular location
            $location.path(target.getAttribute('href'));
            $rootScope.$apply();
        }
    });

    $scope.menuItems = [{
        title: 'Example Menu',
        children: [
            {
                href: '#1',
                linkText: '1st Order Item'
            },
            {
                href: '#2',
                linkText: '1st Order Item w/ Children',
                // childHeader: 'Current Account {{ user }}',
                directive: 'sample-nav-directive',
                children: [
                    {
                        href: '#2-1',
                        linkText: '2nd Order Item',
                        children: [{
                            href: '#2-1-1',
                            linkText: '3rd Order Item'
                        }]
                    },
                    {
                        href: '#2-2',
                        linkText: '2nd Order Item w/ Children',
                        active: true,
                        children: [
                            {
                                href: '#2-2-1',
                                linkText: '3rd Order Item'
                            },
                            {
                                href: '#2-2-2',
                                linkText: '3rd Order Item w/ children',
                                active: true,
                                children: [
                                    {
                                        href: '#2-2-2-1',
                                        linkText: '4th Order Item',
                                        active: true
                                    },
                                    {
                                        href: '#2-2-2-2',
                                        linkText: '4th Order Item'
                                    }
                                ]
                            },
                            {
                                href: '#2-2-3',
                                linkText: '3rd Order Item'
                            }
                        ]
                    },
                    {
                        href: '#2-3',
                        linkText: '2nd Order Item'
                    }
                ]
            },
            {
                href: '#3',
                linkText: '1st Order Item'
            }
        ]
    }];
}