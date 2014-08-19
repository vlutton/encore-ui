var demoPage = require('../../../utils/demo.page.js');
var pagination = require('../rxPaginate.page.js').rxPaginate;

// Add midway tests to run
describe('rxPaginate', function () {

    before(function () {
        demoPage.go('#/component/rxPaginate');
        pagination = pagination.initialize($('div.rx-paginate'));
    });

    it('should jump forward to page 7 using pagination', function () {
        pagination.jumpToPage(7);
        expect(pagination.getCurrentPageNumber()).to.eventually.equal(7);
    });

    it('should jump backward to page 2 using pagination', function () {
        pagination.jumpToPage(2);
        expect(pagination.getCurrentPageNumber()).to.eventually.equal(2);
    });

    it('should navigate forward one page at a time', function () {
        pagination.nextPage();
        expect(pagination.getCurrentPageNumber()).to.eventually.equal(3);
    });

    it('should navigate backwards one page at a time', function () {
        pagination.previousPage();
        pagination.previousPage();
        expect(pagination.getCurrentPageNumber()).to.eventually.equal(1);
    });

    it('should navigate to the last page', function () {
        var firstPage;
        pagination.getCurrentPageNumber().then(function (page) {
            firstPage = page;
        });

        pagination.lastPage();
        pagination.getCurrentPageNumber().then(function (page) {
            expect(page).to.be.above(firstPage);
        });
    });

    it('should not allow navigating `next` the last page', function () {
        expect(pagination.nextPage).to.throw(pagination.NoSuchPageException);
    });

    it('should not allow navigating using `last` past the last page', function () {
        expect(pagination.lastPage).to.throw(pagination.NoSuchPageException);
    });

    it('should navigate to the first page', function () {
        pagination.firstPage();
        expect(pagination.getCurrentPageNumber()).to.eventually.equal(1);
    });

    it('should not allow navigating `prev` the first page', function () {
        expect(pagination.previousPage).to.throw(pagination.NoSuchPageException);
    });

    it('should not allow navigating using `first` before the first page', function () {
        expect(pagination.firstPage).to.throw(pagination.NoSuchPageException);
    });

});
