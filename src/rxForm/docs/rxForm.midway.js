var demoPage = require('../../../utils/demo.page.js');
var rxFormPage = require('../rxForm.page.js').rxForm;

// Add midway tests to run
describe('rxForm', function () {
    var ptor = rxFormPage.driver;

    it('beforeAll', function () {
        demoPage.go();
    });

    // iit('should show input', function() {
    //     expect(rxFormPage.rxFormInput.isDisplayed()).toEqual(true);
    // });
});