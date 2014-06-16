var demoPage = require('../../../utils/demo.page.js');
var hotkeysPage = require('../hotkeys.page.js').hotkeys;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('hotkeys', function () {
    var hotkeys;

    before(function () {
        demoPage.go('#/component/hotkeys');
        hotkeys = hotkeysPage.initialize($('#hotkeys'));
    });

    it('should show element', function () {
        expect(hotkeys.isDisplayed()).to.eventually.be.true;
    });
});
