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
       @returns {Page} Page object representing the {@link {%= name %}} object.
     */
    initialize: function ({%= name %}Element) {
        {%= name %}.rootElement = {
            get: function () { return {%= name %}Element; }
        };
        return Page.create({%= name %});
    }

};
