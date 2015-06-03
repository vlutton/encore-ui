/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxFieldName = {
    eleRequiredSymbol: {
        get: function () {
            return this.rootElement.$('.required-symbol');
        }
    },

    eleContent: {
        get: function () {
            return this.rootElement.$('.rx-field-name-content');
        }
    },

    /**
     * @function
     * @returns {Boolean}
     *   True if field name displays as required (symbol is currently displayed).
     */
    isSymbolVisible: {
        value: function () {
            return this.eleRequiredSymbol.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the required symbol is present in the DOM.
     */
    isSymbolPresent: {
        value: function () {
            return this.eleRequiredSymbol.isPresent();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the root element is present on the page.
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};//rxFieldName

/**
 * @exports encore.rxFieldName
 */
exports.rxFieldName = {
    /**
     * @function
     * @param {WebElement} rxFieldNameElement - WebElement to be transformed into an rxFieldNameElement object.
     * @returns {rxFieldName} Page object representing the rxFieldName object.
     */
    initialize: function (rxFieldNameElement) {
        rxFieldName.rootElement = {
            get: function () { return rxFieldNameElement; }
        };
        return Page.create(rxFieldName);
    },

    /**
     * @returns {rxFieldName} Page object representing the _first_ rxFieldName object found on the page.
     */
    main: (function () {
        rxFieldName.rootElement = {
            get: function () { return $('rx-field-name')[0]; }
        };
        return Page.create(rxFieldName);
    })()
};
