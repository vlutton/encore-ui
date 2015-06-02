angular.module('demoApp')
.controller('rxBreadcrumbsCtrl', function ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '/',
        name: 'Components',
    }, {
        name: '<strong>All Components</strong>',
        status: 'demo'
    }]);
});
