var rxSortableColumn = require('../rxSortableColumn.page.js').rxSortableColumn;

describe('rxSortableColumn', function () {
    var nameColumn = null;
    var roleColumn = null;

    before(function () {
        demoPage.go('#/component/rxSortableColumn');
        var nameSelector = $('rx-sortable-column[sort-property="name"]');
        var roleSelector = $('rx-sortable-column[sort-property="jobTitle"]');
        nameColumn = rxSortableColumn.initialize(nameSelector, 'resource in talentPool');
        roleColumn = rxSortableColumn.initialize(roleSelector);
    });

    it('should display some sortable columns', function () {
        expect(nameColumn.rootElement.isDisplayed()).to.eventually.eq.true;
        expect(roleColumn.rootElement.isDisplayed()).to.eventually.eq.true;
    });

    it('should have a descending sort shown by default for the name column', function () {
        expect(nameColumn.currentSortDirection).to.eventually.eq(0);
    });

    it('should have no sort shown by default for the job title column', function () {
        expect(roleColumn.currentSortDirection).to.eventually.eq(-1);
    });

    it('should support sorting columns ascending', function () {
        nameColumn.sortAscending();
        expect(nameColumn.currentSortDirection).to.eventually.eq(1);
    });

    it('should support sorting columns descending', function () {
        nameColumn.sortDescending();
        expect(nameColumn.currentSortDirection).to.eventually.eq(0);
    });

    it('should remove all other sorts when sorting an unsorted column', function () {
        roleColumn.sortAscending();
        expect(nameColumn.currentSortDirection).to.eventually.eq(-1);
    });

    it('should have a name', function () {
        expect(nameColumn.name).to.eventually.eq('Name');
        expect(roleColumn.name).to.eventually.eq('Occupation');
    });

    describe('column data', function () {

        it('should throw an error if attempting to access cell data without a repeater string', function () {
            expect(roleColumn.data).to.eventually.be.rejectedWith(roleColumn.CellUndiscoverableError);
        });

        it('should return all names as data', function () {
            var names = ['Andrew Yurisich', 'Hussam Dawood', 'Kerry Bowley', 'Patrick Deuley'];
            expect(nameColumn.data).to.eventually.eql(names);
        });

        it('should apply a custom map function to cells', function () {
            var mapFn = function sortsMail (cellElements) {
                return cellElements.map(function (cellElement) {
                    return cellElement.getText().then(function (name) {
                        return name === 'Andrew Yurisich';
                    });
                });
            };

            expect(nameColumn.getDataUsing(mapFn)).to.eventually.eql([true, false, false, false]);
        });

        it('should apply a custom reduce function to cells', function () {
            var reduceFn = function hasNamedState (cellElements) {
                return cellElements.reduce(function (acc, cellElement) {
                    return cellElement.getText().then(function (text) {
                        if (text === 'Hussam Dawood') {
                            acc[text] = 'Republic of Dawood';
                        }
                        return acc;
                    });
                }, {});
            };

            expect(nameColumn.getDataUsing(reduceFn)).to.eventually.eql({ 'Hussam Dawood': 'Republic of Dawood' });
        });

    });

});
