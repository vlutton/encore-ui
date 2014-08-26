var demoPage = require('../../../utils/demo.page.js');
var rxBreadcrumbsPage = require('../rxBreadcrumbs.page.js').rxBreadcrumbs;

describe('rxBreadcrumbs', function () {
    var breadcrumbs;

    before(function () {
        demoPage.go('#/component/rxBreadcrumbs');
        breadcrumbs = rxBreadcrumbsPage.initialize($('.component-demo .rx-breadcrumbs'));
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

        it('should have the href "/"', function () {
            expect(first.href).to.eventually.equal(browser.baseUrl + '/');
        });

        it('should change colors when hovered over', function () {
            first.hover();
            expect(first.isHovered()).to.eventually.be.true;
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

        it('should have no href property', function () {
            expect(last.isLink()).to.eventually.be.false;
            expect(last.href).to.eventually.be.null;
        });

        it('should not change color when hovered over', function () {
            last.hover();
            expect(last.isHovered()).to.eventually.be.false;
        });

    });

    describe('all breadcrumbs', function () {
        var all;

        before(function () {
            breadcrumbs.toArray().then(function (allBreadcrumbs) {
                all = allBreadcrumbs;
            });
        });

        it('should have the first breadcrumb first', function () {
            expect(all[0].isFirst()).to.eventually.be.true;
        });

        it('should have the last breadcrumb last', function () {
            expect(all[2].isLast()).to.eventually.be.true;
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

        it('should have an href property', function () {
            expect(middle.isLink()).to.eventually.be.true;
            expect(middle.href).to.eventually.equal(browser.baseUrl + '/');
        });

        it('should change color when hovered over', function () {
            middle.hover();
            expect(middle.isHovered()).to.eventually.be.true;
        });

    });

});
