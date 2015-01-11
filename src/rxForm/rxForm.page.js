/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

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
        // `dropdownElement` should be the `<select>` tag
        initialize: function (selectElement) {
            dropdown.rootElement = {
                get: function () {
                    return selectElement;
                }
            };
            return Page.create(dropdown);
        }
    },

    checkbox: {
        // `checkboxElement` should be the `<input>` tag
        initialize: function (checkboxElement) {
            return Page.create({
                check: {
                    value: function () {
                        return checkboxElement.isSelected().then(function (checked) {
                            if (!checked) {
                                checkboxElement.click();
                            }
                        });
                    }
                },

                uncheck: {
                    value: function () {
                        return checkboxElement.isSelected().then(function (checked) {
                            if (checked) {
                                checkboxElement.click();
                            }
                        });
                    }
                }
            });
        }
    },

    form: {
        fill: function (reference, formData) {
            /*
              Set `value` in `formData` to the page object's current method `key`.
              Aids in filling out form data via javascript objects.

              For example:
              yourPage.fill({
                  aTextbox: 'My Name',
                  aRadioButton: 'Second Option'
                  aSelectDropdown: 'My Choice'
                  aModule: {
                      hasMethods: 'Can Accept Input Too',
                      deepNesting: {
                          might: 'be overkill at this level'
                      }
                  }
              });
              Would invoke yourPage.aTextbox's set method, which might call sendKeys, and so on.
              For an example of this in use, see src/rxFormPage/docs/rxFormPage.midway.js

              Pass in the context to evaluate under as `reference` (typically, `this`).
            */
            var next = this;
            var page = reference;
            _.forEach(formData, function (value, key) {
                if (_.isPlainObject(value)) {
                    // There is a deeply-nested function call in the form.
                    reference = page[key];
                    next.fill(reference, value);
                } else {
                    page[key] = value;
                }
            });
        }
    }

};
