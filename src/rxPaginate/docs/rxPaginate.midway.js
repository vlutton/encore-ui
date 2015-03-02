var exercise = require('../rxPaginate.exercise.js');
var rxSortableColumn = require('../../rxSortableColumn/rxSortableColumn.page').rxSortableColumn;
var Page = require('astrolabe').Page;

// rowFromElement and table are anonymous page objects to assist with table data
var rowFromElement = function (rowElement) {
    return Page.create({

        name: {
            get: function () {
                return rowElement.element(by.binding('name')).getText();
            }
        },

        os: {
            get: function () {
                return rowElement.element(by.binding('os')).getText();
            }
        },
    });
};
var repeaterString = 'server in pagedServers.items';
var tableSelector = '.demo-api-pagination';
var table = Page.create({

    tblResults: {
        get: function () {
            return element.all(by.repeater(repeaterString));
        }
    },

    txtFilter: {
        get: function () {
            return element(by.model('data.searchText'));
        }
    },

    count: {
        value: function () {
            return this.tblResults.count();
        }
    },

    row: {
        value: function (rowIndex) {
            return rowFromElement(this.tblResults.get(rowIndex));
        }
    },

    column: {
        value: function (columnName) {
            var column = element(by.cssContainingText(tableSelector + ' rx-sortable-column', columnName));
            return rxSortableColumn.initialize(column, repeaterString);
        }
    },

    filter: {
        get: function () {
            return this.txtFilter.getAttribute('value');
        },
        set: function (filterTerm) {
            this.txtFilter.clear();
            this.txtFilter.sendKeys(filterTerm);
        }
    }
});

describe('rxPaginate', function () {

    before(function () {
        demoPage.go('#/component/rxPaginate');
    });
    describe('UI pagination exercises', exercise.rxPaginate({
        pageSizes: [3, 50, 200, 350, 500],
        defaultPageSize: 3,
        cssSelector: '.demo-ui-pagination .rx-paginate'
    }));

    describe('API pagination exercises', exercise.rxPaginate({
        pageSizes: [25, 50, 200, 350, 500],
        defaultPageSize: 25,
        pages: 30,
        cssSelector: '.demo-api-pagination .rx-paginate'
    }));
    describe('Filter and sort tests', function () {
        var nameColumn = table.column('Name');
        var osColumn = table.column('OS');

        beforeEach(function () {
            table.filter = '';
            nameColumn.sortAscending();
        });

        it('should get new items when filter text is entered', function () {
            table.filter = 'Ubuntu';
            expect(table.row(0).name).to.eventually.equal('Server 3');
            expect(table.row(0).os).to.eventually.equal('Ubuntu 13.04');
        });

        it('should sort the Name column descending', function () {
            nameColumn.sortDescending();
            expect(table.row(0).name).to.eventually.equal('Server 701');
        });
        
        it('should sort the OS column descending', function () {
            osColumn.sortDescending();
            expect(table.row(0).os).to.eventually.equal('Ubuntu 13.04');
        });

    });
});
