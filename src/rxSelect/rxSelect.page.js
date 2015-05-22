/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var htmlSelectOption = {
    /**
     * @returns {string} The text inside of an `<option>` element
     */
    label: {
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
     * @description
     *   Select an `<option>` element within a `<select>`
     *
     *   Equivalent to `browser.actions().mouseDown(elem).mouseUp().perform();`.
     *   This function should be used when dealing with odd or unusual behavior while interacting with click events
     *   that don't seem to work right. Either the element does not appear to respond to a normal `.click()` call, or
     *   the element is responding to more than one click event. This typically happens more often in Firefox than
     *   in other browsers. See {@link rxForm.dropdown.option.select} for an example of a function that will
     *   slow click an element to achieve consistent behavior.
     *
     * @returns {undefined}
     */
    select: {
        value: function () {
            browser.actions().mouseDown(this.rootElement).mouseUp().perform();
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
     * @returns {Page} Page object representing an option
     */
    option: {
        value: function (optionText) {
            var optionElement = this.findOption(optionText);
            return exports.htmlSelectOption.initialize(optionElement);
        }
    },

    /**
     * @function
     * @returns {Page[]} List of Page objects for each `<option>` element in the dropdown
     */
    options: {
        get: function () {
            return this.optionElements.map(function (optionElement) {
                return exports.htmlSelectOption.initialize(optionElement);
            });
        }
    },

    /**
     * @function
     * @returns {Integer} The number of `<option>` elements in the dropdown
     */
    optionCount: {
        value: function () {
            return this.optionElements.count();
        }
    },

    /**
     * @function
     * @returns {WebElement[]} List of all `<option>` elements in the dropdown
     */
    optionElements: {
        get: function () {
            return this.rootElement.$$('option');
        }
    },

    /**
     * @function
     * @param {String} optionText
     *   Partial or total string to match the display value of the desired `<option>` element
     * @returns {Boolean} Whether or not the option exists
     */
    optionExists: {
        value: function (optionText) {
            return this.findOption(optionText).isPresent();
        }
    },

    /**
     * @function
     * @returns {String[]} List of visible text for each `<option>` element in the dropdown
     */
    optionLabels: {
        get: function () {
            return this.options.map(function (option) {
                return option.label;
            });
        }
    },

    /**
     * @function
     * @returns {String[]} List of values for each `<option>` element in the dropdown
     */
    optionValues: {
        get: function () {
            return this.options.map(function (option) {
                return option.value;
            });
        }
    },

    /**
     * @function
     * @returns {Page[]} List of Page objects for each selected `<option>` element in the dropdown
     */
    selectedOptions: {
        get: function () {
            return this.selectedOptionElements.map(function (optionElement) {
                return exports.htmlSelectOption.initialize(optionElement);
            });
        }
    },

    /**
     * @function
     * @returns {Integer} The number of selected `<option>` elements in the dropdown
     */
    selectedOptionCount: {
        value: function () {
            return this.selectedOptionElements.count();
        }
    },

    /**
     * @function
     * @returns {WebElement[]} List of all selected `<option>` elements in the dropdown.
     */
    selectedOptionElements: {
        get: function () {
            return this.rootElement.$$('option:checked');
        }
    },

    /**
     * @function
     * @param {String} optionText
     *   Partial or total string to match the display value of the desired `<option>` element.
     * @returns {WebElement}
     */
    findOption: {
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
     * dropdown.selectOption('United States');
     * ```
     */
    selectOption: {
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
var rxSelect = {
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
     * @returns {Boolean} Whether or not the styled element exists on the page
     */
    isPresent: {
        value: function () {
            return this.eleFakeSelect.isPresent();
        }
    }
};
rxSelect = _.assign(htmlSelect, rxSelect);

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
    })()
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
    })()
};
