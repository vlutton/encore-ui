/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxForm = Page.create({
    // Elements
    rxFormInput: {
        get: function () {
            return this.findElement(this.by.id('volumeName'));
        }
    }
});