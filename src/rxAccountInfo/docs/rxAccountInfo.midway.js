var rxAccountInfoPage = require('../rxAccountInfo.page.js').rxAccountInfo;
var notifications = require('../../rxNotify/rxNotify.page.js').rxNotify;
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('rxAccountInfo', function () {
    var rxAccountInfo;

    before(function () {
        demoPage.go('#/component/rxAccountInfo');
        rxAccountInfo = rxAccountInfoPage.initialize($('.demo-working-account rx-account-info'));
    });

    it('should show element', function () {
        expect(rxAccountInfo.isDisplayed()).to.eventually.be.true;
    });

    it('should show the account name', function () {
        expect(rxAccountInfo.name).to.eventually.equal('Mosso');
    });
    
    it('should show the account number', function () {
        expect(rxAccountInfo.number).to.eventually.equal('12345');
    });

    describe('badges', function () {
        var badgesArray;
        before(function () {
            rxAccountInfo.badges.then(function (badges) {
                badgesArray = badges;
            });
        });

        it('should have four badges on the first Account Info box', function () {
            expect(rxAccountInfo.badgeCount()).to.eventually.equal(4);
        });

        it('should have the correct first badge src via .badge(index)', function () {
            expect(rxAccountInfo.badge(0).src).to
                .eventually.equal('http://mirrors.creativecommons.org/presskit/icons/cc.large.png');
        });
        
        it('should have the correct first badge src via .badges', function () {
            expect(badgesArray[0].src).to
                .eventually.equal('http://mirrors.creativecommons.org/presskit/icons/cc.large.png');
        });

        it('should have the right tooltip on the last badge', function () {
            var tooltip = rxAccountInfo.badge(-1).tooltip;
            expect(tooltip).to.eventually.equal('ZERO');
        });
        
    });

    describe('error messages', function () {
        var badgeError, nameError;

        before(function () {
            notifications.byStack('badgeError').byType('error').then(function (errorMessages) {
                badgeError = errorMessages[0];
            });

            notifications.byStack('nameError').byType('error').then(function (errorMessages) {
                nameError = errorMessages[0];
            });
        });

        it('should show an error notification when it cannot load badges', function () {
            expect(badgeError.text).to.eventually.equal('Error retrieving badges for this account');
        });
        
        it('should show an error notification when it cannot load account name', function () {
            expect(nameError.text).to.eventually.equal('Error retrieving account name');
        });
    });

});
