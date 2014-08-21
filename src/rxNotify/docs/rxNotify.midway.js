var demoPage = require('../../../utils/demo.page.js');
var rxNotifyPage = require('../rxNotify.page.js').rxNotify;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxNotify', function () {

    before(function () {
        demoPage.go('#/component/rxNotify');
    });

    it('should show element', function () {
        expect(rxNotifyPage.rootElement.isDisplayed()).to.eventually.eq.true;
    });
});
