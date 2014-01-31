/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxPaginateCtrl ($scope, PageTracking) {
    $scope.sorter = {
        predicate: 'id',
        reverse: false
    };
    $scope.pager = PageTracking.createInstance();
    $scope.pager.itemsPerPage = 3;

    $scope.servers = [
        {
            'name': 'Server 1',
            'os': 'Ubuntu 12.04'
        },
        {
            'name': 'Server 2',
            'os': 'Red Hat Enterprise Linux 6.4 '
        },
        {
            'name': 'Server 3',
            'os': 'Ubuntu 12.04'
        },
        {
            'name': 'Server 4',
            'os': 'CentOS 6.4'
        },
        {
            'name': 'Server 5',
            'os': 'Ubuntu 12.10'
        },
        {
            'name': 'Server 6',
            'os': 'Ubuntu 13.04'
        },
        {
            'name': 'Server 7',
            'os': 'Red Hat Enterprise Linux 6.4 '
        },
        {
            'name': 'Server 8',
            'os': 'Ubuntu 12.10'
        }
    ];
}