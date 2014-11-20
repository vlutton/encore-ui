/*jshint unused:false*/
function rxBreadcrumbsCtrl ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '/',
        name: 'Components'
    }, {
        name: '<strong>All Components</strong>'
    }]);
}