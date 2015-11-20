angular.module('demoApp')
.controller('rxSessionCtrl', function ($scope, $window, Session) {
    $scope.isAuthenticated = function () {
        $window.alert(Session.isAuthenticated());
    };
});
