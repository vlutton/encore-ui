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
    }

};
