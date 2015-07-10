/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxRadio = {
    eleWrapper: {
        get: function () {
            return this.rootElement.element(by.xpath('..'));
        }
    },

    eleFakeRadio: {
        get: function () {
            return this.eleWrapper.$('.fake-radio');
        }
    },

    /**
       Useful for situations where input types might change in the future, ensuring that the expected one is being used.
       @returns {Boolean} Whether or not the element in question is a radio button.
     */
    isRadio: {
        value: function () {
            return this.rootElement.getAttribute('type').then(function (type) {
                return type === 'radio';
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the radio button is valid
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
     * @returns {Boolean} Whether the radio element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            var page = this;
            return this.eleFakeRadio.isPresent().then(function (isFakeRadio) {
                return isFakeRadio ? page.eleFakeRadio.isDisplayed() : page.rootElement.isDisplayed();
            });
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether or not the radio button is present.
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @return {Boolean} whether or not the radio element is disabled
     */
    isDisabled: {
        value: function () {
            var page = this;
            return this.eleFakeRadio.isPresent().then(function (isFakeRadio) {
                if (isFakeRadio) {
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
     * @returns {boolean} Whether or not the radio button is currently selected.
     */
    isSelected: {
        value: function () {
            return this.rootElement.isSelected();
        }
    },

    /**
     * @function
     * @returns {undefined}
     * @description Makes sure that the radio button is selected.
     */
    select: {
        value: function () {
            var radio = this.rootElement;
            return this.isSelected().then(function (selected) {
                if (!selected) {
                    radio.click();
                }
            });
        }
    }
};

/**
 * @exports encore.rxRadio
 */
exports.rxRadio = {
    /**
     * @function
     * @param {WebElement} rxRadioElement - WebElement to be transformed into an rxRadio page object
     * @returns {rxRadio} Page object representing the rxRadio element
     */
    initialize: function (rxRadioElement) {
        rxRadio.rootElement = {
            get: function () { return rxRadioElement; }
        };
        return Page.create(rxRadio);
    },

    /**
     * Don't use this if you're expecting a regular html radio button on the page. This only checks for Encore
     * specific rxForm-style radio buttons.
     * @returns {rxRadio} Page object representing the _first_ `<input rx-radio />` element found on the page
     */
    main: (function () {
        rxRadio.rootElement = {
            get: function () { return $('input[rx-radio]'); }
        };
        return Page.create(rxRadio);
    })(),

    /**
     * @function
     * @description Generates a getter and a setter for an rxRadio element on your page.
     * @param {WebElement} elem - The WebElement for the rxRadio.
     * @returns {Object} A getter and a setter to be applied to a rxRadio page object.
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.rxRadio.initialize(elem).isSelected();
            },
            // passing `false` to this will do nothing.
            set: function (enable) {
                if (enable) {
                    exports.rxRadio.initialize(elem).select();
                }
            }
        };
    }
};
