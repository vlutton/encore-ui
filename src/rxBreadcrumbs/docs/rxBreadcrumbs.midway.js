var rxBreadcrumbs = require('../rxBreadcrumbs.page').rxBreadcrumbs;

describe('rxBreadcrumbs', function () {
    var breadcrumbs;

    before(function () {
        demoPage.go('#/component/rxBreadcrumbs');
        breadcrumbs = rxBreadcrumbs.initialize($('.component-demo rx-breadcrumbs'));
    });

    it('should show the element', function () {
        expect(breadcrumbs.rootElement.isDisplayed()).to.eventually.be.true;
    });

    describe('first breadcrumb', function () {
        var first;

        before(function () {
            first = breadcrumbs.byPosition(0);
        });

        it('should fetch a single breadcrumb by position', function () {
            expect(first).to.not.be.empty;
        });

        it('should be the first breadcrumb', function () {
            expect(first.isFirst()).to.eventually.be.true;
        });

        it('should not be the last breadcrumb', function () {
            expect(first.isLast()).to.eventually.be.false;
        });

        it('should have the name "Home"', function () {
            expect(first.name).to.eventually.equal('Home');
        });

        it('should not have a tag', function () {
            expect(first.lblTag.isPresent()).to.eventually.be.false;
        });

        it('should have the href "/"', function () {
            expect(first.href).to.eventually.equal(browser.baseUrl + '/');
        });

    });

    describe('last breadcrumb', function () {
        var last;

        before(function () {
            last = breadcrumbs.byPosition(-1);
        });

        it('should fetch a single breadcrumb by position', function () {
            expect(last).to.not.be.empty;
        });

        it('should not be the first breadcrumb', function () {
            expect(last.isFirst()).to.eventually.be.false;
        });

        it('should be the last breadcrumb', function () {
            expect(last.isLast()).to.eventually.be.true;
        });

        it('should have the name "All Components"', function () {
            expect(last.name).to.eventually.equal('All Components');
        });

        it('should have a "DEMO TAG" tag',  function () {
            expect(last.lblTag.isPresent()).to.eventually.be.true;
            expect(last.tag).to.eventually.equal('DEMO TAG');
        });

        it('should have no href property', function () {
            expect(last.isLink()).to.eventually.be.false;
            expect(last.href).to.eventually.be.null;
        });

    });

    describe('by name', function () {
        var middle;

        before(function () {
            breadcrumbs.byName('Components').then(function (breadcrumb) {
                middle = breadcrumb;
            });
        });

        it('should fetch a single breadcrumb by position', function () {
            expect(middle).to.not.be.empty;
        });

        it('should not be the first breadcrumb', function () {
            expect(middle.isFirst()).to.eventually.be.false;
        });

        it('should not be the last breadcrumb', function () {
            expect(middle.isLast()).to.eventually.be.false;
        });

        it('should have the name "Components"', function () {
            expect(middle.name).to.eventually.equal('Components');
        });

        it('should not have a tag', function () {
            expect(middle.tag).to.eventually.be.null;
            expect(middle.lblTag.isPresent()).to.eventually.be.false;
        });

        it('should have an href property', function () {
            expect(middle.isLink()).to.eventually.be.true;
            expect(middle.href).to.eventually.equal(browser.baseUrl + '/');
        });

        it('should visit the correct page when clicking on the breadcrumb', function () {
            var homeHref = browser.baseUrl + '/#/overview';

            middle.visit();
            expect(browser.getCurrentUrl()).to.eventually.equal(homeHref);
        });
        // Note that after this test, we are now at the /#/overview page

    });

    describe('default breadcrumbs', function () {
        var defaultBreadcrumbs;

        before(function () {
            demoPage.go('#/component/configs');
            defaultBreadcrumbs = rxBreadcrumbs.main;
        });

        it('should find the default breadcrumbs', function () {
            expect(defaultBreadcrumbs.count()).to.eventually.equal(2);
        });

        it('should have the correct names', function () {
            expect(defaultBreadcrumbs.names).to.eventually.eql(['Home', 'configs']);
        });
    });

});
