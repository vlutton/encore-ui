var demoPage = require('../../../utils/demo.page.js');
var rxLogoutPage = require('../rxLogout.page.js').rxLogout;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxLogout', function () {
    var rxLogout;

    before(function () {
        demoPage.go('#/component/rxLogout');
        rxLogout = rxLogoutPage.initialize($('#rxLogout'));
    });

    it('should show element', function () {
        expect(rxLogout.isDisplayed()).to.eventually.be.true;
    });

    it('should redirect to logout/login page on click', function () {
        rxLogout.logout();

        expect(demoPage.currentUrl).to.eventually.contain('login');
    });
});
