describe('demo component', function () {

    before(function () {
        demoPage.go('#/components/rxApp');
    });

    it('custom app', function () {
        screenshot.snap(this, $('#custom-rxApp'), { threshold: 1 });
    });

});
