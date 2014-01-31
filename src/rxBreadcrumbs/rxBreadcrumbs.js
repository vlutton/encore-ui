angular.module('encore.ui.rxBreadcrumbs', [])
.factory('rxBreadcrumbsSvc', function () {
    // default will always be home
    var breadcrumbs = [{
        path: '',
        name: 'Home'
    }];
    var breadcrumbsService = {};

    breadcrumbsService.set = function (items) {
        // reset to just homepage
        breadcrumbs = breadcrumbs.splice(0, 1);
        // add in new breadcrumbs
        breadcrumbs = breadcrumbs.concat(items);
    };

    breadcrumbsService.getAll = function () {
        // return a copy of the array (so it can't be modified)
        return breadcrumbs.slice(0);
    };

    return breadcrumbsService;
})
.directive('rxBreadcrumbs', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxBreadcrumbs.html',
        controller: function ($scope, rxBreadcrumbsSvc) {
            $scope.breadcrumbs = rxBreadcrumbsSvc;
        },
        scope: {
            visible: '&'
        }
    };
});