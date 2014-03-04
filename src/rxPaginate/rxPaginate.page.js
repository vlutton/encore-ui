/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxPaginate = {

    lnkCurrentPage: {
        get: function () { return this.rootElement.findElement(this.by.css('.pagination .active a')); }
    },

    tblPagination: {
        get: function () { return this.rootElement.findElements(this.by.css('.pagination li a')); }
    },

    jumpToPage: {
        value: function (pageNumber) {
            var page = this;
            if (pageNumber < 1) {
                page.NoSuchPageException.thro('Page number must be >= 1');
            }

            return this.getPageNumbers().then(function (pageNumbers) {
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
                    return page.tblPagination.then(function (pagination) {
                        // pageIndex + 2 will offset the ["First", "Prev"] links.
                        return pagination[pageIndex + 2].then(function (page) {
                            page.click();
                        });
                    });
                }
            });
        }
    },

    firstPage: {
        value: function () {
            this.checkForInvalidFirstPage();
            return this.tblPagination.then(function (pages) {
                return pages[0].then(function (firstPage) {
                    firstPage.click();
                });
            });
        }
    },

    previousPage: {
        value: function () {
            this.checkForInvalidFirstPage();
            return this.tblPagination.then(function (pages) {
                return pages[1].then(function (previousPage) {
                    previousPage.click();
                });
            });
        }
    },

    nextPage: {
        value: function () {
            this.checkForInvalidLastPage();
            return this.tblPagination.then(function (pages) {
                return pages[pages.length - 2].then(function (nextPage) {
                    nextPage.click();
                });
            });
        }
    },

    lastPage: {
        value: function () {
            this.checkForInvalidLastPage();
            return this.tblPagination.then(function (pages) {
                return _.last(pages).then(function (lastPage) {
                    lastPage.click();
                });
            });
        }
    },

    getCurrentPageNumber: {
        value: function () {
            return this.lnkCurrentPage.then(function (currentPage) {
                return currentPage.getText().then(function (text) {
                    return parseInt(text, 10);
                });
            });
        }
    },

    getPageNumbers: {
        value: function () {
            // Return a list of page numbers available to paginate to.
            var pages = [];
            var css = 'a[ng-click$="pageNumber = n"]';
            return this.driver.findElements(this.by.css(css)).then(function (pageNumbers) {
                _.forEach(pageNumbers, function (pageNumber) {
                    return pageNumber.then(function (number) {
                        return number.getText().then(function (n) {
                            pages.push(parseInt(n, 10));
                        });
                    });
                });
                return pages;
            });
        }
    },

    jumpToLowestAvailablePage: {
        value: function () {
            return this.tblPagination.then(function (pagination) {
                return pagination[2].then(function (lowestLink) {
                    lowestLink.click();
                });
            });
        }
    },

    jumpToHighestAvailablePage: {
        value: function () {
            return this.tblPagination.then(function (pagination) {
                return pagination[pagination.length - 3].then(function (highestLink) {
                    highestLink.click();
                });
            });
        }
    },

    checkForInvalidFirstPage: {
        value: function () {
            var page = this;
            return this.getCurrentPageNumber().then(function (currentPage) {
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
            return this.getCurrentPageNumber().then(function (currentPage) {
                pageNumber = pageNumber || 'any higher number';
                return page.getPageNumbers().then(function (pageNumbers) {
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
