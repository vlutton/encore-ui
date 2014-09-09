var tabsPage = require('../tabs.page.js').tabs;

describe('tabs', function () {
    var tabs;

    before(function () {
        demoPage.go('#/component/tabs');
        tabs = tabsPage.initialize($('#tabs'));
    });

    it('should show element', function () {
        expect(tabs.isDisplayed()).to.eventually.be.true;
    });
});
