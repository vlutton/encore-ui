describe('demo component', function () {

    before(function () {
        demoPage.go('#/component/rxApp');
    });

    it('custom app', function () {
        screenshot.snap(this, $('#custom-rxApp'), { threshold: 1 });
    });

});
