var demoPage = require('../../../utils/demo.page.js');
var rxPaginatePage = require('../rxPaginate.page.js').rxPaginate;

// Add midway tests to run
describe('rxPaginate', function () {
    var ptor = rxPaginatePage.driver;

    it('beforeAll', function () {
        demoPage.go();
    });

    // it.skip('should show element', function () {
    //     // will fail b/c there is no element being added in component.html
    //     expect(rxPaginatePage.rxPaginateElement.isDisplayed()).toEqual(true);
    // });
});