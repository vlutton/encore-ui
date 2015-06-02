describe('demo component', function () {

    before(function () {
        demoPage.go('#/component/rxBreadcrumbs');
    });

    it('default', function () {
        screenshot.snap(this, $('.tab-content rx-breadcrumbs ol'));
    });

});
