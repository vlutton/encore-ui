var demoPage = require('../../../utils/demo.page.js');
var rxModalActionPage = require('../rxModalAction.page.js').rxModalAction;

// Add midway tests to run
describe('rxModalAction', function () {
    var ptor = rxModalActionPage.driver;

    it('beforeAll', function () {
        demoPage.go('#/component/rxModalAction');
    });

    // it('should show element', function () {
    //     // will fail b/c there is no element being added in component.html
    //     expect(rxModalActionPage.rxModalActionElement.isDisplayed()).toEqual(true);
    // });
});
