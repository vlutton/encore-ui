var demoPage = require('../../../utils/demo.page.js');
var rxSpinnerPage = require('../rxSpinner.page.js').rxSpinner;

// Add midway tests to run
describe('rxSpinner', function () {
    var ptor = rxSpinnerPage.driver;

    it('beforeAll', function () {
        demoPage.go();
    });

    // it.skip('should show element', function () {
    //     expect(rxSpinnerPage.rxSpinnerElement.isDisplayed()).toEqual(true);
    // });
});