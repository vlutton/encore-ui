/*jshint node:true*/
var Page = require('astrolabe').Page;

var {%= name %} = {

    isDisplayed: {
        value: function () {
            return rootElement.isDisplayed();
        }
    }

};

exports.{%= name %} = {

    initialize: function ({%= name %}Element) {
        {%= name %}.rootElement = {
            get: function () { return {%= name %}Element; }
        };
        return Page.create({%= name %});
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys({%= name %}); }

};
