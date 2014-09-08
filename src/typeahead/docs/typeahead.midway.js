var typeaheadPage = require('../typeahead.page.js').typeahead;

describe('typeahead', function () {
    var typeahead;

    before(function () {
        demoPage.go('#/component/typeahead');
        typeahead = typeaheadPage.initialize($('#typeahead'));
    });

    it('should show element', function () {
        expect(typeahead.isDisplayed()).to.eventually.be.true;
    });
});
