var demoPage = require('../../../utils/demo.page.js');
var rxTypeaheadPage = require('../rxTypeahead.page.js').rxTypeahead;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxTypeahead', function () {
    var rxTypeahead;

    before(function () {
        demoPage.go('#/component/rxTypeahead');
        rxTypeahead = rxTypeaheadPage.initialize($('#rxTypeahead'));
    });

    it('should show element', function () {
        expect(rxTypeahead.isDisplayed()).to.eventually.be.true;
    });
});
