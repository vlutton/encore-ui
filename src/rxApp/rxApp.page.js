/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxApp = {
    siteTitle: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-app .site-title')); }
    },

    siteNav: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-app-nav')); }
    },

    collapseToggleButton: {
        get: function () { return this.rootElement.findElement(this.by.css('.collapsible-toggle')); }
    },

    toggleCollapse: {
        value: function () {
            if (!this.isCollapsible()) {
                this.NotCollapsibleException.thro();
            }

            this.collapseToggleButton.click();
        }
    },

    expand: {
        value: function () {
            var page = this;
            return this.isCollapsed().then(function (collapsed) {
                if (collapsed) {
                    page.toggleCollapse();
                }
            });
        }
    },

    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.toggleCollapse();
                }
            });
        }
    },

    isCollapsed: {
        value: function () {
            if (!this.isCollapsible()) {
                this.NotCollapsibleException.thro();
            }

            return this.rootElement.$('.rx-app').getAttribute('class').then(function (classNames) {
                return (classNames.indexOf('collapsed') >= 0);
            });
        }
    },

    isExpanded: {
        value: function () {
            return this.isCollapsed().then(function (result) {
                return !result;
            });
        }
    },

    isCollapsible: {
        value: function () {
            try {
                this.collapseToggleButton.isDisplayed();
            } catch (err) {
                return false;
            }

            return true;
        }
    },

    NotCollapsibleException: {
        get: function () {
            return this.exception('The navigation menu is not collapsible');
        }
    }
};

exports.rxApp = {
    initialize: function (rxAppElement) {
        rxApp.rootElement = {
            get: function () { return rxAppElement; }
        };
        return Page.create(rxApp);
    },

    help: function () { return Object.keys(rxApp); }

};

var rxPage = {
    pageTitle: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-page .page-title')); }
    },

    pageSubtitle: {
        get: function () { return this.rootElement.findElement(this.by.css('.rx-page .page-subtitle')); }
    }
};

exports.rxPage = {
    initialize: function (rxPageElement) {
        rxPage.rootElement = {
            get: function () { return rxPageElement; }
        };
        return Page.create(rxPage);
    },

    help: function () { return Object.keys(rxPage); }

};
