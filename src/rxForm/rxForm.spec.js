/* jshint node: true */

describe('rxFormItem', function () {
    var el, scope, compile, rootScope,
        validTemplate = '<rx-form-item label="Name"><input type="text" /></rx-form-item>';

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('templates/rxFormItem.html');

        inject(function ($rootScope, $compile) {
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
        expect(el.find('input')).not.be.empty;
        expect(el.find('label').text()).to.contain('Name');
    });
});