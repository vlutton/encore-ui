angular.module('demoApp')
.controller('rxLocalStorageCtrl', function ($scope, $window, LocalStorage) {
    $scope.setSideKick = function () {
        LocalStorage.setObject('joker', { name: 'Harley Quinn' });
    };

    $scope.getSideKick = function () {
        var sidekick = LocalStorage.getObject('joker');
        $window.alert(sidekick.name);
    };
});
