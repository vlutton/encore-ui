function rxFormDemoCtrl ($scope) {
    $scope.types = [
        {
            'value': 'SATA',
            'label': 'SATA'
        },
        {
            'value': 'SSD',
            'label': 'SSD'
        }
    ];

    $scope.volume = {
        name: 'Volume-1',
        type: $scope.types[0].value // select the first type by default
    };

    $scope.yesOptionDescription = '<b>This</b> is HTML that included in the JS';

    $scope.optionTableData = [
        {
            'name': 'asv',
            'id': 0
        }, {
            'name': 'asdf',
            'id': 1
        }, {
            'name': 'av',
            'id': 2
        }
    ];

    $scope.optionTableColumns = [{
        'label': 'Name',
        'key': 'name'
    }];
}