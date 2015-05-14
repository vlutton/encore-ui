/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
   @namespace
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
     * @returns {Boolean} Whether the native checkbox element is valid.
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
       @returns {Boolean} Whether or not the checkbox element is currently selected.
    */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the wrapper is disabled.
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
   @exports encore.rxCheckbox
 */
exports.rxCheckbox = {
    /**
       @function
       @param {WebElement} rxCheckboxElement - WebElement to be transformed into an rxCheckboxElement object.
       @returns {rxCheckbox} Page object representing the rxCheckbox object.
     */
    initialize: function (rxCheckboxElement) {
        rxCheckbox.rootElement = {
            get: function () { return rxCheckboxElement; }
        };
        return Page.create(rxCheckbox);
    },

    /**
       @returns {rxCheckbox} Page object representing the _first_ rxCheckbox object found on the page.
    */
    main: (function () {
        rxCheckbox.rootElement = {
            get: function () { return $('input[rx-checkbox]'); }
        };
        return Page.create(rxCheckbox);
    })()
};
