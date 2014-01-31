var Page = require('astrolabe').Page;

// Create astrolabe page for use
var {%= name %}Page = Page.create({
    url: {
        value: '/#{%= name %}'
    },

    // Elements
    {%= name %}Element: {
        get: function () {
            return this.findElement(this.by.id('{%= name %}Element'));
        }
    }
});

// Add midway tests to run
describe('{%= name %}', function () {
    var ptor = {%= name %}Page.driver;

    it('beforeAll', function () {
        {%= name %}Page.go();
    });

    it('should show element', function () {
        // will fail b/c there is no element being added in component.html
        expect({%= name %}Page.{%= name %}Element.isDisplayed()).toEqual(true);
    });
});