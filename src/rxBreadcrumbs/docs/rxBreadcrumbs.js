/*jshint unused:false*/
function rxBreadcrumbsCtrl ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '/servers/',
        name: 'Servers'
    }, {
        name: 'Create New Server'
    }]);
}