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

/*
  This is actually a page object for a single status column cell. The name is misleading only in that it's
  more important to follow the naming convention of the directive rather than being completely correct here.
*/
var rxStatusColumn = {

    byType: {
        /*
          Represents the custom defined status type.
          This has no relation to the tooltip text, the icon chosen, or the color used to represent it.
        */
        get: function () {
            return this.rootElement.getAttribute('status');
        }
    },

    byIcon: {
        /*
          Represents the status as summarized by the icon selection alone. Extracted from the font-awesome icon used.
        */
        get: function () {
            return this.rootElement.$('i').getAttribute('class').then(classNameToStatus);
        }
    },

    byColor: {
        /*
          Represents the status as summarized by the color selection alone. Extracted from the class name.
        */
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

    tooltip: {
        get: function () {
            var cellElement = this.rootElement;
            return Page.create({
                rootElement: {
                    get: function () {
                        return cellElement.$('.tooltip-inner');
                    }
                },

                exists: {
                    /*
                      Hovers over the current row's status column and returns whether or not a tooltip appears.
                    */
                    get: function () {
                        browser.actions().mouseMove(cellElement.$('i')).perform();
                        return this.rootElement.isPresent();
                    }
                },

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

exports.rxStatusColumn = {

    initialize: function (rxStatusCellElement) {
        rxStatusColumn.rootElement = {
            get: function () { return rxStatusCellElement; }
        };
        return Page.create(rxStatusColumn);
    },

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

    icons: {
        error: 'ERROR',
        info: 'INFO',
        warning: 'WARNING'
    },

    colors: {
        active: 'ACTIVE',
        error: 'ERROR',
        info: 'INFO',
        pending: 'PENDING',
        warning: 'WARNING'
    }

};
