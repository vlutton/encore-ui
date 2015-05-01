/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var htmlCheckbox = {
    /**
     * @function
     * @returns {Boolean} Whether the checkbox is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
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
     * @function
     * @returns {Boolean} Whether or not the checkbox is currently selected
     */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the checkbox is disabled
     */
    isDisabled: {
        value: function () {
            return this.rootElement.getAttribute('disabled').then(function (disabled) {
                return (disabled ? true : false);
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the checkbox exists on the page
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
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
 * @namespace
 * @extends htmlCheckbox
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
     * @function
     * @returns {Boolean} Whether root element is of type="checkbox"
     */
    isCheckbox: {
        value: function () {
            return this.rootElement.getAttribute('type').then(function (ilk) {
                return ilk === 'checkbox';
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the fake checkbox is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.eleFakeCheckbox.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the wrapper has expected disabled class name
     */
    isDisabled: {
        value: function () {
            return this.eleWrapper.getAttribute('class').then(function (classes) {
                return _.contains(classes.split(' '), 'rx-disabled');
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the styled element exists on the page
     */
    isPresent: {
        value: function () {
            return this.eleFakeCheckbox.isPresent();
        }
    }
};
rxCheckbox = _.assign(htmlCheckbox, rxCheckbox);

/**
 * @exports encore.htmlCheckbox
 * @description Page object for interacting with plain old html checkboxes
 */
exports.htmlCheckbox = {
    /**
     * @function
     * @param {WebElement} checkboxElement
     *   WebElement to be transformed into an htmlCheckbox page object.
     * @returns {htmlCheckbox} Page object representing the checkbox object
     */
    initialize: function (checkboxElement) {
        htmlCheckbox.rootElement = {
            get: function () { return checkboxElement; }
        };
        return Page.create(htmlCheckbox);
    },

    /**
     * @returns {htmlCheckbox}
     *   Page object representing the _first_ `<input type="checkbox" />`
     *   object found on the page.
     */
    main: (function () {
        htmlCheckbox.rootElement = {
            get: function () { return $('input[type="checkbox"]'); }
        };
        return Page.create(htmlCheckbox);
    })()
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
     * @returns {rxCheckbox} Page object representing the _first_ `<input rx-checkbox />` element found on the page
     */
    main: (function () {
        rxCheckbox.rootElement = {
            get: function () { return $('input[rx-checkbox]'); }
        };
        return Page.create(rxCheckbox);
    })()
};
