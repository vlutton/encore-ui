var demoPage = require('../../../utils/demo.page.js');
var pagination = require('../rxPaginate.page.js').rxPaginate;
var expect = require('chai').use(require('chai-as-promised')).expect;

// Add midway tests to run
describe('rxPaginate', function () {

    before(function () {
        demoPage.go();
        var ptor = protractor.getInstance();
        pagination = pagination.initialize(ptor.findElement(protractor.By.css('div.rx-paginate')));
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

    it('should navigate to the first page', function () {
        pagination.firstPage();
        expect(pagination.getCurrentPageNumber()).to.eventually.equal(1);
    });

});
