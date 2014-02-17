/*jshint undef:false*/

var demoPage = require('../../../utils/demo.page.js');
var rxSortableColumnPage = require('../rxSortableColumn.page.js').rxSortableColumn;
var expect = require('chai').use(require('chai-as-promised')).expect;
var Page = require('astrolabe').Page;

var examplePage = Page.create({
    resourceTable: {
        get: function () {
            var repeater = 'resource in talentPool | orderBy:sort.predicate:sort.reverse';
            return this.findElements(this.by.repeater(repeater));
        }
    },
});

// Add midway tests to run
describe('rxSortableColumn', function () {
    var ptor = rxSortableColumnPage.driver;

    before(function () {
        demoPage.go();
    });

    it('should show element', function () {
        expect(rxSortableColumnPage.rootElement.isDisplayed()).to.eventually.eq.true;
    });

    it('should sort descending by default', function () {
        expect(rxSortableColumnPage.sortIcon.getAttribute('class')).to.eventually.contain('desc');
        examplePage.resourceTable.then(function (rows) {
            // expect first resource to be Andrew
            expect(rows[0].getText()).to.eventually.contain('Yurisich');

            // expect last resource to be Patrick
            expect(rows[rows.length - 1].getText()).to.eventually.contain('Deuley');
        });
    });

    it('should sort ascending after toggle', function () {
        // toggle sort
        rxSortableColumnPage.sortAction.click();

        expect(rxSortableColumnPage.sortIcon.getAttribute('class')).to.eventually.contain('asc');

        // expect first resource to be Patrick
        examplePage.resourceTable.then(function (rows) {
            expect(rows[0].getText()).to.eventually.contain('Deuley');
            expect(rows[rows.length - 1].getText()).to.eventually.contain('Yurisich');
        });
    });
});
