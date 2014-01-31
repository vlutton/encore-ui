/*jshint unused:false*/

// This file is used to help build the 'demo' documentation page and should be updated with example code
function rxAgeCtrl ($scope) {
    var day = 86400000;
    $scope.ageHours = new Date((Date.now() - (day / 2.3)));
    $scope.ageDays = new Date((Date.now() - (day * 1.5)));
    $scope.ageMonths = new Date((Date.now() - (day * 40.2)));
    $scope.ageYears = new Date((Date.now() - (day * 380.1)));
}