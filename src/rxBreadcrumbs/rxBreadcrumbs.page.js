/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxBreadcrumbs = {

};

exports.rxBreadcrumbs = {
    initialize: function (rootElement) {
        rxBreadcrumbs.rootElement = {
            get: function () { return rootElement; }
        };
        return Page.create(rxBreadcrumbs);
    }
};