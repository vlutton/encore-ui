var {%= name %}Page = encore.{%=name %};

describe('{%= name %}', function () {
    var {%= name %};

    before(function () {
        demoPage.go('#/components/{%= name %}');
        {%= name %} = {%= name %}Page.initialize($('#{%= name %}'));
    });

    it('should show element', function () {
        expect({%= name %}.isDisplayed()).to.eventually.be.true;
    });

    describe('exercises', encore.exercise.{%= name %}());

});
