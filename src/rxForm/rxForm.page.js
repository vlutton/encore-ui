/*jshint node:true*/
var Page = require('astrolabe').Page;

var optionFromElement = function (optionElement) {

    return Page.create({

        text: {
            get: function () {
                return optionElement.getText();
            }
        },

        select: {
            value: function () {
                browser.actions().mouseDown(optionElement).mouseUp().perform();
            }
        },

        value: {
            get: function () {
                return optionElement.getAttribute('value');
            }
        },

        isSelected: {
            value: function () {
                return optionElement.isSelected();
            }
        }

    });

};

var dropdown = {

    allOptions: {
        get: function () {
            return this.rootElement.$$('option').reduce(function (acc, optionElement) {
                var option = optionFromElement(optionElement);
                return option.text.then(function (text) {
                    acc[text] = option;
                    return acc;
                });
            }, {});
        }
    },

    selectedOption: {
        get: function () {
            return optionFromElement(this.rootElement.$('option:checked'));
        }
    },

    optionCount: {
        value: function () {
            return this.rootElement.$$('option').count();
        }
    },

    optionExists: {
        value: function (optionText) {
            return this.rootElement.element(by.cssContainingText('option', optionText)).isPresent();
        }
    },

    option: {
        value: function (optionText) {
            var optionElement = this.rootElement.element(by.cssContainingText('option', optionText));
            return optionFromElement(optionElement);
        }
    },

    select: {
        value: function (optionText) {
            return this.option(optionText).select();
        }
    }

};

exports.rxForm = {

    dropdown: {
        initialize: function (selectElement) {
            dropdown.rootElement = {
                get: function () {
                    return selectElement;
                }
            };
            return Page.create(dropdown);
        }
    },

};
