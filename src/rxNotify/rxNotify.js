/*jshint undef:false*/
angular.module('encore.ui.rxNotify', [])
/*
 * Displays all messages in a stack
 * @ngdoc directive
 * @example <rx-notifications stack="myStack"></rx-notifications>
 * @scope
 */
.directive('rxNotifications', function (rxNotify) {
    return {
        scope: {
            stack: '@?'
        },
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxNotifications.html',
        controller: function ($scope) {
            /*
             * Calls rxNotify service to remove a message from a stack
             * @param {object} message The message object to remove.
             */
            $scope.dismiss = function (message) {
                rxNotify.dismiss(message);
            };
        },
        link: function ($scope) {
            var stack = $scope.stack || 'page';

            // watch the stack for updates
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
        dismiss: 'next',
        stack: 'page'
    };

    /*
     * Adds a message to a stack
     * @private
     * @param {object} message The message object to add.
     */
    var addToStack = function (message) {
        // if timeout is set, we should remove message after time expires
        if (message.timeout > -1) {
            dismissAfterTimeout(message);
        }

        stacks[message.stack].push(message);
    };

    /*
     * Sets a timeout to wait a specific time then dismiss message
     * @private
     * @param {object} message The message object to remove.
     */
    var dismissAfterTimeout = function (message) {
        // convert seconds to milliseconds
        var timeoutMs = message.timeout * 1000;

        $timeout(function () {
            dismiss(message);
        }, timeoutMs);
    };

    /*
     * Shows/dismisses message after scope.prop change to true
     * @private
     * @param {object} message The message object to show/dismiss
     * @param {string} changeType Whether to 'show' or 'dismiss' the message
     */
    var changeOnWatch = function (message, changeType) {
        var scope = message[changeType][0];
        var prop = message[changeType][1];

        // function to run to change message visibility
        var cb;

        // switch which function to call based on type
        if (changeType == 'show') {
            cb = addToStack;
        } else if (changeType == 'dismiss') {
            cb = dismiss;
        }

        scope.$watch(prop, function (newVal) {
            if (newVal === true) {
                cb(message);
            }
        });
    };

    /*
     * removes all messages that are shown and dismissable
     * @private
     */
    var clearAllDismissable = function () {
        _.forOwn(stacks, function (index, key) {
            stacks[key] = _.reject(stacks[key], {
                'dismiss': messageDefaults.dismiss
            });
        });
    };

    /*
     * adds messages marked as 'next' to relevant queues
     * @private
     */
    var addAllNext = function () {
        _.each(nextQueue, function (message) {
            // add to appropriate stack
            addToStack(message);
        });

        // empty nextQueue of messages
        nextQueue.length = 0;
    };

    /*
     * deletes all messages in a stack
     * @public
     * @param {string} stack The name of the stack to clear
     */
    var clear = function (stack) {
        // @see http://davidwalsh.name/empty-array
        stacks[stack].length = 0;
    };

    /*
     * removes a specific message from a stack
     * @public
     * @param {string} messageId The ID of the message to remove.
     * @param {string} stack The name of the stack the message is it
     * @note Alternatively, you can pass in a message object and the ID/Stack will be determined from the object
     */
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

    /*
     * adds a message to a stack
     * @public
     * @param {string} text Message text
     * @param {object} options Message options. See README.md for examples
     */
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
            changeOnWatch(message, 'dismiss');
        }

        // add message to stack immediately if has default show value
        if (message.show == messageDefaults.show) {
            addToStack(message);
        } else if (message.show == 'next') {
            nextQueue.push(message);
        } else if (_.isArray(message.show)) {
            changeOnWatch(message, 'show');
        }

        // return id for tracking
        return message.id;
    };

    // add a listener to root scope which listens for the event that gets fired when the route successfully changes
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