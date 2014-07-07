/*jshint node:true*/
var Page = require('astrolabe').Page;

var tabs = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.tabs = {

    initialize: function (tabsElement) {
        tabs.rootElement = {
            get: function () { return tabsElement; }
        };
        return Page.create(tabs);
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys(tabs); }

};
