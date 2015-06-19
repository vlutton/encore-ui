/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxCheckbox = require('../rxCheckbox/rxCheckbox.page').rxCheckbox;

/**
 * @private
 * @description Shared function in both one row's `isSelected`, and `selections` getter.
 */
var isOptionSelected = function (eleOptionRow) {
    return eleOptionRow.getAttribute('class').then(function (classNames) {
        return classNames.indexOf('selected') > -1;
    });
};

var optionRowFromElement = function (eleOptionRow) {
    return Page.create({
        rootElement: {
            get: function () { return eleOptionRow; }
        },

        /**
         * @function
         * @memberof rxOptionTable.row
         * @returns {boolean} Whether or not the row is currently selected.
         */
        isSelected: {
            value: function () {
                return isOptionSelected(this.rootElement);
            }
        },

        /**
         * @function
         * @memberof rxOptionTable.row
         * @returns {boolean} Whether or not the row is visually marked as "current".
         */
        isCurrent: {
            value: function () {
                return this.rootElement.getAttribute('class').then(function (classNames) {
                    return classNames.indexOf('current') > -1;
                });
            }
        },

        /**
         * @function
         * @memberof rxOptionTable.row
         * @description
         * Return the value of the cell by `columnName`, using `getText` by default.
         * For more control, pass in a `customFn`.
         * The reason `columnName` is used, as opposed to by binding, is due to some
         * complexity contained within the `getContent` function in the rxOptionTable directive.
         * [Link to the `getContent` function]{@link http://goo.gl/HKBoez}.
         * There are columns that may contain static data (or expressions to be evaluated against `$scope`)
         * for every row, and those data items are never bound to `$scope`. Although the column.keys that are
         * passed into `$scope.getContent` that contain angular expressions can be located by binding, there are
         * cases when plain text or HTML gets passed in. These never get bound to `$scope`. They can, however,
         * be located by querying the column name via CSS selector, so that's used instead.
         * @param {string} columnName - Column name to grab the current row's cell under.
         * @param {function} [customFn=getText()] - Special work to be done to the resulting `cellElement`.
         */
        cell: {
            value: function (columnName, customFn) {
                if (customFn === undefined) {
                    customFn = function (cellElement) {
                        return cellElement.getText();
                    };
                }

                var css = 'td[data-column^="' + columnName + '"]';
                return customFn(this.rootElement.$(css));
            }
        },

        /**
         * @memberof rxOptionTable.row
         * @description
         * Since checkboxes are a superset of radio input elements, a checkbox is used.
         * @returns {rxCheckbox} Page object representing a checkbox.
         */
        selectInput: {
            get: function () {
                var inputElement = this.rootElement.$('input');
                return rxCheckbox.initialize(inputElement);
            }
        },

        /**
         * @function
         * @memberof rxOptionTable.row
         * @description Selects the current row.
         * @returns {undefined}
         */
        select: {
            value: function () {
                this.selectInput.select();
            }
        },

        /**
         * @function
         * @memberof rxOptionTable.row
         * @description Unselects the current row.
         * @returns {undefined}
         */
        unselect: {
            value: function () {
                this.selectInput.deselect();
            }
        }
    });
};//optionRowFromElement

var cellSelectorForColumn = function (columnName) {
    return 'tr td[data-column^="' + columnName + '"]';
};

/**
 * @private
 * @description
 * Extract the row number that a certain cell was found in.
 * This is tightly coupled to the implementation of the directive's data population scheme!
 * See the rxOptionTable's html template, in the column repeater's `label[for]` html.
 * If that ever changes, the functionality in this page object may become tedious to support later.
 */
var rowNumberFromCell = function (cellElement) {
    return cellElement.getAttribute('data-row-number').then(function (number) {
        return parseInt(number, 10);
    });
};

/**
 * @namespace
 */
