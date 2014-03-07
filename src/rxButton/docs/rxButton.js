/*jshint unused:false*/
function rxButtonCtrl ($scope, $timeout) {
    $scope.status = {
        loading: false
    };

    $scope.login = function () {
        $scope.status.loading = true;

        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };
}