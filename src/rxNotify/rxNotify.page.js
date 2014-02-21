/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxNotify = Page.create({
    // Elements
    rootElement: {
        get: function () {
            return this.findElement(this.by.css('.rx-notifications'));
        }
    }
});