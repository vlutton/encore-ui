var demoPage = require('../../../utils/demo.page.js');
var {%= name %}Page = require('../{%= name %}.page.js').{%= name %};
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('{%= name %}', function () {
    var ptor = {%= name %}Page.driver;

    it('beforeAll', function () {
        demoPage.go();
    });

    it('should show element', function () {
        expect({%= name %}Page.{%= name %}Element.isDisplayed()).to.eventually.eq.true;
    });
});
