/*jshint node:true*/
var Page = require('astrolabe').Page;

var breadcrumb = function (rootElement) {
    return Page.create({

        name: {
            get: function () {
                return rootElement.getText();
            }
        },

        href: {
            get: function () {
                return this.isLink().then(function (isLink) {
                    if (isLink) {
                        return rootElement.$('a').getAttribute('href');
                    } else {
                        var deferred = protractor.promise.defer();
                        deferred.fulfill(null);
                        return deferred.promise;
                    }
                });
            }
        },

        visit: {
            value: function () {
                return rootElement.click();
            }
        },

        hover: {
            value: function () {
                return browser.actions().mouseMove(rootElement).perform();
            }
        },

        isFirst: {
            value: function () {
                return rootElement.element(by.className('first')).isPresent();
            }
        },

        isLast: {
            value: function () {
                return rootElement.element(by.className('last')).isPresent();
            }
        },

        isLink: {
            value: function () {
                return rootElement.$('a').isPresent();
            }
        },

        isHovered: {
            value: function () {
                return this.isLink().then(function (isLink) {
                    if (isLink) {
                        return rootElement.$('a').getCssValue('background-color').then(function (color) {
                            return color === 'rgba(255, 255, 255, 1)';
                        });
                    } else {
                        return false;
                    }
                });
            }
        },

    });
};

var rxBreadcrumbs = {

    tblBreadcrumbs: {
        get: function () {
            return this.rootElement.all(by.repeater('breadcrumb in breadcrumbs.getAll()'));
        }
    },

    toArray: {
        value: function () {
            return this.tblBreadcrumbs.map(function (breadcrumbElement, index) {
                return breadcrumb(breadcrumbElement, index);
            });
        }
    },

    byName: {
        // Return a single breadcrumb entry, located by the text of the element, case sensitive.
        // If multiple entries exist with the same name, the first will be returned.
        value: function (breadcrumbName) {
            return this.tblBreadcrumbs.filter(function (breadcrumbElement) {
                return breadcrumbElement.getText().then(function (name) {
                    return name === breadcrumbName;
                });
            }).then(function (matchingBreadcrumbs) {
                return breadcrumb(matchingBreadcrumbs[0]);
            });
        }
    },

    byPosition: {
        value: function (position) {
            return breadcrumb(this.tblBreadcrumbs.get(position));
        }
    }

};

exports.rxBreadcrumbs = {
    initialize: function (rootElement) {
        rxBreadcrumbs.rootElement = {
            get: function () { return rootElement; }
        };
        return Page.create(rxBreadcrumbs);
    }
};
