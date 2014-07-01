var demoPage = require('../../../utils/demo.page.js');
var rxAppPage = require('../rxApp.page.js').rxApp;
var rxPagePage = require('../rxApp.page.js').rxPage;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxApp', function () {
    var rxAppCustom, rxAppStandard;

    before(function () {
        demoPage.go('#/component/rxApp');
        rxAppCustom = rxAppPage.initialize($('#custom-rxApp'));
        rxAppStandard = rxAppPage.initialize($('#standard-rxApp'));
    });

    it('should show element', function () {
        expect(rxAppCustom.rootElement.isDisplayed()).to.eventually.be.true;
    });

    it('should have a title', function () {
        expect(rxAppCustom.title).to.eventually.equal('My App');
    });

    it('should have a section title', function () {
        expect(rxAppCustom.sectionTitle).to.eventually.equal('Example Menu');
    });

    it('should have a logout link', function () {
        expect(rxAppCustom.lnkLogout.isDisplayed()).to.eventually.be.true;
    });

    it('should logout', function () {
        rxAppCustom.logout();
        expect(demoPage.currentUrl).to.eventually.contain('login');
        demoPage.go('#/component/rxApp');
    });

    describe('with collapsible navigation', function () {
        it('should have a collapsible navigation menu', function () {
            expect(rxAppCustom.isCollapsible()).to.eventually.be.true;
        });

        it('should be expanded by default', function () {
            expect(rxAppCustom.isExpanded()).to.eventually.be.true;
        });

        it('should collapse the navigation', function () {
            rxAppCustom.collapse();
            expect(rxAppCustom.isCollapsed()).to.eventually.be.true;
        });

        it.skip('should expand the navigation', function () {
            rxAppCustom.expand();
            expect(rxAppCustom.isExpanded()).to.eventually.be.true;
        });
    });

    describe('without collapsible navigation', function () {
        it('should not support a toggle show/hide button', function () {
            expect(rxAppStandard.isCollapsible()).to.eventually.be.false;
        });

        it('should throw an error if you attempt to expand and unsupported', function () {
            expect(rxAppStandard.expand()).to.be.rejectedWith('Encore');
        });
    });
});

describe('rxPage', function () {
    var rxPage;

    before(function () {
        demoPage.go('#/component/rxApp');
        rxPage = rxPagePage.initialize($('#custom-rxApp .rx-page'));
    });

    it('should show element', function () {
        expect(rxPage.rootElement.isDisplayed()).to.eventually.eq.true;
    });

    it('should update page subtitle dynamically', function () {
        expect(rxPage.subtitle).to.eventually.equal('With a subtitle');
        demoPage.rxPageSubtitleButton.click();
        expect(rxPage.subtitle).to.eventually.contain('With a new subtitle at 1');
    });
});
