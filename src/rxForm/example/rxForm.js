angular.module('demo.ui.rxForm', [])
.controller('rxForm', function ($scope) {
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
        'display_name': 'Volume-1',
        // select the first type by default
        'volume_type': $scope.types[0].value
    };
});