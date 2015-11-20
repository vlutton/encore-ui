describe('demo component', function () {

    before(function () {
        demoPage.go('#/components/rxBreadcrumbs');
    });

    it('default', function () {
        screenshot.snap(this, $('.tab-content rx-breadcrumbs ol'), { threshold: 1 });
    });

});
