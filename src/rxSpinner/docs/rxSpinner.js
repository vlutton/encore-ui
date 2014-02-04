/*jshint unused:false*/
function rxSpinnerCtrl ($scope) {
    $scope.loading = false;

    $scope.toggleLoading = function () {
        $scope.loading = !$scope.loading;
    };
}