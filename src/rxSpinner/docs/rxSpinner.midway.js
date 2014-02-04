var Page = require('astrolabe').Page;

// Create astrolabe page for use
var rxSpinnerPage = Page.create({
    url: {
        value: '/#rxSpinner'
    },

    // Elements
    rxSpinnerElement: {
        get: function () {
            return this.findElement(this.by.id('rxSpinnerElement'));
        }
    }
});

// Add midway tests to run
describe('rxSpinner', function () {
    var ptor = rxSpinnerPage.driver;

    it('beforeAll', function () {
        rxSpinnerPage.go();
    });

    it('should show element', function () {
        // will fail b/c there is no element being added in component.html
        expect(rxSpinnerPage.rxSpinnerElement.isDisplayed()).toEqual(true);
    });
});