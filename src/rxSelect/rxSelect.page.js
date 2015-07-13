/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * The specific information about a single select element option.
 * Returned from {@link rxSelect.option}
 * @namespace rxSelect.option.option
 */
var rxSelectOptionFromElement = function (rootElement) {

    return Page.create({

        /**
         * @memberof rxSelect.option.option
         * @returns {string} The text inside of an `<option>` element
         */
        text: {
            get: function () {
                return rootElement.getText();
            }
        },

        /**
         * @memberof rxSelect.option.option
         * @returns {string} The "value" attribute for an `<option>` element
         */
        value: {
            get: function () {
                return rootElement.getAttribute('value');
            }
        },

        /**
         * @memberof rxSelect.option.option
         * @function
         * @description Select an `<option>` element within a `<select>`
         * @returns {undefined}
         */
        select: {
            value: function () {
                exports.rxMisc.slowClick(rootElement);
            }
        },

        /**
         * @memberof rxSelect.option.option
         * @function
         * @returns {Boolean} Whether or not the `<option>` is currently selected
         */
        isSelected: {
            value: function () {
                return rootElement.isSelected();
            }
        },

        /**
         * @memberof rxSelect.option.option
         * @function
         * @returns {Boolean} Whether or not the `<option>` is currently present
         */
        isPresent: {
            value: function () {
                return rootElement.isPresent();
            }
        }
    });

};//rxSelectOptionFromElement

/**
 * @namespace
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
     * @memberOf rxSelect
     * @returns {Boolean} Whether or not the select element contains the disabled class name.
     */
    isDisabled: {
        value: function () {
            var page = this;
            return this.eleFakeSelect.isPresent().then(function (isFakeSelect) {
                if (isFakeSelect) {
                    return page.eleWrapper.getAttribute('class').then(function (classes) {
                        return _.contains(classes.split(' '), 'rx-disabled');
                    });
                }
                return page.rootElement.getAttribute('disabled').then(function (disabled) {
                    return disabled === null ? false : true;
                });
            });
        }
    },

    /**
     * @function
     * @memberOf rxSelect
     * @returns {Boolean} Whether the select element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            var page = this;
            return this.eleFakeSelect.isPresent().then(function (isFakeSelect) {
                if (isFakeSelect) {
                    var checks = [page.rootElement.isDisplayed(), page.eleFakeSelect.isDisplayed()];
                    return protractor.promise.all(checks).then(_.every);
                }
                return page.rootElement.isDisplayed();
            });
        }
    },

    /**
     * @function
     * @memberOf rxSelect
     * @returns {Boolean} Whether or not the select element exists on the page.
     */
    isPresent: {
        value: function () {
            var page = this;
            return this.eleFakeSelect.isPresent().then(function (isFakeSelect) {
                return isFakeSelect || page.rootElement.isPresent();
            });
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
     * @namespace rxSelect.option
     * @param {String} optionText
     *   Partial or total string to match the display value of the desired `<option>` element
     * @returns {rxSelectOption.option.option} Page object representing an option
     * @example
     * ```js
     * var homeState = encore.rxSelect.main.option('Indiana');
     * homeState.select();
     * expect(homeState.isSelected()).to.eventually.be.true;
     * ```
     */
    option: {
        value: function (optionText) {
            var optionElement = this.findOptionContaining(optionText);
            return rxSelectOptionFromElement(optionElement);
        }
    },

    /**
     * @returns {String[]} List of rxSelectOption page objects for each `<option>` element in the dropdown
     */
    options: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return rxSelectOptionFromElement(optionElement).text;
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
     * @returns {String[]} List of values for each `<option>` element in the dropdown
     */
    values: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return rxSelectOptionFromElement(optionElement).value;
            });
        }
    },

    /**
     * @returns {rxSelectOption} Page object representing the currently selected `<option>` element.
     */
    selectedOption: {
        get: function () {
            return rxSelectOptionFromElement(this.rootElement.$('option:checked'));
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

};//rxSelect

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
     * Don't use this if you're expecting a regular html select element on the page. This only checks for Encore
     * specific rxForm-style select elements.
     * @returns {rxSelect} Page object representing the _first_ `<select rx-select>` element found on the page
     */
    main: (function () {
        rxSelect.rootElement = {
            get: function () { return $('select[rx-select]'); }
        };
        return Page.create(rxSelect);
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
