/*jshint unused:false*/
function rxModalActionCtrl ($scope) {
    $scope.password = 'guest';

    $scope.populate = function (modalScope) {
        modalScope.user = 'hey_dude';
    };

    $scope.changePass = function (fields) {
        $scope.password = fields.password;
    };
}

function rxModalStateCtrl ($scope, $modalInstance, $timeout, rxNotify) {
    function complete () {
        $scope.loaded = true;
        $scope.setState('complete');
        rxNotify.add('Operation Success!', {
            stack: 'modal',
            type: 'success'
        });
    }

    $scope.submit = function () {
        $scope.setState('confirm');
    }

    $scope.confirm = function () {
        $scope.loaded = false;
        $scope.setState('pending');
        rxNotify.add('Performing Operation...', {
            stack: 'modal',
            loading: true,
            dismiss: [$scope, 'loaded']
        });
        $timeout(complete, 2000);
    }

    $scope.cancel = function () {
        rxNotify.clear('modal');
        $modalInstance.dismiss();
    }
}
