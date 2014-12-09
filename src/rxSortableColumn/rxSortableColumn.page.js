/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxSortableColumn = {

    btnSort: {
        get: function () {
            return this.rootElement.$('.sort-action');
        }
    },

    imgSortIcon: {
        get: function () {
            return this.rootElement.$('.sort-icon');
        }
    },

    name: {
        get: function () {
            return this.rootElement.$('.sort-action .ng-scope').getText();
        }
    },

    sort: {
        // Will default to an ascending sort if no parameters are passed in.
        value: function (namedParams) {
            if (namedParams === undefined) {
                namedParams = { isAscending: true };
            }

            var page = this;
            return this.currentSortDirection.then(function (sortDirection) {
                /*jshint eqeqeq: false*/
                // Coercing -1 to Boolean results in -1 === true. We don't want that.
                // It's easier to leave as is since -1 != true and -1 != false.
                // Meaning we'll always sort the list at least once if it's currently unsorted.
                if (sortDirection != namedParams.isAscending) {
                    page.btnSort.click();
                    page.sort(namedParams);
                }
            });
        }
    },

    sortProperty: {
        get: function () {
            return this.rootElement.getAttribute('sort-property');
        }
    },

    data: {
        get: function () {
            var defaultFn = function (cellElements) {
                return cellElements.map(function (cellElement) {
                    return cellElement.getText();
                });
            };

            return this.getDataUsing(defaultFn);
        }
    },

    getDataUsing: {
        // Return a list of all cell contents in this column.
        // Passes all cell elements to `customFn`.
        value: function (customFn) {
            if (customFn === undefined) {
                return this.data;
            }

            var page = this;
            return this.sortProperty.then(function (sortProperty) {
                if (page.repeaterString === undefined) {
                    page.CellUndiscoverableError('data');
                }

                return customFn(element.all(by.repeater(page.repeaterString).column(sortProperty)));
            });
        }
    },

    currentSortDirection: {
        // Ascending sort:  (1)  means the arrow is pointed down. [0-9, a-z]
        // Descending sort: (0)  means the arrow is pointed up.   [z-a, 9-0]
        // Not sorted:     (-1)  means there is no arrow for this column.
        get: function () {
            var page = this;
            return this.imgSortIcon.getAttribute('style').then(function (style) {
                if (style.indexOf('hidden') > -1) {
                    // Sort arrow hidden; not sorted.
                    return -1;
                } else {
                    return page.imgSortIcon.getAttribute('class').then(function (className) {
                        return className.indexOf('asc') > -1 ? 1 : 0;
                    });
                }
            });
        }
    },

    CellUndiscoverableError: {
        get: function () { return this.exception('repeaterString required at initialization to use'); }
    }

};

exports.rxSortableColumn = {

    initialize: function (rxSortableColumnElement, repeaterString) {
        rxSortableColumn.rootElement = {
            get: function () { return rxSortableColumnElement; }
        };

        rxSortableColumn.repeaterString = {
            get: function () { return repeaterString; }
        };

        return Page.create(rxSortableColumn);
    }

};
