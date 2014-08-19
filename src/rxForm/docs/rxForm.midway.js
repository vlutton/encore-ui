var demoPage = require('../../../utils/demo.page.js');
var rxFormPage = require('../rxForm.page.js').rxForm;

// Add midway tests to run
describe('rxForm', function () {

    it('beforeAll', function () {
        demoPage.go('#/component/rxForm');
    });

    it('should show input', function () {
        expect(rxFormPage.rxFormInput.isDisplayed()).to.eventually.be.true;
    });

});
