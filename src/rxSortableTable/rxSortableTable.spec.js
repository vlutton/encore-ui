/* jshint node: true */

describe('rxSortableTable', function () {
    var scope, compile, rootScope, el;
    var validTemplate = '<rx-sortable-table></rx-sortable-table>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxSortableTable');

        // load templates
        module('templates/rxSortableTable.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    it('shall not pass', function () {
        // Fail initial test to keep people honest
        expect(true).to.be.false;
    });
});