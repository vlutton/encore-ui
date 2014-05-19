var demoPage = require('../../../utils/demo.page.js');
var typeaheadPage = require('../typeahead.page.js').typeahead;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
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
