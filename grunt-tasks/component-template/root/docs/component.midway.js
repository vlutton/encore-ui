var {%= name %}Page = require('../{%= name %}.page.js').{%=name %};
var expect = require('chai').use(require('chai-as-promised')).expect;

describe('{%= name %}', function () {
    var {%= name %};

    before(function () {
        demoPage.go('#/component/{%= name %}');
        {%= name %} = {%= name %}Page.initialize($('#{%= name %}'));
    });

    it('should show element', function () {
        expect({%= name %}.isDisplayed()).to.eventually.be.true;
    });
});
