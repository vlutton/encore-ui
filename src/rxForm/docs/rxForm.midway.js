var Page = require('astrolabe').Page;

// Create astrolabe page for use
var rxFormPage = Page.create({
    url: {
        value: '/#rxForm'
    },

    // Elements
    rxFormInput: {
        get: function () {
            return this.findElement(this.by.id('volumeName'));
        }
    }
});

// Add midway tests to run
describe('rxForm', function () {
    var ptor = rxFormPage.driver;

    it('beforeAll', function () {
        rxFormPage.go();
    })

    // iit('should show input', function() {
    //     expect(rxFormPage.rxFormInput.isDisplayed()).toEqual(true);
    // });
});