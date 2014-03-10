/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxButton = {};

exports.rxButton = {
    initialize: function (rxButtonElement) {
        rxButton.rootElement = {
            get: function () { return rxButtonElement; }
        };
        return Page.create(rxButton);
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys(rxButton); }
};
