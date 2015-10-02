/*jshint node:true*/
var _ = require('lodash');
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxTable = {
    /**
     * @returns {rxBatchActions} - The rxBatchActions page object for the table (see encore.rxBatchActions)
     */
    batchActions: {
        get: function () {
            if (!this.batchActionsObject) {
                this.batchActionsObject = exports.rxBatchActionMenu.initialize(this.rootElement.$('rx-batch-actions'));
            }
            return this.batchActionsObject;
        }
    },

    /**
     * @returns {rxBulkSelect} - The rxBulkSelect page object for the table (see encore.rxBulkSelect)
     */
    bulkSelect: {
        get: function () {
            if (!this.bulkSelectObject) {
                this.bulkSelectObject = exports.rxBulkSelect.initialize(this.rootElement, this.rowFromElement);
            }
            return this.bulkSelectObject;
        }
    },

    /**
     * @returns {WebElement[]} - Returns the elements for all the data columns on the table.
     */
    columnElements: {
        get: function () {
            var selectors = [];
            _.each(this.config.columns, function (column, index) {
                selectors.push('thead > tr > th.column-title:nth-of-type(' + (index + 1) + ')');
            });
            return this.rootElement.$$(selectors.join(', '));
        }
    },

    /**
     * @returns {WebElement[]} - Returns the elements for all the column headers on the table.
     */
    headerElements: {
        get: function () {
            var selectors = [];
            _.each(this.config.columns, function (column, index) {
                var selector = 'thead > tr > th.column-title:nth-of-type(' + (index + 1) + ')';
                if (column.sortable) {
                    selector += ' span.ng-scope:first-of-type';
                }
                selectors.push(selector);
            });
            return this.rootElement.$$(selectors.join(', '));
        }
    },

    /**
     * @returns {WebElement[]} - Returns the elements for all the data rows on the table.
     */
    rowElements: {
        get: function () {
            return this.rootElement.$$('tbody > tr');
        }
    },

    /**
     * @returns {WebElement[]} - Returns the elements for all the footer rows on the table.
     */
    footerRowElements: {
        get: function () {
            return this.rootElement.$$('tfoot > tr');
        }
    },

    /**
     * @returns {WebElement} - The actual column headers present on the table.
     */
    searchElement: {
        get: function () {
            return this.rootElement.$('rx-search-box');
        }
    },

    /**
     * @function
     * @param {Integer} columnIndex - The zero-index of a column in the table.
     * @returns {rxTableColumn} - The rxTableColumn page object for the column (see rxTableColumn).
     */
    column: {
        value: function (columnIndex) {
            return exports.rxTableColumn.initialize(this, columnIndex);
        }
    },

    /**
     * @returns {Text[]} - The actual column headers present on the table.
     */
    headers: {
        get: function () {
            return this.headerElements.getText();
        }
    },

    /**
     * @function
     * @param {Integer} rowIndex - The zero-index of a row in the table.
     * @returns {rxTableRow} - The rxTableRow page object for the row (see rxTableRow).
     */
    row: {
        value: function (rowIndex) {
            return exports.rxTableRow.initialize(this, rowIndex);
        }
    },

    /**
     * @function
     * @returns {rxSearchBox} - The rxSearchBox page object associated with the table.
     */
    searchBox: {
        get: function () {
            if (!this.rxSearchBoxObject) {
                this.rxSearchBoxObject = exports.rxSearchBox.initialize(this.searchElement);
            }
            return this.rxSearchBoxObject;
        }
    },

    /**
     * @function
     * @param {String} filterText - The text which will be applied to the searchBox element.
     */
    filter: {
        value: function (filterText) {
            this.searchBox.term = filterText;
        }
    },

    /**
     * @function
     * @returns {Boolean} - Whether or not the table is present in the page.
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @returns {rxPagination} - The pagination page object for the table
     */
    pagination: {
        get: function () {
            return exports.rxPaginate.initialize(this.rootElement.$('.rx-paginate'));
        }
    }
};

/**
 * @function
 * @param {WebElement} rxTableElement - WebElement to be transformed into an rxTable page object.
 * @param {Object} config - Configuration object describing the table.
 * @returns {rxTable} - Page object representing the table on the page.
 * @description
 *   The rxTable object exposes a table object with accessors for bulkSelect, the searchBox, individual rows, and
 *   individual columns.  The columns may be accessed as properties using a convenient name specified in the config
 *   object passed to the rxTable#initialize function.
 *
 *   Rows accessed from an rxTable object will also inherit the column property names passed in the config object,
 *   but when accessing their data properties, only the appropriate cell for the column on that row will return.
 *
 *   Columns each have a data property that corresponds to an array of data items in that column (or in the context
 *   of a row, simply the corresponding cell's data).  They may optionally have a sort property which will be used
 *   just for the sort tests.  The property accessors and the types can be found in the rxTableColumn file.
 *
 *   IMPORTANT: When adding data accessors from columns, as much as possible we should try to return strings.  In
 *   some cases --most notably the name/id, checkbox, and ip address fields-- we have to return a slightly different
 *   object.  Examples are listed in the rxTableColumn file.  For sorting, we should return a different sortable types.
 *
 * @example
 * ```js
 * require rxTable = require('path/to/rxTable');
 * var myPage = Page.create({
 *     entityTable: {
 *         get: function () {
 *             var tblElement = $('my-table-selector');
 *             var config = {
 *                 label: 'My Table',                       // Label used to refer to the table in preconstructed tests.
 *                 repeaterString: 'row in tableData',      // Repeater string for handling sortable columns.
 *                 floatingHeader: true,                    // Flag for if the table should have floating headers.
 *                 columns: [{                              // Ordered array of column configuration objects.
 *                     name: 'field1',                      // Name used as the table property for the column.
 *                     label: 'Field The First!',           // The actual label of the column as displayed on the page.
 *                     type: rxTable.columnTypes.string,    // The column type (see rxTableColumn for more information)
 *                     sortable: true                       // Flag for if the column should be sortable
 *                 },{
 *                     name: 'field2',
 *                     label: 'The Best Date Field',
 *                     type: rxTable.columnTypes.date,
 *                     sortable: true
 *                 }]
 *             };
 *             return rxTable.initialize(tblElement, config);
 *         }
 *     }
 * });
 * ```
 */
function initialize (rxTableElement, config) {
    // Create a new object so that we don't change the prototype object
    var table = {
        /**
         * @function
         * @returns {WebElement} - The rxTableElement that the table was built with.
         */
        rootElement: {
            get: function () { return rxTableElement; }
        },

        /**
         * @function
         * @returns {Object} - The configuration object that the table was built with.
         */
        config: {
            get: function () { return config; }
        }
    };

    // Add column accessors for each column by name as a property on the table object
    _.each(config.columns, function (column, columnIndex) {
        table[column.name] = {
            get: function () {
                return this.column(columnIndex);
            }
        };
    });

    return Page.create(_.merge(table, rxTable));
}

/**
 * @function
 * @param {Object} config - Configuration object describing the table.
 * @returns {rxTable} Page object representing the first or "main" table on the page.
 */
function main (config) {
    var elem = $$('rx-page table').first();
    return initialize(elem, config);
}

/**
 * @exports rxTable
 */
exports.rxTable = Page.create({
    columnTypes: { get: function () { return exports.rxTableColumn.types; }},
    initialize: { get: function () { return initialize; }},
    main: { get: function () { return main; }}
});
