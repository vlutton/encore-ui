/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
angular.module('demoApp')
.controller('rxToggleSwitchCtrl', function ($scope, $timeout, rxNotify) {
    $scope.toggle3 = true;

    $scope.attemptChange = function (value) {
        $scope.loading = true;
        rxNotify.add('Saving...', {
            loading: true
        });

        // Simulate an api request
        $timeout(function () {
            $scope.loading = false;
            rxNotify.clear('page');
            rxNotify.add('Change saved', {
                type: 'success'
            });
        }, 1000);
    };
});
