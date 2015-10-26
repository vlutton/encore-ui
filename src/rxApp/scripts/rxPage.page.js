var Page = require('astrolabe').Page;

var rxPage = {
    lblTitle: {
        get: function () { return this.rootElement.$('.page-title > span'); }
    },

    lblSubtitle: {
        get: function () { return this.rootElement.$('.page-subtitle'); }
    },

    lblTitleTag: {
        get: function () { return this.rootElement.$('.page-titles .status-tag'); }
    },

    title: {
        get: function () {
            var page = this;
            return this.lblTitle.isPresent().then(function (present) {
                return present ? page.lblTitle.getText() : null;
            });
        }
    },

    subtitle: {
        get: function () {
            var page = this;
            return this.lblSubtitle.isPresent().then(function (present) {
                return present ? page.lblSubtitle.getText() : null;
            });
        }
    },

    titleTag: {
        get: function () {
            var page = this;
            return this.lblTitleTag.isPresent().then(function (present) {
                return present ? page.lblTitleTag.getText() : null;
            });
        }
    }
};

exports.rxPage = {
    initialize: function (rxPageElement) {
        rxPage.rootElement = {
            get: function () { return rxPageElement; }
        };
        return Page.create(rxPage);
    },

    main: (function () {
        rxPage.rootElement = {
            get: function () { return $('html'); }
        };
        return Page.create(rxPage);
    })()
};
