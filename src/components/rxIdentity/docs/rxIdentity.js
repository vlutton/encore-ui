/*jshint unused:false*/
angular.module('demoApp')
.controller('rxIdentityCtrl', function ($scope, $window, Identity) {
    $scope.user = {};
    $scope.login = function () {
        $scope.toggle = true;
        Identity.login($scope.user,
            function (authToken) {
                $scope.toggle = false;
                $window.alert('Congrats! Logged In');
            },
            function (error) {
                $scope.toggle = false;
                $window.alert('Login attempt failed.');
            });
    };
});
