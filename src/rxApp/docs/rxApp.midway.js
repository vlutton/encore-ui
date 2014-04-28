var demoPage = require('../../../utils/demo.page.js');
var rxAppPage = require('../rxApp.page.js').rxApp;
var rxPagePage = require('../rxApp.page.js').rxPage;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxApp', function () {
    var rxApp;

    before(function () {
        demoPage.go();
        rxApp = rxAppPage.initialize($('#custom-rxApp'));
    });

    it('should show element', function () {
        expect(rxApp.rootElement.isDisplayed()).to.eventually.be.true;
    });

    it('should have a title', function () {
        expect(rxApp.title).to.eventually.equal('My App');
    });

    it('should have a section title', function () {
        expect(rxApp.sectionTitle).to.eventually.equal('Example Menu');
    });

    it('should have a logout link', function () {
        expect(rxApp.lnkLogout.isDisplayed()).to.eventually.be.true;
    });

    it('should not support a toggle show/hide button', function () {
        expect(rxApp.isCollapsible()).to.eventually.be.false;
    });

    it('should throw an error if you attempt to expand and unsupported', function () {
        expect(rxApp.expand()).to.be.rejectedWith('My App');
    });

    describe('with collapsible navigation', function () {
        before(function () {
            rxApp = rxAppPage.initialize($('#collapsible-rxApp'));
        });

        it('should have a title', function () {
            expect(rxApp.title).to.eventually.equal('Encore');
        });

        it('should have a section title', function () {
            expect(rxApp.sectionTitle).to.eventually.equal('All Tools');
        });

        it('should have a logout link', function () {
            expect(rxApp.lnkLogout.isDisplayed()).to.eventually.be.true;
        });

        it('should have a collapsible navigation menu', function () {
            expect(rxApp.isCollapsible()).to.eventually.be.true;
        });

        it('should be expanded by default', function () {
            expect(rxApp.isExpanded()).to.eventually.be.true;
        });

        it('should collapse the navigation', function () {
            rxApp.collapse();
            expect(rxApp.isCollapsed()).to.eventually.be.true;
        });

        it('should expand the navigation', function () {
            rxApp.expand();
            expect(rxApp.isExpanded()).to.eventually.be.true;
        });
    });
});

describe('rxPage', function () {
    var rxPage;

    before(function () {
        demoPage.go();
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
