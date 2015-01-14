/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxStatusColumnCtrl ($scope, rxStatusMappings, rxSortUtil) {
    $scope.servers = [
        { status: 'ACTIVE', title: 'ACTIVE status' },
        { status: 'ERROR', title: 'ERROR status' },
        { status: 'BUILD', title: 'BUILD status mapped to INFO' },
        { status: 'REBOOT', title: 'REBOOT status mapped to INFO' },
        { status: 'SUSPENDED', title: 'SUSPENDED status mapped to WARNING' },
        { status: 'INPROGRESS', title: 'INPROGRESS status mapped to PENDING' },
        { status: 'DELETING', title: 'DELETING status mapped to PENDING, using `fooApi` mapping', api:'fooApi' }
    ];

    // We have a few different ways of adding mappings. We've tried to show them all here
    rxStatusMappings.addGlobal({
        'DELETING': 'PENDING'
    });
    rxStatusMappings.mapToInfo(['BUILD', 'REBOOT']);
    rxStatusMappings.mapToWarning('SUSPENDED');
    rxStatusMappings.mapToPending('INPROGRESS');

    rxStatusMappings.addAPI('fooApi', { 'DELETING': 'PENDING' });
    rxStatusMappings.mapToPending('SomeApiSpecificStatus', 'fooApi');
    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };
    $scope.sort = rxSortUtil.getDefault('status');
}
