/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxLogout = {
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    logout: {
        value: function () {
            this.rootElement.click();
        }
    }
};

exports.rxLogout = {
    initialize: function (rxLogoutElement) {
        rxLogout.rootElement = {
            get: function () { return rxLogoutElement; }
        };
        return Page.create(rxLogout);
    },

    // Displays a helpful, console.log-able version of the page object.
    // Astrolabe's objects will not contain the methods available.
    // Use this method instead to see what properties and functions exist.
    help: function () { return Object.keys(rxLogout); }
};