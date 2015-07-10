var rxSpinnerPage = encore.rxSpinner;

describe('rxSpinner', function () {

    before(function () {
        demoPage.go('#/components/rxSpinner');
    });

    it.skip('should show element', function () {
        expect(rxSpinnerPage.rxSpinnerElement.isDisplayed()).toEqual(true);
    });

});
