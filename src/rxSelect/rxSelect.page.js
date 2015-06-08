/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;
var rxMisc = require('../rxMisc/rxMisc.page').rxMisc;

/**
 * @namespace
 */
var htmlSelectOption = {
    /**
     * @returns {string} The text inside of an `<option>` element
     */
    text: {
        get: function () {
            return this.rootElement.getText();
        }
    },

    /**
     * @returns {string} The "value" attribute for an `<option>` element
     */
    value: {
        get: function () {
            return this.rootElement.getAttribute('value');
        }
    },

    /**
     * @function
     * @description Select an `<option>` element within a `<select>`
     * @returns {undefined}
     */
    select: {
        value: function () {
            rxMisc.slowClick(this.rootElement);
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the `<option>` is currently selected
     */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the `<option>` is currently present
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};//htmlSelectOption

/**
 * @namespace
 */
var htmlSelect = {
    /**
     * @function
     * @returns {Boolean} Whether or not the `<select>` element is disabled
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
     * @returns {Boolean} Whether the `<select>` element is currently displayed
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the `<select>` element exists on the page
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the `<select>` element is valid
     */
    isValid: {
        value: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return _.contains(classes.split(' '), 'ng-valid');
            });
        }
    },

    /* ========================================
     * OPTIONS
     * ======================================== */

    /**
     * @function
     * @param {String} optionText
     *   Partial or total string to match the display value of the desired `<option>` element
     * @returns {htmlSelectOption} Page object representing an option
     */
    option: {
        value: function (optionText) {
            var optionElement = this.findOptionContaining(optionText);
            return exports.htmlSelectOption.initialize(optionElement);
        }
    },

    /**
     * @function
     * @returns {String[]} List of htmlSelectOption page objects for each `<option>` element in the dropdown
     */
    options: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return exports.htmlSelectOption.initialize(optionElement).text;
            });
        }
    },

    /**
     * @function
     * @returns {Integer} The number of `<option>` elements in the dropdown
     */
    optionCount: {
        value: function () {
            return this.rootElement.$$('option').count();
        }
    },

    /**
     * @function
     * @param {String} optionText
     * Partial or total string to match the display value of the desired `<option>` element
     * @returns {Boolean} Whether or not the option exists
     */
    optionExists: {
        value: function (optionText) {
            return this.findOptionContaining(optionText).isPresent();
        }
    },

    /**
     * @function
     * @returns {String[]} List of values for each `<option>` element in the dropdown
     */
    values: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return exports.htmlSelectOption.initialize(optionElement).value;
            });
        }
    },

    /**
     * @function
     * @returns {htmlSelectOption} Page object representing the currently selected `<option>` element.
     */
    selectedOption: {
        get: function () {
            return exports.htmlSelectOption.initialize(this.rootElement.$('option:checked'));
        }
    },

    /**
     * @function
     * @param {String} optionText
     *   Partial or total string to match the display value of the desired `<option>` element.
     * @returns {WebElement}
     */
    findOptionContaining: {
        value: function (optionText) {
            return this.rootElement.element(by.cssContainingText('option', optionText));
        }
    },

    /**
     * @function
     * @param {String} optionText
     *   Partial or total string to match the display value of the desired `<option>` element.
     * @example
     * ```js
     * var dropdown = encore.htmlSelect.initialize($('#country-select'));
     * dropdown.select('United States');
     * ```
     */
    select: {
        value: function (optionText) {
            return this.option(optionText).select();
        }
    }
};//htmlSelect

/**
 * @namespace
 * @extends htmlSelect
 * @description Type of htmlSelect that includes functionality required to interact with additional markup.
 */
var rxSelect = _.defaults(htmlSelect, {
    eleWrapper: {
        get: function () {
            return this.rootElement.element(by.xpath('..'));
        }
    },

    eleFakeSelect: {
        get: function () {
            return this.eleWrapper.$('.fake-select');
        }
    },

    /**
     * @function
     * @override
     * @memberOf rxSelect
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
     * @override
     * @memberOf rxSelect
     * @returns {Boolean} Whether the styled element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed() && this.eleFakeSelect.isDisplayed();
        }
    },

    /**
     * @function
     * @override
     * @memberOf rxSelect
     * @returns {Boolean} Whether or not the styled element exists on the page
     */
    isPresent: {
        value: function () {
            return this.eleFakeSelect.isPresent();
        }
    }
});//rxSelect

/**
 * @exports encore.htmlSelectOption
 */
exports.htmlSelectOption = {
    /**
     * @function
     * @param {WebElement} selectOption - WebElement to be transformed into an htmlSelectOption page object
     * @returns {htmlSelectOption} Page object representing an `<option>` element.
     */
    initialize: function (selectOptionElement) {
        htmlSelectOption.rootElement = {
            get: function () { return selectOptionElement; }
        };
        return Page.create(htmlSelectOption);
    }
};

/**
 * @exports encore.htmlSelect
 */
exports.htmlSelect = {
    /**
     * @function
     * @param {WebElement} selectElement - WebElement to be transformed into an htmlSelect page object
     * @returns {htmlSelect} Page object representing a `<select>` element
     */
    initialize: function (selectElement) {
        htmlSelect.rootElement = {
            get: function () { return selectElement; }
        };
        return Page.create(htmlSelect);
    },

    /**
     * @returns {htmlSelect} Page object representing the _first_ `<select>` element found on the page
     */
    main: (function () {
        htmlSelect.rootElement = {
            get: function () { return $('select')[0]; }
        };
    })(),

    /**
     * @function
     * @description Generates a getter and a setter for an HTML select element on your page.
     * @param {WebElement} elem - The WebElement for the HTML select.
     * @returns {Object} A getter and a setter to be applied to an HTML select page object.
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.htmlSelect.initialize(elem).selectedOption;
            },
            set: function (optionText) {
                exports.htmlSelect.initialize(elem).select(optionText);
            }
        };
    }
};

/**
 * @exports encore.rxSelect
 */
exports.rxSelect = {
    /**
     * @function
     * @param {WebElement} rxSelectElement - WebElement to be transformed into an rxSelect page object
     * @returns {rxSelect} Page object representing a `<select rx-select>` element.
     */
    initialize: function (rxSelectElement) {
        rxSelect.rootElement = {
            get: function () { return rxSelectElement; }
        };
        return Page.create(rxSelect);
    },

    /**
     * @returns {rxSelect} Page object representing the _first_ `<select rx-select>` element found on the page
     */
    main: (function () {
        rxSelect.rootElement = {
            get: function () { return $('select[rx-select]')[0]; }
        };
    })(),

    /**
     * @function
     * @description Generates a getter and a setter for an rxSelect element on your page.
     * @param {WebElement} elem - The WebElement for the rxSelect.
     * @returns {Object} A getter and a setter to be applied to an rxSelect page object.
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.rxSelect.initialize(elem).selectedOption;
            },
            set: function (optionText) {
                exports.rxSelect.initialize(elem).select(optionText);
            }
        };
    }
};
