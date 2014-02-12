var demoPage = require('../../../utils/demo.page.js');
var rxAppPage = require('../rxApp.page.js').rxApp;
var rxPagePage = require('../rxApp.page.js').rxPage;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxApp', function () {
    var ptor = protractor.getInstance();
    var rxApp;

    before(function () {
        demoPage.go();
        rxApp = rxAppPage.initialize(ptor.findElement(protractor.By.css('#custom-rxApp')));
    });

    it('should show element', function () {
        expect(rxApp.rootElement.isDisplayed()).to.eventually.eq.true;
    });
});

describe('rxPage', function () {
    var ptor = protractor.getInstance();
    var rxPage;

    before(function () {
        demoPage.go();
        rxPage = rxPagePage.initialize(ptor.findElement(protractor.By.css('#custom-rxApp .rx-page')));
    });

    it('should show element', function () {
        expect(rxPage.rootElement.isDisplayed()).to.eventually.eq.true;
    });

    it('should update page subtitle dynamically', function () {
        expect(rxPage.pageSubtitle.getText()).to.eventually.eq('With a subtitle');

        demoPage.rxPageSubtitleButton.click();

        expect(rxPage.pageSubtitle.getText()).to.eventually.contain('With a new subtitle at 1');
    });
});
