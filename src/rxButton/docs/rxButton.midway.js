var demoPage = require('../../../utils/demo.page.js');
var rxButtonPage = require('../rxButton.page.js').rxButton;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxButton', function () {
    var ptor = protractor.getInstance(), rxButton;

    before(function () {
        demoPage.go('#/component/rxButton');
        rxButton = rxButtonPage.initialize(ptor.findElement(protractor.By.css('rx-button')));
    });

    it('should show element', function () {
        expect(rxButton.rootElement.isDisplayed()).to.eventually.be.true;
    });
});
