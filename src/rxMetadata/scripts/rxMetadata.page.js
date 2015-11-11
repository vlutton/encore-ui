/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxMetadata = {

    /**
       @function
       @param {String} metadataTerm - The term to lookup in the metadata component.
       @returns {*} The web element of the metadata term, unless a `transformFn` is provided, or `null` if not found.
     */
    term: {
        value: function (metadataTerm, fallbackReturnValue) {
            var page = this;
            var termElement = $('rx-meta[label="' + metadataTerm  + '"]');
            return encore.rxMisc.unless(termElement, function (foundTermElement) {
                var definitionElement = foundTermElement.$('.definition');
                if (page.transformFns[metadataTerm] !== undefined) {
                    return page.transformFns[metadataTerm](definitionElement);
                }
                return definitionElement.getText();
            }, fallbackReturnValue);
        }
    },

    terms: {
        get: function () {
            return this.rootElement.$$('div.label').map(function (keyElem) {
                return keyElem.getText().then(function (key) {
                    // strip ending colon character
                    return key.slice(0, -1);
                });
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the root element is present.
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};

/**
 * @exports encore.rxMetadata
 */
exports.rxMetadata = {
    /**
     * @function
     * @param {WebElement} rxMetadataElement - WebElement to be transformed into an rxMetadata page object.
     * @param {Object} transformFns - An object defining which metadata entries should be transformed, and how.
     * @returns {rxMetadata} Page object representing the rxMetadata element.
     * @example
     * ```js
     * var myPage = Page.create({
     *     metadata: {
     *         get: function () {
     *             // Every other metadata entry here should just be text.
     *             // For those entries which need some extra processing, they are defined below
     *             var transforms = {
     *                 'Signup Date': function (elem) {
     *                     return elem.getText().then(function (text) {
     *                         return new Date(text);
     *                     });
     *                 },
     *                 'Overdue Balance': function (elem) {
     *                     return elem.getText().then(encore.rxMisc.currencyToPennies);
     *                 },
     *                 'Current Due': function (elem) {
     *                     return elem.getText().then(encore.rxMisc.currencyToPennies);
     *                 },
     *                 'Expiration Date' function (elem) {
     *                     return elem.getText().then(function (text) {
     *                         return new Date(text);
     *                     });
     *                 }
     *             }
     *             return encore.rxMetadata.initialize($('rx-metadata'), transforms));
     *         }
     *     }
     * });
     * ```
     */
    initialize: function (rxMetadataElement, transformFns) {
        if (transformFns === undefined) {
            transformFns = {};
        }

        rxMetadata.transformFns = {
            get: function () { return transformFns; }
        };

        rxMetadata.rootElement = {
            get: function () { return rxMetadataElement; }
        };
        return Page.create(rxMetadata);
    },

    /**
     * There is no way to configure `transformFns` from the main instance of an rxMetadata component.
     * @returns {rxMetadata} Page object representing the _first_ rxMetadata object found on the page.
     */
    main: (function () {
        rxMetadata.transformFns = {
            get: function () { return {}; }
        };

        rxMetadata.rootElement = {
            get: function () { return $('rx-metadata'); }
        };
        return Page.create(rxMetadata);
    })()
};
