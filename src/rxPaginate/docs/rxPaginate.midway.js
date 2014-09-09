var pagination = require('../rxPaginate.page.js').rxPaginate;

describe('rxPaginate', function () {

    before(function () {
        demoPage.go('#/component/rxPaginate');
        pagination = pagination.initialize($('div.rx-paginate'));
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

    it('should not allow navigating using `last` past the last page', function () {
        expect(pagination.last).to.throw(pagination.NoSuchPageException);
    });

    it('should navigate to the first page', function () {
        pagination.first();
        expect(pagination.page).to.eventually.equal(1);
    });

    it('should not allow navigating `prev` the first page', function () {
        expect(pagination.previous).to.throw(pagination.NoSuchPageException);
    });

    it('should not allow navigating using `first` before the first page', function () {
        expect(pagination.first).to.throw(pagination.NoSuchPageException);
    });

});
