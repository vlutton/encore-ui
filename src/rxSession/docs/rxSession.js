function rxSessionCtrl ($scope, Session) {
    var invalidToken = { id: 'badToken' };
    Session.storeToken(invalidToken);

    $scope.isAuthenticated = function () {
        alert(Session.isAuthenticated());
    };
}
