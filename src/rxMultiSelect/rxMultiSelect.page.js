/*jshint node:true*/
var Page = require('astrolabe').Page;

var selectOptionFromElement = function (optionElement) {

    return Object.create(exports.rxCheckbox.initialize(optionElement.$('input')), {

        /**
         * @memberof rxMultiSelect.option
         * @returns {string} The text inside of the current option.
         */
        text: {
            get: function () {
                return optionElement.getText();
            }
        },

        /**
           @memberof rxMultiSelect.option
           @returns {string} The value bound to the option.
         */
        value: {
            get: function () {
                return optionElement.getAttribute('value');
            }
        }

    });
};

/**
 * @namespace
 */
var rxMultiSelect = {

    lblPreview: {
        get: function () {
            return this.rootElement.$('.preview');
        }
    },

    /**
       Close the menu
       @memberof rxMultiSelect
       @function
       @returns {undefined}
     */
    closeMenu: {
        value: function () {
            var self = this;
            this.isOpen().then(function (isOpen) {
                if (isOpen) {
                    self.lblPreview.click();
                }
            });
        }
    },

    /**
       Open the menu
       @memberof rxMultiSelect
       @function
       @returns {undefined}
     */
    openMenu: {
        value: function () {
            var self = this;
            this.isOpen().then(function (isOpen) {
                if (!isOpen) {
                    self.lblPreview.click();
                }
            });
        }
    },

    /**
       @memberof rxMultiSelect
       @function
       @returns {boolean} - Whether or not the menu is visible.
     */
    isOpen: {
        value: function () {
            return this.rootElement.$('ul').isDisplayed();
        }
    },

    /**
       @memberof rxMultiSelect
       @returns {string} The preview text for the dropdown.
     */
    preview: {
        get: function () {
            return this.lblPreview.getText();
        }
    },

    /**
       @memberof rxMultiSelect
       @returns {string[]} The text of each option element in the dropdown.
     */
    options: {
        get: function () {
            return this.rootElement.$$('rx-select-option').map(function (optionElement) {
                return selectOptionFromElement(optionElement).text;
            });
        }
    },

    /**
       @memberof rxMultiSelect
       @returns {string[]} The value of each option element in the dropdown.
     */
    values: {
        get: function () {
            return this.rootElement.$$('rx-select-option').map(function (optionElement) {
                return selectOptionFromElement(optionElement).value;
            });
        }
    },

    /**
       @memberof rxMultiSelect
       @returns {optionTexts[]} Array of strings representing the currently selected options.
     */
    selectedOptions: {
        get: function () {
            this.openMenu();
            return this.rootElement.$$('rx-select-option').reduce(function (accumulator, optionElement) {
                var option = selectOptionFromElement(optionElement);
                return option.isSelected().then(function (isSelected) {
                    if (isSelected) {
                        return option.text.then(function (text) {
                            accumulator.push(text);
                            return accumulator;
                        });
                    } else {
                        return accumulator;
                    }
                });
            }, []);
        }
    },

    /**
       @namespace
       @memberof rxMultiSelect
       @param {string} optionText - Partial or total string matching the desired option.
       @returns {rxMultiSelect.option} Page object representing an option.
     */
    option: {
        value: function (optionText) {
            var optionElement = this.rootElement.element(by.cssContainingText('rx-select-option', optionText));
            return selectOptionFromElement(optionElement);
        }
    },

    /**
       @memberof rxMultiSelect
       @function
       @param {string[]} optionTexts - Array of partial or total strings matching the desired options to select.
       @returns {undefined}
     */
    select: {
        value: function (optionTexts) {
            var self = this;
            this.openMenu();
            optionTexts.forEach(function (optionText) {
                self.option(optionText).select();
            });
        }
    },

    /**
       @memberof rxMultiSelect
       @function
       @param {string[]} optionTexts - Array of partial or total strings matching the desired options to deselect.
       @returns {undefined}
     */
    deselect: {
        value: function (optionTexts) {
            var self = this;
            this.openMenu();
            optionTexts.forEach(function (optionText) {
                self.option(optionText).deselect();
            });
        }
    }

};

/**
 * @exports encore.rxMultiSelect
 */
exports.rxMultiSelect = {

    /**
       @function
       @param {WebElement} rxMultiSelectElement - WebElement to be transformed into an rxMultiSelectElement object.
       @returns {rxMultiSelect} Page object representing the rxSelectFilter object.
     */
    initialize: function (rxMultiSelectElement) {
        rxMultiSelect.rootElement = {
            get: function () { return rxMultiSelectElement; }
        };
        return Page.create(rxMultiSelect);
    },

    /**
       @returns {rxMultiSelect} Page object representing the _first_ rxMultiSelect object found on the page.
    */
    main: (function () {
        rxMultiSelect.rootElement = {
            get: function () { return $('rx-multi-select'); }
        };
        return Page.create(rxMultiSelect);
    })()

};

/**
   @namespace
 */
// var rxMultiSelect = {

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
//     isDisplayed: {
//         value: function () {
//             return this.rootElement.isDisplayed();
//         }
//     }

// };

/**
   @exports encore.rxMultiSelect
 */
// exports.rxMultiSelect = {

    /**
       @function
       @param {WebElement} rxMultiSelectElement - WebElement to be transformed into an rxMultiSelectElement object.
       @returns {rxMultiSelect} Page object representing the rxMultiSelect object.
     */
    // initialize: function (rxMultiSelectElement) {
    //     rxMultiSelect.rootElement = {
    //         get: function () { return rxMultiSelectElement; }
    //     };
    //     return Page.create(rxMultiSelect);
    // },

    /**
       @returns {rxMultiSelect} Page object representing the _first_ rxMultiSelect object found on the page.
    */
//     main: (function () {
//         rxMultiSelect.rootElement = {
//             get: function () { return $('#rxMultiSelect'); }
//         };
//         return Page.create(rxMultiSelect);
//     })()

// };