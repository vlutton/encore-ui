/* jshint node: true */

describe('rxSortableColumn', function () {
    var scope, compile, rootScope, el;
    var validTemplate = '<rx-sortable-column reverse="false">Yo!</rx-sortable-column>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxSortableColumn');

        // load templates
        module('templates/rxSortableColumn.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    afterEach(function () {
        el = null;
    });

    it('should render template correctly', function () {
        expect(el).not.be.empty;
        expect(el.find('button')).not.be.empty;
        expect(el.find('button').text()).to.contain('Yo!');
        expect(el.find('i')).not.be.empty;
        expect(el.find('i').hasClass('asc')).to.be.true;
    });
});

describe('rxSortUtil', function () {
    var util;

    beforeEach(function () {
        module('encore.ui.rxSortableColumn');

        inject(function (rxSortUtil) {
            util = rxSortUtil;
        });
    });

    it('SortUtil: getDefault will return default settings when no parameters are passed', function () {
        expect(util.getDefault()).to.deep.eq({ predicate: 'name', reverse: undefined });
    });

    it('SortUtils: getDfault will set parameters if specified', function () {
        expect(util.getDefault('datacenter', true)).to.deep.eq({ predicate: 'datacenter', reverse: true });
    });

    it('SortUtil: sortCol will sort reverse the sort if it is the same predicate', function () {
        var scope = { sort: { predicate: 'name', reverse: false }, pager: { pageNumber: 1 }};

        util.sortCol(scope, 'name');
        expect(scope.sort.reverse).to.be.true;
        expect(scope.pager.pageNumber).to.eq(0);
    });

    it('SortUtil: sortCol will set reverse to false if it is different predicate', function () {
        var scope = { sort: { predicate: 'name', reverse: true }, pager: { pageNumber: 1 }};

        util.sortCol(scope, 'datacenter');
        expect(scope.sort.reverse).to.be.false;
    });
});
