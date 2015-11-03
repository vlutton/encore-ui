angular.module('encore.ui.rxFeedback')
/**
 * @ngdoc directive
 * @name rxFeedback.directive:rxFeedback
 * @restrict E
 * @scope
 * @description
 * ## Custom Submission Function
 *
 * The `rxFeedback` directive allows you to define an `on-submit` attribute that points to a custom function for the
 * purposes of overriding the default submission logic.  This function accepts a *single argument* for a
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
