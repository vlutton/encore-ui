/*jshint node:true*/
var Page = require('astrolabe').Page;

var {%= name %} = {

};

exports.{%= name %} = {

    initialize: function ({%= name %}Element) {
        page.rootElement = {
            get: function () { return {%= name %}Element; }
        };
        return Page.create({%= name %});
    }

};
