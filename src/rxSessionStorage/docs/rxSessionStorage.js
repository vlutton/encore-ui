/*jshint unused:false*/
function rxSessionStorageCtrl ($scope, SessionStorage) {
    SessionStorage.setItem('Batman', 'Robin');

    $scope.getSideKick = function () {
        alert(SessionStorage.getItem('Batman'));
    };
}
