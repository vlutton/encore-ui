/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

/**
   @namespace
 */
var rxSelectFilter = {

    /**
       @function
       @param {string} label - The label of the rxMultiSelect dropdown.
       @returns {rxMultiSelect} Page object representing the rxSelectFilter object.
     */
    multiSelectByLabel: {
        value: function (label) {
            var selectWrapper = element(by.cssContainingText('.select-wrapper', label));
            return exports.rxMultiSelect.initialize(selectWrapper.$('rx-multi-select'));
        }
    },

    /**
       @function
       @param {Object} filterData - Key-value pairs of the rxMultiSelects' labels and their options to select.
                                    The value is an object, where the keys are the options and the values indicate
                                    if the option should be selected or deselected.
       @returns {undefined}
       @example
       ```js
        multiSelect.filter({
            Account: {
                All: false,
                B: true
            }
        });
       ```
     */
    apply: {
        value: function (filterData) {
            var self = this;
            _.each(filterData, function (options, label) {
                var multiSelect = self.multiSelectByLabel(label);
                _.each(options, function (shouldSelect, option) {
                    if (shouldSelect) {
                        multiSelect.select([option]);
                    } else {
                        multiSelect.deselect([option]);
                    }
                });
                multiSelect.closeMenu();
            });
        }
    }

};

/**
   @exports encore.rxSelectFilter
 */
exports.rxSelectFilter = {

    /**
       @function
       @param {WebElement} rxSelectFilterElement - WebElement to be transformed into an rxSelectFilterElement object.
       @returns {rxSelectFilter} Page object representing the rxSelectFilter object.
     */
    initialize: function (rxSelectFilterElement) {
        rxSelectFilter.rootElement = {
            get: function () { return rxSelectFilterElement; }
        };
        return Page.create(rxSelectFilter);
    },

    /**
       @returns {rxSelectFilter} Page object representing the _first_ rxSelectFilter object found on the page.
    */
    main: (function () {
        rxSelectFilter.rootElement = {
            get: function () { return $('rx-select-filter'); }
        };
        return Page.create(rxSelectFilter);
    })()

};
