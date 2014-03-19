angular.module('encore.ui.rxNav', ['encore.ui.rxDropdown'])
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxNav
 * @restrict E
 * @description
 * TBD
 */
.directive('rxNav', function () {
    return {
        templateUrl: 'templates/rxNav.html',
        restrict: 'E',
        scope: {
            'searchFunction': '&',
            'placeholderText': '@',
            'links': '=?',
            'logo': '=?'
        },
        controller: function ($scope) {
            $scope.bookmarks = {
                linkText: 'Bookmarks',
                items: [
                    {
                        title: 'Bookmarks go here!',
                        path: '/'
                    }
                ]
            };

            $scope.dashboards = {
                linkText: 'Dashboards',
                items: [
                    {
                        title: 'Link 1',
                        path: '/path'
                    },
                    {
                        title: 'Link 2',
                        path: '/path2'
                    },
                    {
                        title: 'Link 3',
                        path: '/path3'
                    }
                ]
            };

            $scope.internalTools = {
                linkText: 'Internal Tools',
                items: [
                    { title: 'Ticket Queues', path: '/#/ticketqueues/', className: '' }
                ]
            };
        }
    };
});
