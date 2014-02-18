/*jshint node:true*/
var Page = require('astrolabe').Page;
var _ = require('lodash');

var page = {

    lnkCurrentPage: {
        get: function () { return this.rxPaginate.findElement(this.by.css('.pagination .active a')); }
    },

    tblPagination: {
        get: function () { return this.rxPaginate.findElements(this.by.css('.pagination li a')); }
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
                        return page.getCurrentPageNumber().then(function (currentPage) {
                            if (_.last(pageNumbers) == currentPage) {
                                // We are at the last page, and we still need to go higher.
                                var message = pageNumber + ' exceeds max page of ' + _.last(pageNumbers);
                                page.NoSuchPageException.thro(message);
                            } else {
                                page.jumpToHighestAvailablePage();
                                // Try again.
                                page.jumpToPage(pageNumber);
                            }
                        });
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
            return this.tblPagination.then(function (pages) {
                return pages[0].then(function (firstPage) {
                    firstPage.click();
                });
            });
        }
    },

    previousPage: {
        value: function () {
            return this.tblPagination.then(function (pages) {
                return pages[1].then(function (previousPage) {
                    previousPage.click();
                });
            });
        }
    },

    nextPage: {
        value: function () {
            return this.tblPagination.then(function (pages) {
                return pages[pages.length - 2].then(function (nextPage) {
                    nextPage.click();
                });
            });
        }
    },

    lastPage: {
        value: function () {
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

    NoSuchPageException: {
        get: function () { return this.exception('No such page'); }
    }

};

exports.rxPaginate = {
    initialize: function (rxPaginationElement) {
        page.rxPaginate = {
            get: function () { return rxPaginationElement; }
        };
        return Page.create(page);
    }
};
