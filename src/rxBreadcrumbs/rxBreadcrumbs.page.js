/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxBreadcrumbs = Page.create({
    // Elements
    rxBreadcrumbsElement: {
        get: function () {
            return this.findElement(this.by.id('rxBreadcrumbsElement'));
        }
    }
});