/*jshint node:true*/
var Page = require('astrolabe').Page;

var typeahead = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.typeahead = {

    initialize: function (typeaheadElement) {
        typeahead.rootElement = {
            get: function () { return typeaheadElement; }
        };
        return Page.create(typeahead);
    }

};
