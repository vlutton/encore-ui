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
// requires html2canvas
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
.service('rxFeedbackSvc', function ($resource, feedbackApi, $location, $window) {
    var apiEndpoint;

    var setEndpoint = function (url) {
        apiEndpoint = $resource(url);
    };

    // set a default endpoint
    setEndpoint(feedbackApi);

    var emailFeedback = function (feedback) {
        var subject = 'Encore Feedback: ' + feedback.type.label;
        var body = [
            'Current Page: ' + $location.absUrl(),
            'Browser User Agent: ' + navigator.userAgent,
            'Comments: ' + feedback.description
        ];

        body = body.join('\n\n');

        // if the feedback service fails, this fallback function can be run as a last ditch effort
        $window.location.href = encodeURI('mailto:encoreui@lists.rackspace.com?subject=' + subject +
            '&body=' + body);
    };

    return {
        api: apiEndpoint,
        setEndpoint: setEndpoint,
        fallback: emailFeedback
    };
})
.directive('rxFeedback', function (feedbackTypes, $location, rxFeedbackSvc, rxScreenshotSvc, rxNotify) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFeedback.html',
        link: function (scope) {
            scope.currentUrl = $location.url();
            scope.feedbackTypes = feedbackTypes;

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
                    screenshot: screenshot
                }, showSuccessMessage, function (httpResponse) {
                    showFailureMessage(httpResponse);

                    rxFeedbackSvc.fallback(feedback);
                });
            };

            scope.sendFeedback = function (feedback) {
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
    };
});