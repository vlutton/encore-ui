/*jshint node:true*/

var rxFeedback = {

    selReportType: {
        get: function () {
            return this.rootElement.element(by.model('fields.type'));
        }
    },

    txtFeedback: {
        get: function () {
            return this.rootElement.element(by.model('fields.description'));
        }
    },

    open: {
        value: function () {
            var page = this;
            return this.isDisplayed().then(function (isDisplayed) {
                if (!isDisplayed) {
                    page.eleFeedback.$('a').click();
                }
            });
        }
    },

    type: {
        get: function () {
            return this.selReportType.$('option:checked').getText();
        },
        set: function (optionText) {
            var option = this.selReportType.element(by.cssContainingText('option', optionText));
            browser.actions().mouseDown(option).mouseUp().perform();
        }
    },

    types: {
        get: function () {
            return this.selReportType.$$('option').map(function (option) {
                return option.getText();
            });
        }
    },

    description: {
        get: function () {
            return this.txtFeedback.getAttribute('value');
        },
        set: function (feedback) {
            this.txtFeedback.clear();
            this.txtFeedback.sendKeys(feedback);
        }
    },

    descriptionPlaceholder: {
        get: function () {
            return this.txtFeedback.getAttribute('placeholder');
        }
    },

    descriptionLabel: {
        get: function () {
            return this.rootElement.$('.feedback-description').getText();
        }
    },

    send: {
        /**
          Prepares, writes, and submits feedback.
          If `confirmSuccessWithin` is defined, a confirmation of submission success must appear
          within `confirmSuccessWithin` milliseconds.

          If confirmSuccessFn is undefined, the default behavior will look for an rxNotify success
          message. Otherwise, `confirmSuccessFn` will be attempted until it yields a truthy value,
          using Protractor's `wait` function.
        */
        value: function (feedbackType, feedbackText, confirmSuccessWithin, confirmSuccessFn) {
            var page = this;
            return this.isDisplayed().then(function (isDisplayed) {
                if (!isDisplayed) {
                    page.open();
                }
                page.reportType = feedbackType;
                page.description = feedbackText;
                page.submit();
                if (confirmSuccessWithin !== undefined) {
                    page.confirmSuccess(confirmSuccessWithin, confirmSuccessFn);
                }

            });
        }
    },

    confirmSuccess: {
        value: function (within, fn) {
            if (fn === undefined) {
                var notifications = exports.rxNotify || require('../rxNotify/rxNotify.page').rxNotify;
                fn = function () {
                    return notifications.all.exists('feedback', 'success');
                };
            }

            browser.wait(function () {
                return fn();
            }, within, 'feedback submission did not confirm success within ' + within + ' msecs');
        }
    }

};

exports.rxFeedback = {

    initialize: function (rxFeedbackElement) {
        var modal = exports.rxModalAction || require('../rxModalAction/rxModalAction.page').rxModalAction;
        rxFeedback.eleFeedback = {
            get: function () { return rxFeedbackElement; }
        };
        return modal.initialize(rxFeedback);
    }

};
