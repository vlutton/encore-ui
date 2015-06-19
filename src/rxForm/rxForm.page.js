/*jshint node:true*/
var _ = require('lodash');

var rxMisc = require('../rxMisc/rxMisc.page').rxMisc;
var htmlCheckbox = require('../rxCheckbox/rxCheckbox.page').htmlCheckbox;
var htmlRadio = require('../rxRadio/rxRadio.page').htmlRadio;
var htmlSelect = require('../rxSelect/rxSelect.page').htmlSelect;

/**
 * @exports encore.rxForm
 */
exports.rxForm = {
    /**
     * @namespace
     */
    textField: {
        /**
         * @function
         * @description
         * Generates a getter and a setter for a text field on your page.
         * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
         * @param {WebElement} elem - The WebElement for the text field.
         * @returns {Object} A getter and a setter to be applied to a text field in a page object.
         *
         * @example
         * ```js
         * var yourPage = Page.create({
         *     plainTextbox: rxForm.textField.generateAccessor(element(by.model('username')));
         * });
         *
         * it('should fill out the text box', function () {
         *     yourPage.plainTextbox = 'My Username'; // setter
         *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
         * });
         * ```
         */
        generateAccessor: function (elem) {
            return {
                get: function () {
                    return elem.getAttribute('value');
                },
                set: function (input) {
                    elem.clear();
                    elem.sendKeys(input);
                }
            };
        }
    },

    form: {
        /**
         * @private
         * @description
         * This is an alias to the new `rxForm.fill`, which was formally `rxForm.form.fill`.
         * It is kept here to remain backwards compatible with previous versions of the library.
         */
        fill: function (reference, formData) {
            exports.rxForm.fill(reference, formData);
        }
    },

    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     * @param {Object} reference - Context to evaluate under as `this` (typically, `this`).
     * @param {Object} formData - Key-value pairs of deeply-nested form items, and their values to fill.
     *
     * @example
     * ```js
     * var yourPage = Page.create({
     *     form: {
     *         set: function (formData) {
     *             rxForm.fill(this, formData);
     *         }
     *     }
     * });
     *
     * yourPage.form = {
     *     aTextbox: 'My Name',
     *     aRadioButton: 'Second Option'
     *     aSelectDropdown: 'My Choice'
     *     aModule: {
     *         hasMethods: 'Can Accept Input Too',
     *         deepNesting: {
     *             might: 'be overkill at this level'
     *         }
     *     }
     * };
     * ```
     */
    fill: function (reference, formData) {
        var next = this;
        var page = reference;
        _.forEach(formData, function (value, key) {
            if (_.isPlainObject(value)) {
                // There is a deeply-nested function call in the form.
                reference = page[key];
                next.fill(reference, value);
            } else {
                page[key] = value;
            }
        });
    },

    /**
     * @namespace
     * @deprecated
     * @description
     * **DEPRECATED** Please use `encore.htmlCheckbox` or `encore.rxCheckbox` instead.
     * This item will be removed in a future release of the EncoreUI framework.
     */
    checkbox: htmlCheckbox,

    /**
     * @namespace
     * @deprecated
     * @description
     * **DEPRECATED** Please use `encore.htmlRadio` or `encore.rxRadio` instead.
     * This item will be removed in a future release of the EncoreUI framework.
     */
    radioButton: htmlRadio,

    /**
     * @namespace
     * @deprecated
     * @description
     * **DEPRECATED** Please use `encore.htmlSelect` or `encore.rxSelect` instead.
     * This item will be removed in a future release of the EncoreUI framework.
     */
    dropdown: htmlSelect,

    /**
     * @deprecated
     * @description
     * **DEPRECATED**: Please use `rxMisc.currencyToPennies` instead.
     * This function will be removed in a future release of the EncoreUI framework.
     */
    currencyToPennies: rxMisc.currencyToPennies,

    /**
     * @deprecated
     * @description
     * **DEPRECATED**: Please use `rxMisc.slowClick` instead.
     * This function will be removed in a future release of the EncoreUI framework.
     */
    slowClick: rxMisc.slowClick
};
