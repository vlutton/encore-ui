/*jshint node:true*/
var Page = require('astrolabe').Page;

var statusCell = function (rootElement) {
    return Page.create({
        inputStatus: {
            get: function () {
                return rootElement.getAttribute('status');
            }
        },

        finalStatus: {
            get: function () {
                return rootElement.getAttribute('class').then(function (classes) {
                    var index = classes.indexOf('status-');
                    // move past the `status-`
                    return classes.slice(index + 7).split(' ')[0];
                });
            }
        },

        tooltip: {
            get: function () {
                return rootElement.$('span').getAttribute('tooltip');
            }
        },

        api: {
            get: function () {
                return rootElement.getAttribute('api');
            }
        },

        icon: {
            get: function () {
                return rootElement.$('i').getAttribute('class').then(function (classes) {
                    var removeClasses = 'fa fa-lg';
                    var iconClasses = classes.slice(removeClasses.length).trim();
                    switch (iconClasses) {
                        case 'fa-ban': {
                                return 'ERROR';
                            }
                        case 'fa-exclamation-triangle': {
                                return 'WARNING';
                            }
                        case 'fa-info-circle': {
                                return 'INFO';
                            }
                        case 'fa-repeat fa-spin': {
                                return 'PENDING';
                            }
                        default: {
                                return '';
                            }
                    }
                });
            }
        }
    });
};

var rxStatusColumn = {

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    tblStatusCells: {
        get: function () {
            return this.rootElement.$$('td[rx-status-column]');
        }
    },

    statusCells: {
        value: function () {
            return this.tblStatusCells.reduce(function (acc, statusCellElement) {
                acc.push(statusCell(statusCellElement));
                return acc;
            }, []);
        }
    }

};

exports.rxStatusColumn = {

    initialize: function (rxStatusColumnElement) {
        rxStatusColumn.rootElement = {
            get: function () { return rxStatusColumnElement; }
        };
        return Page.create(rxStatusColumn);
    },

};
