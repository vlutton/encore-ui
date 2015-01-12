var rxSpinnerPage = require('../rxSpinner.page.js').rxSpinner;

describe('rxSpinner', function () {

    before(function () {
        demoPage.go('#/component/rxSpinner');
    });

    it.skip('should show element', function () {
        expect(rxSpinnerPage.rxSpinnerElement.isDisplayed()).toEqual(true);
    });

});
