var Page = require('astrolabe').Page;

// Create astrolabe page for use
var rxModalActionPage = Page.create({
    url: {
        value: '/#rxModalAction'
    },

    // Elements
    rxModalActionElement: {
        get: function () {
            return this.findElement(this.by.id('rxModalActionElement'));
        }
    }
});

// Add midway tests to run
describe('rxModalAction', function () {
    var ptor = rxModalActionPage.driver;

    it('beforeAll', function () {
        rxModalActionPage.go();
    });

    // it('should show element', function () {
    //     // will fail b/c there is no element being added in component.html
    //     expect(rxModalActionPage.rxModalActionElement.isDisplayed()).toEqual(true);
    // });
});