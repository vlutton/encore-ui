/**
 * @ngdoc overview
 * @name rxFeedback
 * @description
 * # rxFeedback Component
 *
 * `rxFeedback` component gathers and sends user feedback to a default or specifiable email list.
 * 
 * ## Default Submission Function
 *
 * The `rxFeedback` component sends feedback to `/api/encore/feedback`, which routes feedback to `encoreui@lists`.
 * This endpoint also supports a `product` parameter `/api/encore/feedback/:product` for sending feedback to a 
 * product-specific mailing list. Adding a custom endpoint is managed in `encore-service-pillar`. Once configured 
 * you can override the default endpoint with `rxFeedbackSvc.setEndpoint`.
 *
 * ## Directives
 * * {@link rxFeedback.directive:rxFeedback rxFeedback}
 *
 * ## Services
 * * {@link rxFeedback.service:rxFeedbackSvc rxFeedbackSvc}
 * * {@link rxFeedback.service:rxScreenshotSvc rxScreenshotSvc}
 */
angular.module('encore.ui.rxFeedback', ['ngResource'])
.value('feedbackTypes', [
    {
        label: 'Software Bug',
        prompt: 'Bug Description',
        placeholder: 'Please be as descriptive as possible so we can track it down for you.'
    },
    {
        label: 'Incorrect Data',
        prompt: 'Problem Description',
        placeholder: 'Please be as descriptive as possible so we can figure it out for you.'
    },
    {
        label: 'Feature Request',
        prompt: 'Feature Description',
        placeholder: 'Please be as descriptive as possible so we can make your feature awesome.'
    },
    {
        label: 'Kudos',
        prompt: 'What made you happy?',
        placeholder: 'We love to hear that you\'re enjoying Encore! Tell us what you like, and what we can do ' +
            'to make it even better'
    }
])
/**
 * @ngdoc service
 * @name rxFeedback.service:rxScreenshotSvc
 * @description
 * Captures a screenshot for `rxFeedback` submission form.
 *
 * **NOTE:** Requires `html2canvas` which Encore Framework provides by default.
 */
.service('rxScreenshotSvc', function ($log, $q) {
    // double check that html2canvas is loaded
    var hasDependencies = function () {
        var hasHtml2Canvas = typeof html2canvas == 'function';

        return hasHtml2Canvas;
    };

    return {
        capture: function (target) {
            var deferred = $q.defer();

            if (!hasDependencies()) {
                $log.warn('rxScreenshotSvc: no screenshot captured, missing html2canvas dependency');
                deferred.reject('html2canvas not loaded');
            } else {
                html2canvas(target, {
                    onrendered: function (canvas) {
                        var imgData = canvas.toDataURL('image/png');

                        deferred.resolve(imgData);
                    }
                });
            }

            return deferred.promise;
        }
    };
})
/**
 * @ngdoc service
 * @name rxFeedback.service:rxFeedbackSvc
 * @description
 * `rxFeedbackSvc` service supports `rxFeedback` directive functionality.  A `custom endpoint` may be set to override
 * the `default` endpoint.  
 */
.factory('rxFeedbackSvc', function ($resource, feedbackApi, $location, $window) {
    var container = {
        api: undefined,
        email: 'encoreui@lists.rackspace.com'
    };

    container.setEndpoint = function (url) {
        container.api = $resource(url);
    };

    // set a default endpoint
    container.setEndpoint(feedbackApi);

    container.fallback = function (feedback) {
        var subject = 'Encore Feedback: ' + feedback.type.label;
        var body = [
            'Current Page: ' + $location.absUrl(),
            'Browser User Agent: ' + navigator.userAgent,
            'Comments: ' + feedback.description
        ];

        body = body.join('\n\n');

        // if the feedback service fails, this fallback function can be run as a last ditch effort
        var uri = encodeURI('mailto:' + container.email + '?subject=' + subject + '&body=' + body);
        var windowOpen = $window.open(uri, '_blank');

        if (!windowOpen) {
            $window.location.href = uri;
        }
    };

    return container;
})
/**
 * @ngdoc controller
 * @name rxFeedback.controller:rxFeedbackController
 * @scope
 * @description
 * Allows the customization of the feedback modal via `$scope` and `$modalInstance`.
 */
.controller('rxFeedbackController', function ($scope, $modalInstance, $rootScope, $injector) {
    // define a controller for the modal to use
    $scope.submit = function () {
        $modalInstance.close($scope);
    };

    $scope.cancel = $modalInstance.dismiss;

    // cancel out of the modal if the route is changed
    $rootScope.$on('$routeChangeSuccess', $modalInstance.dismiss);

    // Allow external overrides of the form
    if ($injector.has('FeedbackService')) {
        $injector.get('FeedbackService').initialize($scope, $modalInstance);
    }
})
/**
 * @ngdoc directive
 * @name rxFeedback.directive:rxFeedback
 * @restrict E
 * @scope
 * @description
 * ## Custom Submission Function
 * 
 * The `rxFeedback` directive allows you to define an `on-submit` attribute that points to a custom function for the
 * purposes of overriding the default submission logic.  This function should accept a *single argument* for a
 * `feedback object` with the following definition:
 *
 * @example
 * <pre>
 * // feedback object structure
 * {
 *   "type": {
 *      "label": "(string)",
 *      "placeholder": "(string) placeholder text",
 *      "prompt": "(string) UI text used to describe the `description` field"
 *    },
 *    "description": "(string) user-submitted feedback"
 * }
 * </pre>
 *
 * @param {Object} type JSON object with `label` {String}, `placeholder` {String}, and `prompt` {String}
 * @param {String} description User-submitted feedback
 * 
 */
.directive('rxFeedback', function (feedbackTypes, $location, rxFeedbackSvc, rxScreenshotSvc, rxNotify, Session) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFeedback.html',
        scope: {
            sendFeedback: '=?onSubmit'
        },
        link: function (scope) {
            scope.feedbackTypes = feedbackTypes;

            scope.setCurrentUrl = function (modalScope) {
                modalScope.currentUrl = $location.url();
            };

            var showSuccessMessage = function (response) {
                var message = _.isString(response.message) ? response.message : 'Thanks for your feedback!';

                rxNotify.add(message, {
                    type: 'success'
                });
            };

            var showFailureMessage = function (httpResponse) {
                var errorMessage = 'An error occurred submitting your feedback';

                if (httpResponse.data && _.isString(httpResponse.data.message)) {
                    errorMessage += ': ' + httpResponse.data.message;
                }

                rxNotify.add(errorMessage, {
                    type: 'error'
                });
            };

            var makeApiCall = function (feedback, screenshot) {
                rxFeedbackSvc.api.save({
                    type: feedback.type.label,
                    description: feedback.description,
                    screenshot: screenshot,
                    sso: feedback.sso
                }, showSuccessMessage, function (httpResponse) {
                    showFailureMessage(httpResponse);

                    rxFeedbackSvc.fallback(feedback);
                });
            };

            if (!_.isFunction(scope.sendFeedback)) {
                scope.sendFeedback = function (feedback) {
                    feedback.sso = Session.getUserId();

                    var root = document.querySelector('.rx-app');

                    // capture screenshot
                    var screenshot = rxScreenshotSvc.capture(root);

                    screenshot.then(function (dataUrl) {
                        makeApiCall(feedback, dataUrl);
                    }, function (reason) {
                        makeApiCall(feedback, reason);
                    });
                };
            }
        }
    };
});
