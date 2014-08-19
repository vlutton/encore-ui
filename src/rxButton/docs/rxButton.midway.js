var demoPage = require('../../../utils/demo.page.js');
var rxButtonPage = require('../rxButton.page.js').rxButton;

// Add midway tests to run
describe('rxButton', function () {
    var rxButton;

    before(function () {
        demoPage.go('#/component/rxButton');
        rxButton = rxButtonPage.initialize($('rx-button'));
    });

    it('should show element', function () {
        expect(rxButton.rootElement.isDisplayed()).to.eventually.be.true;
    });
});
