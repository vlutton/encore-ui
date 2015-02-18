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
                exports.rxForm.slowClick(optionElement);
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

    options: {
        get: function () {
            return this.rootElement.$$('option').map(function (optionElement) {
                return optionFromElement(optionElement).text;
            });
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

    /*
      Transform `currencyString` (USD) to an integer representing pennies. Built to reverse Angular's 'currency' filter.
      If your currency string includes fractions of a penny, that precision will be lost!
    */
    currencyToPennies: function (currencyString) {
        var resFloat = parseFloat(currencyString.split(' ')[0].replace(/[,$()]/g, '').trim());

        // Negative number
        if (currencyString.indexOf('(') > -1 && currencyString.indexOf(')') > -1) {
            resFloat = -resFloat;
        }

        return parseInt(resFloat * 100, 10);
    },

    slowClick: function (elem) {
        browser.actions().mouseDown(elem).mouseUp().perform();
    },

    dropdown: {
        /*
          `dropdownElement` should be the `<select>` tag
        */
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
        /*
          `checkboxElement` should be the `<input>` tag
        */
        initialize: function (checkboxElement) {
            return Page.create({
                rootElement: {
                    get: function () {
                        return checkboxElement;
                    }
                },

                isSelected: {
                    /*
                      Abstraction over `checkboxObject.rootElement.isSelected()` to keep things shorter.
                    */
                    value: function () {
                        return checkboxElement.isSelected();
                    }
                },

                select: {
                    value: function () {
                        return this.isSelected().then(function (selected) {
                            if (!selected) {
                                checkboxElement.click();
                            }
                        });
                    }
                },

                unselect: {
                    value: function () {
                        return this.isSelected().then(function (selected) {
                            if (selected) {
                                checkboxElement.click();
                            }
                        });
                    }
                }
            });
        }
    },

    radioButton: {
        initialize: function (radioElement) {
            return Page.create({
                rootElement: {
                    get: function () {
                        return radioElement;
                    }
                },

                isSelected: {
                    /*
                      Abstraction over `radioObject.rootElement.isSelected()` to keep things shorter.
                    */
                    value: function () {
                        return radioElement.isSelected();
                    }
                },

                select: {
                    value: function () {
                        radioElement.click();
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

/*
  Shared function in both one row's `isSelected`, and `selections` getter.
*/
var optionIsSelected = function (optionRowElement) {
    return optionRowElement.getAttribute('class').then(function (classNames) {
        return classNames.indexOf('selected') > -1;
    });
};
var optionFormRowFromElement = function (optionRowElement) {
    return Page.create({

        isSelected: {
            value: function () {
                return optionIsSelected(optionRowElement);
            }
        },

        isCurrent: {
            value: function () {
                return optionRowElement.getAttribute('class').then(function (classNames) {
                    return classNames.indexOf('current') > -1;
                });
            }
        },

        cell: {
            /*
              Return the value of the cell by `columnName`, using `getText` by default.
              For more control, pass in a `customFn`.

              The reason `columnName` is used, as opposed to by binding, is due to some
              complexity contained within the `getContent` function in the rxOptionFormTable directive.
              https://github.com/rackerlabs/encore-ui/blob/c2ef1f2780643d3b7819667a53b68e2ae7ccdf45/src/rxForm/rxForm.js#L227-L248
              There are columns that may contain static data (or expressions to be evaluated against $scope)
              for every row, and those data items are never bound to $scope. Although the column.keys that are
              passed into $scope.getContent that contain angular expressions can be located by binding, there are
              cases when plain text or HTML gets passed in. These never get bound to $scope. They can, however,
              be located by querying the column name via CSS selector, so that's used instead.
             */
            value: function (columnName, customFn) {
                if (customFn === undefined) {
                    customFn = function (cellElement) {
                        return cellElement.getText();
                    };
                }

                var css = 'label[for^="' + columnName + '"]';
                return customFn(optionRowElement.$(css));
            }
        },

        selectInput: {
            /*
              Since checkboxes are a superset of radio input elements, a checkbox is used.
            */
            get: function () {
                var inputElement = optionRowElement.$('.option-table-input input');
                return exports.rxForm.checkbox.initialize(inputElement);
            }
        },

        select: {
            value: function () {
                this.selectInput.select();
            }
        },

        unselect: {
            value: function () {
                this.selectInput.unselect();
            }
        }

    });
};

var cssForCellInColumn = function (columnName) {
    return 'tr td > label[for^="' + columnName + '"]';
};

/*
  Extract the row number that a certain cell was found in.
  This is tightly coupled to the implementation of the directive's data population scheme!
  See the rxFormOptionTable's html template, in the column repeater's `label[for]` html.
  If that ever changes, the functionality in this page object may become tedious to support later.
*/
var rowNumberFromCell = function (cellElement) {
    return cellElement.getAttribute('for').then(function (coordinates) {
        // 'optionTable_0' -> ['optionTable', '0'] -> 0
        return parseInt(_.last(coordinates.split('_')), 10);
    });
};

var rxOptionFormTable = {

    tblRows: {
        get: function () {
            return this.rootElement.all(by.repeater('row in data'));
        }
    },

    tblColumns: {
        get: function () {
            return this.rootElement.$('thead').all(by.repeater('column in columns'));
        }
    },

    lblEmptyWarningMessage: {
        get: function () {
            return this.rootElement.$('.empty-data');
        }
    },

    isEmpty: {
        value: function () {
            return this.lblEmptyWarningMessage.isPresent();
        }
    },

    emptyMessage: {
        get: function () {
            var page = this;
            return this.isEmpty().then(function (empty) {
                return empty ? page.lblEmptyWarningMessage.getText() : null;
            });
        }
    },

    row: {
        value: function (rowIndex) {
            return optionFormRowFromElement(this.tblRows.get(rowIndex));
        }
    },

    selectedRow: {
        /*
          Will default to the first selected row if many are selected.
          Be certain you have a selected row before calling this, or a
          NoSuchElementError will be thrown.
        */
        get: function () {
            return optionFormRowFromElement(this.rootElement.$('.selected'));
        }
    },

    columnNames: {
        get: function () {
            return this.tblColumns.map(function (columnElement) {
                return columnElement.getText();
            });
        }
    },

    columnData: {
        /*
          Return the value of the cells found under `columnName`, using `getText` by default.
          For more control, pass in a `customFn`.
        */
        value: function (columnName, customFn) {
            if (customFn === undefined) {
                customFn = function (cellElements) {
                    return cellElements.map(function (cellElement) {
                        return cellElement.getText();
                    });
                };
            }

            var css = cssForCellInColumn(columnName);
            return customFn(this.rootElement.$$(css));
        }
    },

    unselectAll: {
        value: function () {
            this.tblRows.map(function (rowElement) {
                optionFormRowFromElement(rowElement).unselect();
            });
        }
    },

    unselectByColumnText: {
        /*
          Unselect a row by the `columnName` that contains `columnText`.
          This function uses cssContainingText, be certain your column name and text is unique.
        */
        value: function (columnName, columnText) {
            var page = this;
            var css = cssForCellInColumn(columnName);
            var cellElement = this.rootElement.element(by.cssContainingText(css, columnText));
            return rowNumberFromCell(cellElement).then(function (rowNumber) {
                optionFormRowFromElement(page.tblRows.get(rowNumber)).unselect();
            });
        }
    },

    unselectMany: {
        /*
          Unselect options where each `{ columnName: columnText }` in `selections` is passed to `unselectByColumnText`.

          unselectMany([{ 'Name': 'Item 1' },
                        { 'Name': 'Item 2' }]);
        */
        value: function (selections) {
            var page = this;
            _.forEach(selections, function (selection) {
                page.unselectByColumnText(_.first(_.keys(selection)), _.first(_.values(selection)));
            });
        }
    },

    selectByColumnText: {
        /*
          Select a row by the `columnName` that contains `columnText`.
          This function uses cssContainingText, be certain your column name and text is unique.
        */
        value: function (columnName, columnText) {
            var page = this;
            var css = cssForCellInColumn(columnName);
            var cellElement = this.rootElement.element(by.cssContainingText(css, columnText));
            return rowNumberFromCell(cellElement).then(function (rowNumber) {
                optionFormRowFromElement(page.tblRows.get(rowNumber)).select();
            });
        }
    },

    selectMany: {
        /*
          Select options where each `{ columnName: columnText }` in `selections` is passed to `selectByColumnText`.

          selectMany([{ 'Name': 'Item 1' },
                      { 'Name': 'Item 2' }]);
        */
        value: function (selections) {
            var page = this;
            _.forEach(selections, function (selection) {
                page.selectByColumnText(_.first(_.keys(selection)), _.first(_.values(selection)));
            });
        }
    },

    selections: {
        /*
          Return a list of row indexes that are currently selected.
          Get the row yourself if you need more information about the row's contents.
        */
        get: function () {
            return this.tblRows.map(function (rowElement, index) {
                return optionIsSelected(rowElement).then(function (selected) {
                    if (selected) {
                        return index;
                    }
                });
            }).then(function (indexes) {
                // `.map` will return `undefined` for non-selected rows. Drop those results.
                return _.reject(indexes, _.isUndefined);
            });
        }
    }

};

exports.rxOptionFormTable = {

    initialize: function (rxOptionFormTableElement) {
        rxOptionFormTable.rootElement = {
            get: function () {
                return rxOptionFormTableElement;
            }
        };
        return Page.create(rxOptionFormTable);
    },

    main: (function () {
        rxOptionFormTable.rootElement = {
            get: function () {
                return $('rx-form-option-table');
            }
        };
        return Page.create(rxOptionFormTable);
    })(),

};
