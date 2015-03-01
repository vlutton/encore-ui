/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxCharacterCount = {

    lblRemaining: {
        get: function () {
            return this.rootElement.element(by.xpath('..')).element(by.binding('remaining'));
        }
    },

    txtComment: {
        get: function () {
            return this.rootElement;
        },
    },

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    comment: {
        get: function () {
            return this.txtComment.getAttribute('value');
        },

        set: function (text) {
            this.txtComment.clear();
            this.txtComment.sendKeys(text);
        }
    },

    remaining: {
        get: function () {
            return this.lblRemaining.getText().then(parseInt);
        }
    },

    isNearLimit: {
        value: function () {
            return this.lblRemaining.getAttribute('class').then(function (classNames) {
                return classNames.indexOf('near-limit') > -1;
            });
        }
    },

    isOverLimit: {
        value: function () {
            return this.lblRemaining.getAttribute('class').then(function (classNames) {
                return classNames.indexOf('over-limit') > -1;
            });
        }
    },

};

/**
   @exports encore.rxCharacterCount
 */
exports.rxCharacterCount = {

    /**
       @function
       @param {WebElement} rxCharacterCountElement - WebElement to be transformed into an rxCharacterCountElement object
       @returns {Page} Page object representing the {@link rxCharacterCount} object.
     */
    initialize: function (rxCharacterCountElement) {
        rxCharacterCount.rootElement = {
            get: function () { return rxCharacterCountElement; }
        };
        return Page.create(rxCharacterCount);
    },

    /**
       @returns {rxCharacterCount} Page object representing the _first_ rxCharacterCount object found on the page.
     */
    main: (function () {
        rxCharacterCount.rootElement = {
            get: function () { return $('[rx-character-count]'); }
        };
        return Page.create(rxCharacterCount);
    })()

};
