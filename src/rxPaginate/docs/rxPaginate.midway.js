var pagination = require('../rxPaginate.page.js').rxPaginate;

describe('rxPaginate', function () {

    before(function () {
        demoPage.go('#/component/rxPaginate');
        pagination = pagination.main;
    });

    it('should jump forward to page 7 using pagination', function () {
        pagination.page = 7;
        expect(pagination.page).to.eventually.equal(7);
    });

    it('should jump backward to page 2 using pagination', function () {
        pagination.page = 2;
        expect(pagination.page).to.eventually.equal(2);
    });

    it('should navigate forward one page at a time', function () {
        pagination.next();
        expect(pagination.page).to.eventually.equal(3);
    });

    it('should navigate backwards one page at a time', function () {
        pagination.previous();
        pagination.previous();
        expect(pagination.page).to.eventually.equal(1);
    });

    it('should navigate to the last page', function () {
        pagination.page.then(function (page) {
            var firstPage = page;
            pagination.last();
            expect(pagination.page).to.eventually.be.above(firstPage);
        });
    });

    it('should not allow navigating `next` the last page', function () {
        expect(pagination.next).to.throw(pagination.NoSuchPageException);
    });

    it('should allow attempting to navigate to the last page when already on the last page', function () {
        pagination.page.then(function (page) {
            pagination.last();
            expect(pagination.page).to.eventually.equal(page);
        });
    });

    it('should navigate to the first page', function () {
        pagination.first();
        expect(pagination.page).to.eventually.equal(1);
    });

    it('should not allow navigating `prev` the first page', function () {
        expect(pagination.previous).to.throw(pagination.NoSuchPageException);
    });

    it('should allow attempting to navigate to the first page when already on the first page', function () {
        pagination.first();
        expect(pagination.page).to.eventually.equal(1);
    });

    it('should have all available page sizes', function () {
        expect(pagination.pageSizes).to.eventually.eql([3, 50, 200, 350, 500]);
    });

    it('should highlight the current items per page selection', function () {
        expect(pagination.pageSize).to.eventually.equal(3);
    });

    it('should switch to a different items per page', function () {
        pagination.pageSize = 50;
        expect(pagination.pageSize).to.eventually.equal(50);
    });

    it('should not allow selecting an unavailable items per page', function () {
        var fn = function () {
            return protractor.promise.fulfilled(pagination.__lookupSetter__('pageSize').call(pagination, 45));
        };
        expect(fn()).to.be.rejectedWith(pagination.NoSuchItemsPerPage);
    });

});
