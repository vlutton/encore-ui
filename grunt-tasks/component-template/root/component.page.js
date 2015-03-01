/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var {%= name %} = {

    /**
       Returns whether the root element is currently displayed.
       @function
       @returns {undefined}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

/**
   @exports encore.{%= name %}
 */
exports.{%= name %} = {

    /**
       @function
       @param {WebElement} {%= name %}Element - WebElement to be transformed into an {%= name %}Element object.
       @returns {{%= name %}} Page object representing the {%= name %} object.
     */
    initialize: function ({%= name %}Element) {
        {%= name %}.rootElement = {
            get: function () { return {%= name %}Element; }
        };
        return Page.create({%= name %});
    },

    /**
       @returns {{%= name %}} Page object representing the _first_ {%= name %} object found on the page.
    */
    main: (function () {
        {%= name %}.rootElement = {
            get: function () { return $('#{%= name %}'); }
        };
        return Page.create({%= name %});
    })()

};
