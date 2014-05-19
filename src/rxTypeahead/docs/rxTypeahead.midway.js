var demoPage = require('../../../utils/demo.page.js');
var rxAutocompletePage = require('../rxAutocomplete.page.js').rxAutocomplete;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxAutocomplete', function () {
    var rxAutocomplete;

    before(function () {
        demoPage.go('#/component/rxAutocomplete');
        rxAutocomplete = rxAutocompletePage.initialize($('#rxAutocomplete'));
    });

    it('should show element', function () {
        expect(rxAutocomplete.isDisplayed()).to.eventually.be.true;
    });
});
