/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxBulkSelectDefaultRowFn = function (rowElement) {
    return exports.rxCheckbox.initialize(rowElement.$('input[type="checkbox"]'));
};

var rxBulkSelect = {

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    isEnabled: {
        value: function () {
            return this.rootElement.element(
                by.cssContainingText('.btn-link', 'Batch Actions')
            ).isEnabled();
        }
    },

    selectAllCheckbox: {
        get: function () {
            return exports.rxCheckbox.initialize(
                this.rootElement.$('[rx-bulk-select-header-check]').$('input[type="checkbox"]')
            );
        }
    },

    eleBulkMessage: {
        get: function () {
            return this.rootElement.$('.bulk-select-header');
        }
    },

    bulkMessage: {
        get: function () {
            return this.eleBulkMessage.element(by.binding('numSelected')).getText().then(function (text) {
                return _.isEmpty(text) ? null : text;
            });
        }
    },

    selectAll: {
        value: function () {
            this.eleBulkMessage.element(by.partialButtonText('Select all')).click();
        }
    },

    clearSelections: {
        value: function () {
            this.eleBulkMessage.element(by.partialButtonText('Clear')).click();
        }
    },

    tblRows: {
        get: function () {
            return this.rootElement.$$('tbody tr');
        }
    },

    row: {
        value: function (i) {
            return this.rowFromElement(this.tblRows.get(i));
        }
    },

    tblSelectedRows: {
        get: function () {
            return this.rootElement.$$('tbody tr.selected');
        }
    },

    anySelected: {
        value: function () {
            return this.tblSelectedRows.count().then(function (numSelectedRows) {
                return numSelectedRows > 0;
            });
        }
    },

    allSelected: {
        value: function () {
            var page = this;
            return this.tblRows.count().then(function (numRows) {
                return page.tblSelectedRows.count().then(function (numSelectedRows) {
                    return numRows === numSelectedRows;
                });
            });
        }
    },

    /**
       @function
       @param {Number|Number[]} i - The index or indices of the row(s) to select
     */
    selectByIndex: {
        value: function selectRowByIndex (i) {
            if (Array.isArray(i)) {
                _.each(i, selectRowByIndex, this);
            } else {
                rxBulkSelectDefaultRowFn(this.tblRows.get(i)).select();
            }
        }
    },

    /**
       @function
       @param {Number|Number[]} i - The index or indices of the row(s) to deselect
     */
    deselectByIndex: {
        value: function deselectRowByIndex (i) {
            if (Array.isArray(i)) {
                _.each(i, deselectRowByIndex, this);
            } else {
                rxBulkSelectDefaultRowFn(this.tblRows.get(i)).deselect();
            }
        }
    }

};

/**
   @exports encore.rxBulkSelect
 */
exports.rxBulkSelect = {

    /**
       @function
       @param {WebElement} rxBulkSelectElement - WebElement to be transformed into an rxBulkSelectElement object.
       @returns {rxBulkSelect} Page object representing the rxBulkSelect object.
     */
    initialize: function (rxBulkSelectElement, rxBulkSelectRowFn) {
        rxBulkSelect.rowFromElement = {
            value: rxBulkSelectRowFn || rxBulkSelectDefaultRowFn
        };

        rxBulkSelect.rootElement = {
            get: function () { return rxBulkSelectElement; }
        };
        return Page.create(rxBulkSelect);
    },

    /**
       @returns {rxBulkSelect} Page object representing the _first_ rxBulkSelect object found on the page.
    */
    main: (function () {
        rxBulkSelect.rowFromElement = {
            value: rxBulkSelectDefaultRowFn
        };

        rxBulkSelect.rootElement = {
            get: function () { return $('[rx-bulk-select]'); }
        };
        return Page.create(rxBulkSelect);
    })()

};
