describe('demo component', function () {
    var previousThreshold;

    before(function () {
        demoPage.go('#/component/rxSpinner');
        previousThreshold = screenshot.threshold;
        screenshot.threshold = 1; // percent
    });

    it('default', function () {
        screenshot.snap(this, $('.tab-content div[rx-spinner]'));
    });

    it('toggle loading off', function () {
        element(by.buttonText('Toggle Loading')).click();
        screenshot.snap(this, $('.tab-content div[rx-spinner]'));
    });

    after(function () {
        screenshot.threshold = previousThreshold;
    });

});
