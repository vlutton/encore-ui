/*jshint node:true*/
var Page = require('astrolabe').Page;

var {%= name %} = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.{%= name %} = {

    initialize: function ({%= name %}Element) {
        {%= name %}.rootElement = {
            get: function () { return {%= name %}Element; }
        };
        return Page.create({%= name %});
    }

};
