var rxFormPage = require('../rxForm.page.js').rxForm;

describe('rxForm', function () {

    it('beforeAll', function () {
        demoPage.go('#/component/rxForm');
    });

    it('should show input', function () {
        expect(rxFormPage.rxFormInput.isDisplayed()).to.eventually.be.true;
    });

});
