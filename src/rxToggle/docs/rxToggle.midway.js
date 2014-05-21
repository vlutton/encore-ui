var demoPage = require('../../../utils/demo.page.js');
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxToggle', function () {
    var rxToggle, rxToggleContent;

    before(function () {
        demoPage.go('#/component/rxToggle');
        rxToggle = $('#vacillator');
        rxToggleContent = $('#vacillated');
    });

    it('should toggle content on show', function () {
        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;

        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.true;

        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;
    });
});
