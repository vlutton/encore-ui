angular.module('demoApp')
.controller('rxSessionStorageCtrl', function ($scope, $window, SessionStorage) {
    $scope.setSideKick = function () {
        SessionStorage.setItem('Batman', 'Robin');
    };

    $scope.getSideKick = function () {
        $window.alert(SessionStorage.getItem('Batman'));
    };
});
