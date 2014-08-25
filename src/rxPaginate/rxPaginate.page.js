/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxPaginate = {

    lnkCurrentPage: {
        get: function () { return this.rootElement.$('.pagination .active a'); }
    },

    tblPagination: {
        get: function () { return this.rootElement.$$('.pagination li a'); }
    },

    jumpToPage: {
        value: function (pageNumber) {
            var page = this;
            if (pageNumber < 1) {
                page.NoSuchPageException.thro('Page number must be >= 1');
            }

            return this.pages.then(function (pageNumbers) {
                var pageIndex = _.indexOf(pageNumbers, pageNumber);
                if (pageIndex === -1) {
                    // The page is not on the current page numbers list.
                    // Let's navigate around and try again.
                    if (_.min(pageNumbers) > pageNumber) {
                        // The lowest available page is still too big.
                        page.jumpToLowestAvailablePage();
                        // Try again.
                        page.jumpToPage(pageNumber);
                    } else {
                        page.checkForInvalidLastPage(pageNumber);
                        page.jumpToHighestAvailablePage();
                        // Try again.
                        page.jumpToPage(pageNumber);
                    }
                } else {
                    // Our target page is somewhere in the available pages list.
                    // pageIndex + 2 will offset the ["First", "Prev"] links.
                    return page.tblPagination.get(pageIndex + 2).click();
                }
            });
        }
    },

    first: {
        value: function () {
            this.checkForInvalidFirstPage();
            return this.tblPagination.first().click();
        }
    },

    previous: {
        value: function () {
            this.checkForInvalidFirstPage();
            return this.tblPagination.get(1).click();
        }
    },

    next: {
        value: function () {
            this.checkForInvalidLastPage();
            return this.tblPagination.then(function (pages) {
                pages[pages.length - 2].click();
            });
        }
    },

    last: {
        value: function () {
            this.checkForInvalidLastPage();
            return this.tblPagination.get(-1).click();
        }
    },

    page: {
        // Return the current page number, or change page numbers.
        get: function () {
            return this.lnkCurrentPage.getText().then(function (text) {
                return parseInt(text, 10);
            });
        },
        set: function (pageNumber) {
            return this.jumpToPage(pageNumber);
        }
    },

    pages: {
        get: function () {
            // Return a list of page numbers available to paginate to.
            return $$('a[ng-click$="pageNumber = n"]').map(function (pageNumber) {
                return pageNumber.getText().then(function (n) {
                    return parseInt(n, 10);
                });
            });
        }
    },

    jumpToLowestAvailablePage: {
        value: function () {
            return this.tblPagination.get(2).click();
        }
    },

    jumpToHighestAvailablePage: {
        value: function () {
            return this.tblPagination.then(function (pagination) {
                return pagination[pagination.length - 3].click();
            });
        }
    },

    checkForInvalidFirstPage: {
        value: function () {
            var page = this;
            return this.page.then(function (currentPage) {
                if (currentPage === 1) {
                    page.NoSuchPageException.thro('cannot navigate back past the first page.');
                }
            });
        }
    },

    checkForInvalidLastPage: {
        // Accepts an optional `pageNumber` argument to print to the exception
        // should the `NoSuchPageException` get triggered during this call.
        // Otherwise, it defaults to a generic invalid page message.
        value: function (pageNumber) {
            var page = this;
            return this.page.then(function (currentPage) {
                pageNumber = pageNumber || 'any higher number';
                return page.pages.then(function (pageNumbers) {
                    if (_.last(pageNumbers) == currentPage) {
                        // We are at the last page, and we still need to go higher.
                        var message = pageNumber + ' exceeds max page of ' + _.last(pageNumbers);
                        page.NoSuchPageException.thro(message);
                    }
                });
            });
        }
    },

    NoSuchPageException: {
        get: function () { return this.exception('No such page'); }
    }

};

exports.rxPaginate = {
    initialize: function (rxPaginationElement) {
        rxPaginate.rootElement = {
            get: function () { return rxPaginationElement; }
        };
        return Page.create(rxPaginate);
    }
};
