/*jshint unused:false*/

angular.module('demoApp')
.controller('rxCheckboxCtrl', function ($scope) {
    $scope.checkOne = true;
    $scope.checkThree = true;
    $scope.checkFive = true;
    $scope.checkSeven = true;

    $scope.checkTwo = false;
    $scope.checkFour = false;
    $scope.checkSix = false;
    $scope.checkEight = false;

    $scope.amSure = false;
    $scope.amReallySure = false;

    $scope.$watch('amSure', function (newVal) {
        if (newVal === false) {
            $scope.amReallySure = false;
        }
    });
});
