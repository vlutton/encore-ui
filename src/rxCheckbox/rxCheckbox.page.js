/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxCheckbox = {
    eleWrapper: {
        get: function () {
            return this.rootElement.element(by.xpath('..'));
        }
    },

    eleFakeCheckbox: {
        get: function () {
            return this.eleWrapper.$('.fake-checkbox');
        }
    },

    /**
       Useful for situations where input types might change in the future, ensuring that the expected one is being used.
       @returns {Boolean} Whether or not the element in question is a checkbox.
     */
    isCheckbox: {
        value: function () {
            return this.rootElement.getAttribute('type').then(function (type) {
                return type === 'checkbox';
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the checkbox is currently displayed.
     */
    isDisplayed: {
        value: function () {
            var page = this;
            return this.eleFakeCheckbox.isPresent().then(function (isFakeCheckbox) {
                return isFakeCheckbox ? page.eleFakeCheckbox.isDisplayed() : page.rootElement.isDisplayed();
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the checkbox is disabled.
     */
    isDisabled: {
        value: function () {
            var page = this;
            return this.eleFakeCheckbox.isPresent().then(function (isFakeCheckbox) {
                if (isFakeCheckbox) {
                    return page.eleWrapper.getAttribute('class').then(function (classes) {
                        return _.contains(classes.split(' '), 'rx-disabled');
                    });
                }
                return page.rootElement.getAttribute('disabled').then(function (disabled) {
                    return (disabled ? true : false);
                });
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the checkbox is present on the page.
     */
    isPresent: {
        value: function () {
            var page = this;
            return this.eleFakeCheckbox.isPresent().then(function (isFakeCheckbox) {
                return isFakeCheckbox || page.rootElement.isPresent();
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the checkbox is valid.
     */
    isValid: {
        value: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return _.contains(classes.split(' '), 'ng-valid');
            });
        }
    },

    /**
       @function
       @returns {Boolean} Whether or not the checkbox is selected.
     */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @function
     * @description Make sure checkbox is selected/checked
     */
    select: {
        value: function () {
            var checkbox = this.rootElement;
            return this.isSelected().then(function (selected) {
                if (!selected) {
                    checkbox.click();
                }
            });
        }
    },

    /**
     * @deprecated
     * @function
     * @description
     * **DEPRECATED**: Use {@link rxCheckbox.deselect} instead.
     * This function will be removed in a future release of the EncoreUI framework.
     * @returns {undefined}
     */
    unselect: {
        value: function () {
            return this.deselect();
        }
    },

    /**
     * @function
     * @description make sure checkbox is deselected/unchecked
     */
    deselect: {
        value: function () {
            var checkbox = this.rootElement;
            return this.isSelected().then(function (selected) {
                if (selected) {
                    checkbox.click();
                }
            });
        }
    }
};

/**
 * @exports encore.rxCheckbox
 * @description Page object for interacting with rxCheckbox elements
 */
exports.rxCheckbox = {
    /**
     * @function
     * @param {WebElement} rxCheckboxElement - WebElement to be transformed into an rxCheckbox page object
     * @returns {rxCheckbox} Page object representing the rxCheckbox element
     */
    initialize: function (rxCheckboxElement) {
        rxCheckbox.rootElement = {
            get: function () { return rxCheckboxElement; }
        };
        return Page.create(rxCheckbox);
    },

    /**
       Don't use this if you're expecting a regular html checkbox on the page. This only checks for Encore
       specific rxForm-style checkboxes.
       @returns {rxCheckbox} Page object representing the _first_ `<input rx-checkbox />` element found on the page.
     */
    main: (function () {
        rxCheckbox.rootElement = {
            get: function () { return $('input[rx-checkbox]'); }
        };
        return Page.create(rxCheckbox);
    })(),

    /**
     * @function
     * @description Generates a getter and a setter for an rxCheckbox element on your page.
     * @param {WebElement} elem - The WebElement for the rxCheckbox.
     * @returns {Object} A getter and a setter to be applied to a rxCheckbox page object.
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.rxCheckbox.initialize(elem).isSelected();
            },
            set: function (enable) {
                var checkbox = exports.rxCheckbox.initialize(elem);
                enable ? checkbox.select() : checkbox.deselect();
            }
        };
    }
};