var rxOptionTable = {
    tblRows: {
        get: function () {
            return this.rootElement.$$('.datum-row');
        }
    },

    tblColumns: {
        get: function () {
            return this.rootElement.$$('thead th.column');
        }
    },

    lblEmptyWarningMessage: {
        get: function () {
            return this.rootElement.$('.empty-message-row .empty-message');
        }
    },

    /**
     * @function
     * @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @returns {boolean} Whether or not the table's  the empty message label is currently present.
     */
    isEmpty: {
        value: function () {
            return this.lblEmptyWarningMessage.isPresent();
        }
    },

    /**
     * @returns {string|null} The currently displayed empty message label text, or `null` if not present.
     */
    emptyMessage: {
        get: function () {
            var page = this;
            return this.isEmpty().then(function (empty) {
                return empty ? page.lblEmptyWarningMessage.getText() : null;
            });
        }
    },

    /**
     * @namespace
     * @param {number} rowIndex - Index of the row in the table.
     * @returns {rxOptionTable.row} Page object representing a row.
     */
    row: {
        value: function (rowIndex) {
            return optionRowFromElement(this.tblRows.get(rowIndex));
        }
    },

    /**
     * @description
     * Will default to the first selected row if many are selected.
     * Be certain you have a selected row before calling this, or a
     * NoSuchElementError will be thrown.
     * @returns {rxOptionTable.row} Page object representing a row.
     */
    selectedRow: {
        get: function () {
            return optionRowFromElement(this.rootElement.$('.selected'));
        }
    },

    /**
     * @returns {string[]} Every column heading's text, as an array.
     */
    columnNames: {
        get: function () {
            return this.tblColumns.map(function (columnElement) {
                return columnElement.getText();
            });
        }
    },

    /**
     * @function
     * @description
     * Return the value of the cells found under `columnName`, using `getText` by default.
     * For more control, pass in a `customFn`.
     * @param {string} columnName - Column name containing the cell elements to be retrieved.
     * @param {function} [customFn=getText()] - Special work to be done on the column's cell elements.
     * @returns {*|string[]} Array of return values specified in `customFn`, or an array of strings from `getText()`
     *
     * @example
     * ```js
     * // three rows, with ['$0.00', '$1.00', '$2.00'] in their cells, respectively.
     * var penniesData = [0, 100, 200];
     * var penniesFn = function (cellElements) {
     *     return cellElements.map(function (cellElement) {
     *         return cellElement.getText().then(rxMisc.currencyToPennies);
     *     });
     * };
     *
     * // without the second argument, each cell will have `.getText()` called on it
     * expect(optionTable.columnData('Surcharge', penniesFn)).to.eventually.eql(penniesData);
     * ```
     */
    columnData: {
        value: function (columnName, customFn) {
            if (customFn === undefined) {
                customFn = function (cellElements) {
                    return cellElements.map(function (cellElement) {
                        return cellElement.getText();
                    });
                };
            }

            var css = cellSelectorForColumn(columnName);
            return customFn(this.rootElement.$$(css));
        }
    },

    /**
     * @function
     * @description Unselects every row in the rxOptionTable.
     * @returns {undefined}
     */
    unselectAll: {
        value: function () {
            this.tblRows.map(function (rowElement) {
                optionRowFromElement(rowElement).unselect();
            });
        }
    },

    /**
     * @function
     * @description
     * Unselect a row by the `columnName` that contains `columnText`.
     * This function uses cssContainingText, be certain your column name and text is unique.
     * @param {string} columnName - Name of the column that contains the cell to select.
     * @param {string} columnText - Cell text that uniquely identifies the selection.
     * @returns {undefined}
     */
    unselectByColumnText: {
        value: function (columnName, columnText) {
            var page = this;
            var css = cellSelectorForColumn(columnName);
            var cellElement = this.rootElement.element(by.cssContainingText(css, columnText));
            return rowNumberFromCell(cellElement).then(function (rowNumber) {
                optionRowFromElement(page.tblRows.get(rowNumber)).unselect();
            });
        }
    },

    /**
     * @function
     * @description
     * Unselect options where each `{ columnName: columnText }` in `selections` is passed to
     * {@link rxOptionTable.unselectByColumnText}.
     * @param {Object[]} selections - Array of single key-value pairs to unselect.
     * @returns {undefined}
     * @example
     * ```js
     * unselectMany([{ 'Name': 'Item 1' },
     *               { 'Name': 'Item 2' }]);
     * ```
     */
    unselectMany: {
        value: function (selections) {
            var page = this;
            _.forEach(selections, function (selection) {
                page.unselectByColumnText(_.first(_.keys(selection)), _.first(_.values(selection)));
            });
        }
    },

    /**
     * @function
     * @description
     * Select a row by the `columnName` that contains `columnText`.
     * This function uses cssContainingText, be certain your column name and text is unique.
     * @param {string} columnName - Name of the column that contains the cell to select.
     * @param {string} columnText - Cell text that uniquely identifies the selection.
     * @returns {undefined}
     */
    selectByColumnText: {
        value: function (columnName, columnText) {
            var page = this;
            var css = cellSelectorForColumn(columnName);
            var cellElement = this.rootElement.element(by.cssContainingText(css, columnText));
            return rowNumberFromCell(cellElement).then(function (rowNumber) {
                optionRowFromElement(page.tblRows.get(rowNumber)).select();
            });
        }
    },

    /**
     * @function
     * @description
     * Select options where each `{ columnName: columnText }` in `selections` is passed to
     * {@link rxOptionTable.selectByColumnText}.
     * @param {Object[]} selections - Array of single key-value pairs to select.
     * @returns {undefined}
     * @example
     * ```js
     * selectMany([{ 'Name': 'Item 1' },
     *             { 'Name': 'Item 2' }]);
     * ```
     */
    selectMany: {
        value: function (selections) {
            var page = this;
            _.forEach(selections, function (selection) {
                page.selectByColumnText(_.first(_.keys(selection)), _.first(_.values(selection)));
            });
        }
    },

    /**
     * @description
     * Return a list of row indexes that are currently selected.
     * Get the row yourself if you need more information about the row's contents.
     * @returns {number[]} All selected rows' indexes from the rxOptionTable.
     */
    selections: {
        get: function () {
            return this.tblRows.map(function (rowElement, index) {
                return isOptionSelected(rowElement).then(function (selected) {
                    if (selected) {
                        return index;
                    }
                });
            }).then(function (indexes) {
                // `.map` will return `undefined` for non-selected rows. Drop those results.
                return _.reject(indexes, _.isUndefined);
            });
        }
    },

    /**
     * @description
     * Return a list of row indexes that are currently disabled.
     * @returns {number[]} All disabled row indexes from the rxOptionTable
     */
    disabledOptions: {
        get: function () {
            return this.tblRows.map(function (rowElement, index) {
                return rowElement.$('.option-input')
                    .getAttribute('disabled')
                    .then(function (disabled) {
                        if (disabled) { return index; }
                    });
            }).then(function (indexes) {
                // `.map` will return `undefined` for enabled rows. Drop those results.
                return _.reject(indexes, _.isUndefined);
            });
        }
    }
};

