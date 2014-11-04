/*jshint node:true*/
var Page = require('astrolabe').Page;

var badge = function (rootElement) {
    return Page.create({

        src: {
            get: function () {
                return rootElement.getAttribute('ng-src');
            }
        },

        name: {
            get: function () {
                return rootElement.getAttribute('data-name');
            }
        },

        description: {
            get: function () {
                return rootElement.getAttribute('data-description');
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
        get: function () {
            var page = this;
            return Page.create({
                byIndex: {
                    value: function (index) {
                        return badge(page.tblBadges.get(index));
                    }
                },

                exists: {
                    value: function (badgeName) {
                        return page.rootElement.$('img[data-name="' + badgeName + '"]').isPresent();
                    }
                },

                byName: {
                    // Accepts strings for a fast, exact match only.
                    // For a more flexible match, see `badges.matchingName`, which uses regular expressions.
                    value: function (badgeName) {
                        return badge(page.rootElement.$('img[data-name="' + badgeName + '"]'));
                    }
                },

                count: {
                    value: function () {
                        return page.tblBadges.count();
                    }
                }

            });
        }
    },

    badges: {
        get: function () {
            var page = this;
            return Page.create({
                all: {
                    get: function () {
                        return page.tblBadges.map(function (badgeElement) {
                            return badge(badgeElement);
                        });
                    }
                },

                matchingName: {
                    value: function (badgeRegExp) {
                        return page.tblBadges.filter(function (badgeElement) {
                            return badgeElement.getAttribute('data-name').then(function (name) {
                                return badgeRegExp.test(name) === true;
                            });
                        }).then(function (matchingElements) {
                            return matchingElements.map(function (matchingElement) {
                                return badge(matchingElement);
                            });
                        });
                    }
                }
            });
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
