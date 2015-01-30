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
            return this.rootElement.$$('.account-info-badge img');
        }
    },

    lblStatus: {
        get: function () {
            return this.rootElement.$('.account-status');
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

    status: {
        get: function () {
            return this.lblStatus.getText().then(function (text) {
                return text.toLowerCase();
            });
        }
    },

    statusType: {
        get: function () {
            return this.lblStatus.getAttribute('class').then(function (classNames) {
                var className = classNames.match(/msg-(\w+)/);
                return className === null ? 'active' : className[1];
            });
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
                    /**
                      Accepts strings for a fast, exact match only.
                      For a more flexible match, see `badges.matchingName`, which uses regular expressions.
                    */
                    value: function (badgeName) {
                        return badge(page.rootElement.$('img[data-name="' + badgeName + '"]'));
                    }
                },

                names: {
                    get: function () {
                        return page.tblBadges.map(function (badgeElement) {
                            return badge(badgeElement).name;
                        });
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
    })(),

    statuses: {
        approvalDenied: 'approval denied',
        aupViolation: 'aup violation',
        delinquent: 'delinquent',
        pendingApproval: 'pending approval',
        pendingMigration: 'pending migration',
        suspended: 'suspended',
        terminated: 'terminated',
        testStatus: 'teststatus',
        unverified: 'unverified'
    },

    statusTypes: {
        active: 'active',
        info: 'info',
        warning: 'warn'
    }

};
