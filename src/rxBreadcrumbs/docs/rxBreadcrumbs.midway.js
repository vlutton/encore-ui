var Page = require('astrolabe').Page;

// Create astrolabe page for use
var rxBreadcrumbsPage = Page.create({
    url: {
        value: '/#rxBreadcrumbs'
    },

    // Elements
    rxBreadcrumbsElement: {
        get: function () {
            return this.findElement(this.by.id('rxBreadcrumbsElement'));
        }
    }
});

// Add midway tests to run
describe('rxBreadcrumbs', function () {
    var ptor = rxBreadcrumbsPage.driver;

    it('beforeAll', function () {
        rxBreadcrumbsPage.go();
    });

    // it('should show element', function () {
    //     // will fail b/c there is no element being added in component.html
    //     expect(rxBreadcrumbsPage.rxBreadcrumbsElement.isDisplayed()).toEqual(true);
    // });
});