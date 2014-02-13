/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.{%= name %} = Page.create({
    // Elements
    {%= name %}Element: {
        get: function () {
            return this.findElement(this.by.css('.{%= dashedName %}'));
        }
    }
});