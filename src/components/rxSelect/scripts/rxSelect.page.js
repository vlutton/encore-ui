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
            value: function (slowClick) {
                slowClick ? exports.rxMisc.slowClick(rootElement) : rootElement.click();
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
        value: function (optionText, slowClick) {
            if (slowClick === undefined) {
                slowClick = true;
            }
            return this.option(optionText).select(slowClick);
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
     * An important note: when setting the value of the rxSelect, you can set it to either
     * the text value of the option in the dropdown you'd like selected, or you can pass in
     * an object. See the example below for more information about the differences between
     * these two input types.
     * @function
     * @description Generates a getter and a setter for an rxSelect element on your page.
     * @param {WebElement} elem - The WebElement for the rxSelect.
     * @param {Boolean} [slowClick=true] - Whether to use slow click globally for all accessor interactions.
     * @returns {Object} A getter and a setter to be applied to an rxSelect page object.
     * @example
     ```js
     var form = Page.create({
         state: encore.rxSelect.generateAccessor(element(by.model('states'))),
         // you can also specify a single dropdown's slow clicking globally this way
         county: encore.rxSelect.generateAccessor(element(by.model('county')), false)
     });

     it('should select a new state normally', function () {
         form.state = 'Indiana';
         expect(form.state).to.eventually.equal('Indiana');
     });

     it('should select a new state and county without using `rxMisc.slowClick()`', function () {
         form.state = { option: 'Texas', slowClick: false };
         form.county = 'Bexar'; // automatically uses `false` for slow clicking
         expect(form.state).to.eventually.equal('Texas');
         expect(form.county).to.eventually.equal('Bexar');
     });
     ```
     */
    generateAccessor: function (elem, slowClick) {
        return {
            get: function () {
                return exports.rxSelect.initialize(elem).selectedOption;
            },
            set: function (options) {
                if (_.isObject(options)) {
                    // More specific requirements for this dropdown have been specified
                    exports.rxSelect.initialize(elem).select(options.option, options.slowClick);
                } else {
                    // Select the option matching text using `slowClick`
                    exports.rxSelect.initialize(elem).select(options, slowClick);
                }
            }
        };
    }
};