/**
 * @deprecated
 * @namespace
 * @description
 * **DEPRECATED**: Please use {@link rxOptionTable} as a stand-in replacement.
 */
var rxOptionFormTable = rxOptionTable; // jshint ignore:line

/**
 * @exports encore.rxOptionTable
 */
exports.rxOptionTable = {
    /**
     * @function
     * @param {WebElement} rxOptionTableElement - WebElement to be transformed into an rxOptionTableElement object.
     * @returns {rxOptionTable} Page object representing the rxOptionTable object.
     */
    initialize: function (rxOptionTableElement) {
        rxOptionTable.rootElement = {
            get: function () { return rxOptionTableElement; }
        };
        return Page.create(rxOptionTable);
    },

    /**
     * @returns {rxOptionTable} Page object representing the _first_ rxOptionTable object found on the page.
     */
    main: (function () {
        rxOptionTable.rootElement = {
            get: function () { return $('rx-option-table')[0]; }
        };
        return Page.create(rxOptionTable);
    })(),

    /**
     * @function
     * @description
     * Generates a getter and a setter for an option table on your page, no matter if that
     * rxOptionTable contains radio buttons or checkboxes. They will both function identically.
     * This function is very much tied to the {@link rxOptionTable} page object. When using this,
     * consider exposing a raw rxOptionTable component on your page object as well. This
     * provides users the ability to not only quickly get and set options in the rxOptionTable,
     * but also get columns, query cells, and other useful functions exposed in the component.
     * @param {WebElement} elem - The WebElement for the rxOptionTable.
     * @returns {Object} A getter and a setter to be applied to an option form table in a page object.
     * @example
     * ```js
     * var yourPage = Page.create({
     *     paymentMethod: rxOptionTable.generateAccessor(element(by.model('paymentMethod.primary')));
     *
     *     // you should still expose the optionTable as well, for greater usability in integration tests
     *     paymentMethodTable: {
     *         get: function () {
     *             rxOptionTable.initialize(element(by.model('paymentMethod.primary')));
     *         }
     *     }
     * });
     *
     * it('should select the country', function () {
     *     // select the card in the third row by `cardNumber`
     *     yourPage.paymentMethod = [{cardNumber: '4111 1111 1111 1111'}]; // setter
     *     expect(yourPage.paymentMethod).to.eventually.equal([2]); // getter
     *     // include a raw option table object as well -- it will simplify more expressive tests
     *     expect(yourPage.paymentMethodTable.row(2).cell('Card Type')).to.eventually.equal('Visa');
     * });
     * ```
     */
    generateAccessor: function (elem) {
        return {
            get: function () {
                return exports.rxOptionTable.initialize(elem).selections;
            },
            set: function (selections) {
                var optionTable = exports.rxOptionTable.initialize(elem);
                optionTable.unselectAll();
                optionTable.selectMany(selections);
            }
        };
    }
};

/**
 * @deprecated
 * @exports encore.rxOptionFormTable
 * @description
 * **DEPRECATED**: Please use `encore.rxOptionTable` as a stand-in replacement.
 */
exports.rxOptionFormTable = {
    /**
     * @deprecated
     * @description
     * **DEPRECATED**: Please use `encore.rxOptionTable.initialize` as a stand-in replacement.
     */
    initialize: exports.rxOptionTable.initialize,
    /**
     * @deprecated
     * @description
     * **DEPRECATED**: Please use `encore.rxOptionTable.main` as a stand-in replacement.
     */
    main: exports.rxOptionTable.main,
    /**
     * @deprecated
     * @description
     * **DEPRECATED**: Please use `encore.rxOptionTable.generateAccessor` as a stand-in replacement.
     */
    generateAccessor: exports.rxOptionTable.generateAccessor
};
