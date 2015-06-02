angular.module('demoApp')
.controller('rxIdentityCtrl', function ($scope, Identity) {
    $scope.user = {};
    $scope.login = function () {
        $scope.toggle = true;
        Identity.login($scope.user,
            function () {
                $scope.toggle = false;
                alert('Congrats! Logged In');
            },
            function () {
                $scope.toggle = false;
                alert('Login attempt failed.');
            });
    };
});
