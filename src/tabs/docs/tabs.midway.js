var demoPage = require('../../../utils/demo.page.js');
var tabsPage = require('../tabs.page.js').tabs;

// Add midway tests to run
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
