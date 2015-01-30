/*jshint node:true*/
var Page = require('astrolabe').Page;

var classNameToStatus = function (iconClassName) {
    iconClassName = iconClassName.replace(/fa fa-lg/, '').trim();
    return {
        'fa-ban': 'ERROR',
        'fa-exclamation-triangle': 'WARNING',
        'fa-info-circle': 'INFO'
    }[iconClassName] || null;
};

/**
   @namespace
*/
var rxStatusColumn = {

    /**
       Represents the custom defined status type.
       This has no relation to the tooltip text, the icon chosen, or the color used to represent it.
       @returns {String} Status cell's custom defined status type.
    */
    byType: {
        get: function () {
            return this.rootElement.getAttribute('status');
        }
    },

    /**
       Represents the status as summarized by the icon selection alone. Extracted from the font-awesome icon used.
       @returns {String} Status cell's font-awesome icon name.
    */
    byIcon: {
        get: function () {
            return this.rootElement.$('i').getAttribute('class').then(classNameToStatus);
        }
    },

    /**
       Represents the status as summarized by the color selection alone. Extracted from the class name.
       @returns {String} Status cell's color class name.
    */
    byColor: {
        get: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return classes.match(/status-(\w+)/)[1];
            });
        }
    },

    api: {
        get: function () {
            return this.rootElement.getAttribute('api').then(function (api) {
                return api ? api : null;
            });
        }
    },

    /**
       Will appear on hover.
       @namespace rxStatusColumn.tooltip
     */
    tooltip: {
        get: function () {
            var cellElement = this.rootElement;
            return Page.create({
                rootElement: {
                    get: function () {
                        return cellElement.$('.tooltip-inner');
                    }
                },

                /**
                   Hovers over the current row's status column and returns whether or not a tooltip appears.
                   @memberof rxStatusColumn.tooltip
                   @returns {Boolean} Whether or not a tooltip is present.
                */
                exists: {
                    get: function () {
                        browser.actions().mouseMove(cellElement.$('i')).perform();
                        return this.rootElement.isPresent();
                    }
                },

                /**
                   @memberof rxStatusColumn.tooltip
                   @returns {String} Tooltip text.
                */
                text: {
                    get: function () {
                        var tooltip = this;
                        return this.exists.then(function (exists) {
                            return exists ? tooltip.rootElement.getText() : null;
                        });
                    }
                }

            });
        }
    }

};

/**
   @exports encore.rxStatusColumn
 */
exports.rxStatusColumn = {

    /**
       @function
       @param {WebElement} rxStatusCellElement - Status cell element from a table row.
       @returns {Page} Page object representing an {@link rxStatusColumn}.
     */
    initialize: function (rxStatusCellElement) {
        rxStatusColumn.rootElement = {
            get: function () { return rxStatusCellElement; }
        };
        return Page.create(rxStatusColumn);
    },

    /**
       @constant
       @returns {Object} Lookup of status strings from human-readable statuses.
     */
    statuses: {
        active: 'ACTIVE',
        deleted: 'DELETED',
        deleting: 'DELETING',
        error: 'ERROR',
        migrating: 'MIGRATING',
        rebuild: 'REBUILD',
        rescue: 'RESCUE',
        resize: 'RESIZE',
        suspended: 'SUSPENDED',
        unknown: 'UNKNOWN'
    },

    /**
       @constant
       @returns {Object} Lookup of icon class names from a human-readable version.
     */
    icons: {
        error: 'ERROR',
        info: 'INFO',
        warning: 'WARNING'
    },

    /**
       @constant
       @returns {Object} Lookup of color class names from a human-readable class name.
     */
    colors: {
        active: 'ACTIVE',
        error: 'ERROR',
        info: 'INFO',
        pending: 'PENDING',
        warning: 'WARNING'
    }

};
