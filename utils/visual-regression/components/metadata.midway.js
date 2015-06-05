describe('demo component', function () {
    // https://github.com/rackerlabs/snappit-mocha-protractor/issues/24
    var previousThreshold;

    before(function () {
        demoPage.go('#/component/metadata');
        previousThreshold = screenshot.threshold;
        screenshot.threshold = 0.2; // percent
    });

    it('default', function () {
        screenshot.snap(this, $('.metadata'));
    });

    after(function () {
        screenshot.threshold = previousThreshold;
    });

});
