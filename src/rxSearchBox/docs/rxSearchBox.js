angular.module('demoApp')
.controller('rxSearchBoxCtrl', function ($scope) {
    $scope.searchModel = '';
    $scope.filterPlaceholder = 'Filter by any...';
});
