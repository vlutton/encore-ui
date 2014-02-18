/*jshint unused:false*/

function rxNotifyCtrl ($scope, rxNotify) {
    $scope.options = {
        type: 'info',
        timeout: -1,

    };

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);
        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };
}