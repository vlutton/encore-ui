/*jshint node:true*/
var Page = require('astrolabe').Page;

var rxApp = {

    cssCollapseButtonSelector: {
        // Keep just the css string available for both the button element
        // and the check made in `isCollapsible()`, which uses findAllBy.
        get: function () { return '.collapsible-toggle'; }
    },

    lblNavTitle: {
        get: function () { return this.rootElement.$('.site-title'); }
    },

    lblNavSectionTitle: {
        get: function () { return this.rootElement.$('.nav-section-title'); }
    },

    eleSiteNav: {
        get: function () { return this.rootElement.$('.rx-app-nav'); }
    },

    btnCollapseToggle: {
        get: function () { return this.rootElement.$(this.cssCollapseButtonSelector); }
    },

    lnkLogout: {
        get: function () { return this.rootElement.$('.site-logout'); }
    },

    title: {
        get: function () { return this.lblNavTitle.getText(); }
    },

    sectionTitle: {
        get: function () { return this.lblNavSectionTitle.getText(); }
    },

    expand: {
        value: function () {
            var page = this;
            return this.isCollapsed().then(function (collapsed) {
                if (collapsed) {
                    page.btnCollapseToggle.click();
                }
            });
        }
    },

    collapse: {
        value: function () {
            var page = this;
            return this.isExpanded().then(function (expanded) {
                if (expanded) {
                    page.btnCollapseToggle.click();
                }
            });
        }
    },

    isCollapsed: {
        value: function () {
            var page = this;
            return this.isCollapsible().then(function (isCollapsible) {
                if (!isCollapsible) {
                    return page.title.then(function (siteTitle) {
                        page.NotCollapsibleException.thro(siteTitle);
                    });
                }

                return page.rootElement.$('.rx-app').getAttribute('class').then(function (classNames) {
                    return (classNames.indexOf('collapsed') >= 0);
                });
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
            return this.rootElement.$$(this.cssCollapseButtonSelector).then(function (exists) {
                return exists.length ? true : false;
            });
        }
    },

    NotCollapsibleException: {
        get: function () {
            return this.exception('Navigation menu not collapsible');
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

    lblTitle: {
        get: function () { return this.rootElement.$('.rx-page .page-title'); }
    },

    lblSubtitle: {
        get: function () { return this.rootElement.$('.rx-page .page-subtitle'); }
    },

    title: {
        get: function () { return this.lblTitle.getText(); }
    },

    subtitle: {
        get: function () { return this.lblSubtitle.getText(); }
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
