function rxSessionCtrl ($scope, Session) {
    $scope.isAuthenticated = function () {
        alert(Session.isAuthenticated());
    };
}
