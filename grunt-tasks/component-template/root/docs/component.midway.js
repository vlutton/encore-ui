var demoPage = require('../../../utils/demo.page.js');
var {%= name %}Page = require('../{%= name %}.page.js').{%=name %};
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('{%= name %}', function () {
    var ptor = protractor.getInstance();
    var {%= name %};

    before(function () {
        demoPage.go();
        {%= name %} = {%= name %}Page.initialize(ptor.findElement(protractor.By.css('#{%= name %}')));
    });

    it('should show element', function () {
        expect({%= name %}.rootElement.isDisplayed()).to.eventually.eq.true;
    });
});
