describe('demo component', function () {
    // https://github.com/rackerlabs/snappit-mocha-protractor/issues/24
    var previousThreshold;

    before(function () {
        demoPage.go('#/component/rxBreadcrumbs');
        previousThreshold = screenshot.threshold;
        screenshot.threshold = 1; // percent
    });

    it('default', function () {
        screenshot.snap(this, $('.tab-content rx-breadcrumbs ol'));
    });

    after(function () {
        screenshot.threshold = previousThreshold;
    });

});
