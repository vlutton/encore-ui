var rxSortableTablePage = encore.rxSortableTable;

describe('rxSortableTable', function () {
    var rxSortableTable;

    before(function () {
        demoPage.go('#/components/rxSortableTable');
        rxSortableTable = rxSortableTablePage.initialize($('#rxSortableTable'));
    });

    it('should show element', function () {
        expect(rxSortableTable.isDisplayed()).to.eventually.be.true;
    });

    describe('exercises', encore.exercise.rxSortableTable());

});
