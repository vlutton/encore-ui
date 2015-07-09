/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxSortableTable = {

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

/**
   @exports encore.rxSortableTable
 */
exports.rxSortableTable = {

    /**
       @function
       @param {WebElement} rxSortableTableElement - WebElement to be transformed into an rxSortableTableElement object.
       @returns {rxSortableTable} Page object representing the rxSortableTable object.
     */
    initialize: function (rxSortableTableElement) {
        rxSortableTable.rootElement = {
            get: function () { return rxSortableTableElement; }
        };
        return Page.create(rxSortableTable);
    },

    /**
       @returns {rxSortableTable} Page object representing the _first_ rxSortableTable object found on the page.
    */
    main: (function () {
        rxSortableTable.rootElement = {
            get: function () { return $('#rxSortableTable'); }
        };
        return Page.create(rxSortableTable);
    })()

};
