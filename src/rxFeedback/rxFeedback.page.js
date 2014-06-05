/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxFeedback = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.rxFeedback = {

    initialize: function (rxFeedbackElement) {
        rxFeedback.rootElement = {
            get: function () { return rxFeedbackElement; }
        };
        return Page.create(rxFeedback);
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys(rxFeedback); }

};
