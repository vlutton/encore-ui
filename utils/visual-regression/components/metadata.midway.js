describe('demo component', function () {

    before(function () {
        demoPage.go('#/components/metadata');
    });

    it('default', function () {
        screenshot.snap(this, $('.metadata'), { threshold: 0.2 });
    });

});
