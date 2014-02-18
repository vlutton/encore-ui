/*jshint undef:false*/
angular.module('encore.ui.rxNotify', [])
.directive('rxNotifications', function (rxNotify) {
    return {
        scope: {
            stack: '@?'
        },
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxNotifications.html',
        controller: function ($scope) {
            $scope.dismiss = function (message) {
                rxNotify.dismiss(message);
            };
        },
        link: function ($scope) {
            var stack = $scope.stack || 'page';

            $scope.$watch(function () {
                return rxNotify.stacks[stack];
            }, function (data) {
                $scope.messages = data;
            });
        }
    };
})
.factory('rxNotify', function ($timeout, $rootScope) {
    var defaultStack = 'page';
    var stacks = {};

    // initialize a default stack
    stacks[defaultStack] = [];

    // array that contains messages to show on 'next' (when route changes)
    var nextQueue = [];

    var messageDefaults = {
        type: 'info',
        timeout: -1,
        dismissable: true,
        show: 'immediate',
        dismiss: 'routeChange',
        stack: 'page'
    };

    var addToStack = function (message) {
        // if timeout is set, we should remove message after time expires
        if (message.timeout > -1) {
            dismissAfterTimeout(message);
        }

        stacks[message.stack].push(message);
    };

    var dismissAfterTimeout = function (message) {
        // convert seconds to milliseconds
        var timeoutMs = message.timeout * 1000;

        $timeout(function () {
            dismiss(message);
        }, timeoutMs);
    };

    var changeOnWatch = function (message, type, cb) {
        var scope = message[type][0];
        var prop = message[type][1];

        scope.$watch(prop, function (newVal) {
            if (newVal === true) {
                cb(message);
            }
        });
    };

    // deletes all messages in a stack
    var clear = function (stack) {
        // @see http://davidwalsh.name/empty-array
        stacks[stack].length = 0;
    };

    // removes a specific message from a stack
    var dismiss = function (messageId, stack) {
        // handle if message passed in (versus id)
        if (_.isObject(messageId)) {
            var message = messageId;
            stack = message.stack;
            messageId = message.id;
        }

        // remove message by id
        stacks[stack] = _.reject(stacks[stack], { 'id': messageId });
    };

    // adds a message to a stack
    var add = function (text, options) {
        var message = {
            text: text
        };

        options = options || {};

        // add unique id to message for easier identification
        options.id = _.uniqueId();

        // if stack is specified, add to different stack
        var stack = options.stack || defaultStack;

        // if new stack doesn't exist, create it
        if (!_.isArray(stacks[stack])) {
            stacks[stack] = [];
        }

        // merge options with defaults (overwriting defaults where applicable)
        _.defaults(options, messageDefaults);

        // add options to message
        _.merge(message, options);

        // if dismiss is set to array, watch variable
        if (_.isArray(message.dismiss)) {
            changeOnWatch(message, 'dismiss', dismiss);
        }

        // add message to stack immediately if has default show value
        if (message.show == messageDefaults.show) {
            addToStack(message);
        } else if (message.show == 'next') {
            nextQueue.push(message);
        } else if (_.isArray(message.show)) {
            changeOnWatch(message, 'show', addToStack);
        }

        // return id for tracking
        return message.id;
    };

    // removes all messages that are shown and dismissable
    var clearAllDismissable = function () {
        _.forOwn(stacks, function (index, key) {
            stacks[key] = _.reject(stacks[key], {
                'dismiss': messageDefaults.dismiss
            });
        });
    };

    // adds messages marked as 'next' to relevant queues
    var addAllNext = function () {
        _.each(nextQueue, function (message) {
            // add to appropriate stack
            addToStack(message);
        });

        // empty nextQueue of messages
        nextQueue.length = 0;
    };

    $rootScope.$on('$routeChangeSuccess', function processRouteChange () {
        clearAllDismissable();
        addAllNext();
    });

    // expose public API
    return {
        add: add,
        clear: clear,
        dismiss: dismiss,
        stacks: stacks
    };
});