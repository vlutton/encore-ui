/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxPermission = Page.create({
    // Elements
    rxPermission: {
        get: function () {
            return $('rx-permission');
        }
    }
});
