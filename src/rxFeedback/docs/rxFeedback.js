/*jshint unused:false*/
function rxFeedbackCtrl ($scope, rxNotify) {
    $scope.alwaysSucceed = function () {
        rxNotify.add('Thanks for your feedback!', {
            type: 'success',
            timeout: 3
        });
    };

    $scope.alwaysFail = function () {
        rxNotify.add('Feedback not received!', {
            type: 'error',
            timeout: 3
        });
    };
}
