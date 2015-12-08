describe('demo component', function () {

    before(function () {
        demoPage.go('#/components/rxSpinner');
    });

    it('default', function () {
        screenshot.snap(this, $('.tab-content div[rx-spinner]'), { threshold: 1 });
    });

    it('toggle loading off', function () {
        element(by.buttonText('Toggle Loading')).click();
        screenshot.snap(this, $('.tab-content div[rx-spinner]'), { threshold: 1 });
    });

});
