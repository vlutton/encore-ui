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
            rxAccountInfo.badges.all.then(function (badges) {
                badgesArray = badges;
            });
        });

        it('should have four badges on the first Account Info box', function () {
            expect(rxAccountInfo.badge.count()).to.eventually.equal(4);
        });

        it('should have the correct first badge src via byIndex', function () {
            var src = 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png';
            expect(rxAccountInfo.badge.byIndex(0).src).to.eventually.equal(src);
        });

        it('should have the correct first badge src via badges.all', function () {
            var src = 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png';
            expect(badgesArray[0].src).to.eventually.equal(src);
        });

        it('should have the right name on the last badge', function () {
            expect(rxAccountInfo.badge.byIndex(-1).name).to.eventually.equal('Public Domain');
        });

        it('should have the right description on the last badge', function () {
            var description = 'Waives as many rights as legally possible, worldwide.';
            expect(rxAccountInfo.badge.byIndex(-1).description).to.eventually.equal(description);
        });

        describe('searching', function () {

            it('should search for just one badge by string for an exact match', function () {
                expect(rxAccountInfo.badge.byName('Attribution').name).to.eventually.equal('Attribution');
            });

            it('should report that a badge exists', function () {
                expect(rxAccountInfo.badge.exists('Non-Commercial')).to.eventually.be.true;
            });

            it('should report that a badge does not exist', function () {
                expect(rxAccountInfo.badge.exists('Caveat Emptor')).to.eventually.be.false;
            });

            it('should search for many badges with a regular expression', function () {
                rxAccountInfo.badges.matchingName(/\w\s\w/).then(function (twoWordBadges) {
                    expect(twoWordBadges[0].name).to.eventually.equal('Creative Commons');
                    expect(twoWordBadges[1].name).to.eventually.equal('Public Domain');
                });
            });

        });

    });

    describe('error messages', function () {

        it('should show an error notification when it cannot load badges', function () {
            var errorMessage = 'Error retrieving badges for this account';
            expect(notifications.byStack('badgeError').exists(errorMessage)).to.eventually.be.true;
        });

        it('should show an error notification when it cannot load account name', function () {
            var errorMessage = 'Error retrieving account name';
            expect(notifications.byStack('nameError').exists(errorMessage)).to.eventually.be.true;
        });
    });

});
