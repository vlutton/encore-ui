var demoPage = require('../../../utils/demo.page.js');
var rxBreadcrumbsPage = require('../rxBreadcrumbs.page.js').rxBreadcrumbs;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxBreadcrumbs', function () {

    it('beforeAll', function () {
        demoPage.go();
    });

    // it('should show element', function () {
    //     // will fail b/c there is no element being added in component.html
    //     expect(rxBreadcrumbsPage.rxBreadcrumbsElement.isDisplayed()).to.eventually.equal(true);
    // });

});
