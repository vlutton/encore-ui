/*jshint node:true*/
var Page = require('astrolabe').Page;

var typeahead = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.typeahead = {

    initialize: function (typeaheadElement) {
        typeahead.rootElement = {
            get: function () { return typeaheadElement; }
        };
        return Page.create(typeahead);
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys(typeahead); }

};
