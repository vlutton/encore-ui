/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

/**
   @namespace
 */
var rxModalAction = {

    rootElement: {
        get: function () {
            return $('.modal');
        }
    },

    btnSubmit: {
        get: function () {
            return this.rootElement.$('.submit');
        }
    },

    btnCancel: {
        get: function () {
            return this.rootElement.$('.cancel');
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the modal is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
       @returns {String} The modal's title.
     */
    title: {
        get: function () {
            return this.rootElement.$('.modal-title').getText();
        }
    },

    /**
       @returns {String} The modal's subtitle.
     */
    subtitle: {
        get: function () {
            return this.rootElement.$('.modal-subtitle').getText();
        }
    },

    /**
       Closes the modal by clicking the little "x" in the top right corner.
       @function
       @returns {undefined}
     */
    close: {
        value: function () {
            this.rootElement.$('.modal-close').click();
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the modal can be submitted in its current state.
     */
    canSubmit: {
        value: function () {
            return this.btnSubmit.getAttribute('disabled').then(function (isDisabled) {
                return isDisabled === null;
            });
        }
    },

    /**
       Clicks the "submit" button. This isn't exactly what you think it is in a multi-step modal!
       @function
       @returns {undefined}
     */
    submit: {
        value: function () {
            this.btnSubmit.click();
        }
    },

    /**
       Cancels out of the current modal by clicking the "cancel" button
       @function
       @returns {undefined}
     */
    cancel: {
        value: function () {
            exports.rxMisc.slowClick(this.btnCancel);
        }
    }

};

/**
   @exports encore.rxModalAction
 */
exports.rxModalAction = {

    /**
       By default, every modal will have a title, subtitle, a submit button, a cancel button, and more.
       However, you will likely have some custom form elements in a modal, and you'll need to define those
       as a page object ahead of time. Pass in an object that represents your modal's custom elements
       and it'll be included with the rest of the modal page object here.
       @function
       @param {Object=} customFunctionality - Page object to extend on top of {@link rxModalAction}.
       @returns {rxModalAction} Page object representing the rxModalAction object.
       @example
       ```js
        var customFunctionalty = {
            txtNewPassword: {
                get: function () {
                    // `this.rootElement` is never defined here.
                    // This is perfectly normal. `this.rootElement` will be available
                    // when it is applied to the default modal, which has a rootElement.
                    return this.rootElement.element(by.model('fields.password'));
                }
            },

            txtErrorMessage: {
                get: function () {
                    return this.rootElement.$('.error-message');
                }
            },

            newPassword: {
                get: function () {
                    return this.txtNewPassword.getAttribute('value');
                },
                set: function (password) {
                    this.txtNewPassword.clear();
                    this.txtNewPassword.sendKeys(password);
                }
            }
        };

        // this modal not only has a close button, title, etc...
        // but also a couple of form elements for checking an old password and a new password.
        changePasswordModal = modal.initialize(customFunctionalty);
       ```
     */
    initialize: function (customFunctionality) {
        if (!_.isObject(customFunctionality)) {
            customFunctionality = {};
        }
        return Page.create(_.merge(customFunctionality, rxModalAction));
    }

};
