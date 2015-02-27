var {%= name %}Page = require('../{%= name %}.page').{%=name %};
var exercise = require('../{%= name %}.exercise');

describe('{%= name %}', function () {
    var {%= name %};

    before(function () {
        demoPage.go('#/component/{%= name %}');
        {%= name %} = {%= name %}Page.initialize($('#{%= name %}'));
    });

    it('should show element', function () {
        expect({%= name %}.isDisplayed()).to.eventually.be.true;
    });

    describe('exercises', exercise.{%= name %}());

});
