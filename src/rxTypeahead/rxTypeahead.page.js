/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxTypeahead = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.rxTypeahead = {

    initialize: function (rxTypeaheadElement) {
        rxTypeahead.rootElement = {
            get: function () { return rxTypeaheadElement; }
        };
        return Page.create(rxTypeahead);
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys(rxTypeahead); }

};
