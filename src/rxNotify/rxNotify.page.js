/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxNotify = Page.create({
    // Elements
    rootElement: {
        get: function () {
            return $('.rx-notifications');
        }
    }
});
