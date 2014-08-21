/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxModalAction = Page.create({
    // Elements
    rxModalActionElement: {
        get: function () {
            return element(by.id('rxModalActionElement'));
        }
    }
});
