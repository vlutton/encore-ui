/* jshint node: true */

describe('rxPageTitle', function () {
    var pageTitle, scope, rootScope;

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.rxPageTitle');

        // Inject in angular constructs
        inject(function ($rootScope) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
        });

        inject(function (rxPageTitle) {
            pageTitle = rxPageTitle;
        });
    });

    it('should set a title without a suffix', function () {
        var title = 'new title';

        pageTitle.setTitle(title);

        expect(pageTitle.getTitle()).to.equal(title);
    });

    it('should allow specification of a suffix', function () {
        var suffix = ' :: new suffix';

        pageTitle.setSuffix(suffix);

        expect(pageTitle.getSuffix()).to.equal(suffix);
    });

    it('should set the title, including the suffix', function () {
        var title = 'New Title';
        var suffix = ' :: new suffix';

        pageTitle.setSuffix(suffix);
        pageTitle.setTitle(title);

        expect(pageTitle.getTitle()).to.equal(title + suffix);
    });
});