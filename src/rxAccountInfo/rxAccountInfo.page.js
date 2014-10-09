/*jshint node:true*/
var Page = require('astrolabe').Page;

var badge = function (rootElement) {
    return Page.create({
        tooltip: {
            get: function () {
                return rootElement.getAttribute('tooltip');
            }
        },
        src: {
            get: function () {
                return rootElement.getAttribute('ng-src');
            }
        }
    });
};

var rxAccountInfo = {

    tblBadges: {
        get: function () {
            return this.rootElement.all(by.repeater('badge in badges'));
        }
    },

    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    name: {
        get: function () {
            return this.rootElement.element(by.binding('accountName')).getText();
        }
    },

    number: {
        get: function () {
            return this.rootElement.element(by.binding('accountNumber')).getText();
        }
    },

    badge: {
        value: function (index) {
            return badge(this.tblBadges.get(index));
        }
    },

    badges: {
        get: function () {
            return this.tblBadges.map(function (badgeElement) {
                return badge(badgeElement);
            });
        }
    },

    badgeCount: {
        value: function () {
            return this.tblBadges.count();
        }
    }

};

exports.rxAccountInfo = {

    initialize: function (rxAccountInfoElement) {
        rxAccountInfo.rootElement = {
            get: function () { return rxAccountInfoElement; }
        };
        return Page.create(rxAccountInfo);
    },

    main: (function () {
        rxAccountInfo.rootElement = {
            get: function () { return $('html'); }
        };
        return Page.create(rxAccountInfo);
    })()

};
