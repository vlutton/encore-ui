var rxLogoutPage = encore.rxLogout;

describe('rxLogout', function () {
    var rxLogout;

    before(function () {
        demoPage.go('#/components/rxLogout');
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
