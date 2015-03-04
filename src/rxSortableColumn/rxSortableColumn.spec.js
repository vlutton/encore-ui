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
        expect(util.getDefault()).to.deep.eq({ predicate: undefined, reverse: undefined });
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

describe('rxSortEmptyTop', function () {

    var sortEmptyTop;
    var predicate = 'image.name';
    var reverse = true;
    var dataRows = [
        { id: '4', image: { name: 'Cent OS' } },
        { id: '1', image: { } },
        { id: '2', image: { name: null } },
        { id: '3', image: { name: undefined } },
        { id: '5', image: { name: 'Ubuntu 12.04 LTS' } }
    ];

    var dataRowsSortedAscending = [
        { id: '1', image: { } },
        { id: '2', image: { name: null } },
        { id: '3', image: { name: undefined } },
        { id: '4', image: { name: 'Cent OS' } },
        { id: '5', image: { name: 'Ubuntu 12.04 LTS' } }
    ];

    var dataRowsSortedDescending = [
        { id: '5', image: { name: 'Ubuntu 12.04 LTS' } },
        { id: '4', image: { name: 'Cent OS' } },
        { id: '1', image: { } },
        { id: '2', image: { name: null } },
        { id: '3', image: { name: undefined } }
    ];

    beforeEach(function () {
        module('encore.ui.rxSortableColumn');

        inject(function ($filter) {
            sortEmptyTop = $filter('rxSortEmptyTop');
        });
    });

    it('should exist', function () {
        expect(!!sortEmptyTop).to.be.true;
    });

    it('should move empty rows to the top in ascending', function () {
        expect(sortEmptyTop(dataRows, predicate, !reverse)).to.deep.eq(dataRowsSortedAscending);
    });

    it('should move empty rows to the bottom in descending', function () {
        expect(sortEmptyTop(dataRows, predicate, reverse)).to.deep.eq(dataRowsSortedDescending);
    });

    it('should return data in the same order when the predicate does not exist', function () {
        expect(sortEmptyTop(dataRows, 'not_a_field', reverse)).to.deep.eq(dataRows);
        expect(sortEmptyTop(dataRows, 'not_a_field', !reverse)).to.deep.eq(dataRows);
    });

});
