/*jshint unused:false*/

function rxNotifyCtrl ($rootScope, $scope, rxNotify, rxPromiseNotifications, $q) {
    $scope.message = 'My message';

    $scope.options = {
        type: 'info',
        timeout: -1,
        dismissable: true,
        show: 'immediate'
    };

    $scope.routeChange = function (stack) {
        $rootScope.$broadcast('$routeChangeStart', {});
        $rootScope.$broadcast('$routeChangeSuccess', {});
    };

    $scope.add = function (stack) {
        var messageOptions = _.clone($scope.options);
        messageOptions.stack = stack;

        rxNotify.add($scope.message, messageOptions);
    };

    // add a default messages
    rxNotify.add('Helpful Information');
    rxNotify.add('Loading', {
        loading: true
    });
    rxNotify.add('You did it!', {
        type: 'success'
    });
    rxNotify.add('Careful now...', {
        type: 'warning'
    });
    rxNotify.add('Under Attack by Aliens', {
        type: 'error',
        stack: 'custom'
    });

    // stuff for rxPromiseNotifications
    $scope.addPromise = function () {
        $scope.deferred = $q.defer();

        var promiseScope = rxPromiseNotifications.add($scope.deferred.promise, {
            loading: 'Loading Message',
            success: 'Success Message',
            error: 'Error Message'
        });
    };
}