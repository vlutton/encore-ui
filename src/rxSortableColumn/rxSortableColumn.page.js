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
        value: function () {
            return this.rootElement.$('.sort-action .ng-scope').getText();
        }
    },

    sort: {
        // Will default to an ascending sort if no parameters are passed in.
        value: function (isAscending) {
            if (isAscending === undefined) {
                isAscending = true;
            }

            var page = this;
            return this.getCurrentSortDirection().then(function (sortDirection) {
                /*jshint eqeqeq: false*/
                // Coercing -1 to Boolean results in -1 === true. We don't want that.
                // It's easier to leave as is since -1 != true and -1 != false.
                // Meaning we'll always sort the list at least once if it's currently unsorted.
                if (sortDirection != isAscending) {
                    page.btnSort.click();
                    page.sort(isAscending);
                }
            });
        }
    },

    getCurrentSortDirection: {
        // Ascending sort:  (1)  means the arrow is pointed down. [0-9, a-z]
        // Descending sort: (0)  means the arrow is pointed up.   [z-a, 9-0]
        // Not sorted:     (-1)  means there is no arrow for this column.
        value: function () {
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
    }

};

exports.rxSortableColumn = {

    initialize: function (rxSortableColumnElement) {
        rxSortableColumn.rootElement = {
            get: function () { return rxSortableColumnElement; }
        };
        return Page.create(rxSortableColumn);
    }

};
