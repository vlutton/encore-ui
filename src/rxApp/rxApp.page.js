/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxApp = {
    siteTitle: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-app .site-title')); }
    },

    siteNav: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-app-nav')); }
    },
};

exports.rxApp = {
    initialize: function (rxAppElement) {
        rxApp.rootElement = {
            get: function () { return rxAppElement; }
        };
        return Page.create(rxApp);
    },

    help: function () { return Object.keys(rxApp); }

};

var rxPage = {
    pageTitle: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-page .page-title')); }
    },

    pageSubtitle: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-page .page-subtitle')); }
    }
};

exports.rxPage = {
    initialize: function (rxPageElement) {
        rxPage.rootElement = {
            get: function () { return rxPageElement; }
        };
        return Page.create(rxPage);
    },

    help: function () { return Object.keys(rxPage); }

};