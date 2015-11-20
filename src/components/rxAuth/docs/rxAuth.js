angular.module('demoApp')
.controller('rxAuthCtrl', function ($scope, $window, Auth) {
    $scope.hasRole = function () {
        $window.alert('Has "superhero" Role? : ' + Auth.hasRole('superhero'));
    };

    $scope.isAuthenticated = function () {
        $window.alert('Is Authenticated? : ' + Auth.isAuthenticated());
    };
});
