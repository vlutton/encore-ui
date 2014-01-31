var Page = require('astrolabe').Page;

// Create astrolabe page for use
var rxPaginatePage = Page.create({
    url: {
        value: '/#rxPaginate'
    },

    // Elements
    rxPaginateElement: {
        get: function () {
            return this.findElement(this.by.id('rxPaginateElement'));
        }
    }
});

// Add midway tests to run
describe('rxPaginate', function () {
    var ptor = rxPaginatePage.driver;

    it('beforeAll', function () {
        rxPaginatePage.go();
    });

    it('should show element', function () {
        // will fail b/c there is no element being added in component.html
        expect(rxPaginatePage.rxPaginateElement.isDisplayed()).toEqual(true);
    });
});