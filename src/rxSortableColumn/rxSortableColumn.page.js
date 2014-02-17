/*jshint node:true*/
var Page = require('astrolabe').Page;

exports.rxSortableColumn = Page.create({
    // Elements
    rootElement: {
        get: function () {
            return this.findElement(this.by.css('.rx-sortable-column'));
        }
    },
    sortAction: {
        get: function () {
            return this.findElement(this.by.css('.rx-sortable-column .sort-action'));
        }
    },
    sortIcon: {
        get: function () {
            return this.findElement(this.by.css('.rx-sortable-column .sort-icon'));
        }
    }
});