/* jshint node: true */

describe('rxFormItem', function () {
    var el, scope, compile, rootScope,
        formItemTemplate = '<rx-form-item label="Name"><input type="text" /></rx-form-item>';

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('templates/rxFormItem.html');

        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(formItemTemplate, compile, scope);
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

describe('rxFormOptionTable', function () {
    var el, scope, compile, rootScope, elScope,
        radioFormTemplate =
            '<rx-form-option-table data="tableData" columns="tableColumns" ' +
            'type="radio" model="myModel" field-id="optionTable" selected="0"></rx-form-option-table>';

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('templates/rxFormOptionTable.html');

        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        // init myModel
        scope.myModel;

        scope.tableData = [
            {
                'name': 'Option #1',
                'value': 0
            }, {
                'name': 'Option #2',
                'value': 1
            }, {
                'name': 'Option #3',
                'value': 2
            }
        ];

        scope.tableColumns = [{
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }];

        el = helpers.createDirective(radioFormTemplate, compile, scope);

        elScope = el.isolateScope();
    });

    afterEach(function () {
        el = null;
        elScope = null;
    });

    it('should determine the current row', function () {
        expect(elScope.isCurrent('0'), 'Item 1').to.be.true;

        expect(elScope.isCurrent(1), 'Item 2').to.be.false;
    });

    it('should determine the selected row for radio inputs', function () {
        // nothing should be selected by default
        expect(elScope.isSelected(0), 'Item 1').to.be.false;
        expect(elScope.isSelected(1), 'Item 2').to.be.false;

        // select second item
        scope.myModel = 1;
        scope.$digest();

        expect(elScope.isSelected(0), 'Item 1 still unselected').to.be.false;
        expect(elScope.isSelected(1), 'Item 2 now selected').to.be.true;

        // should take either string or int
        expect(elScope.isSelected('1'), 'Check item 2 selected with string').to.be.true;
    });

    it('should determine the selected row for checkbox inputs', function () {
        var checkboxFormTemplate =
            '<rx-form-option-table data="tableData" columns="tableColumns" ' +
            'type="checkbox" model="myModel" field-id="optionTable2"></rx-form-option-table>';

        var checkScope = rootScope.$new();
        checkScope.myModel = [];

        var checkTable = helpers.createDirective(checkboxFormTemplate, compile, checkScope);

        var checkTableScope = checkTable.isolateScope();

        // nothing should be selected by default
        expect(checkTableScope.isSelected(0, 0), 'Item 1').to.be.false;
        expect(checkTableScope.isSelected(1, 1), 'Item 2').to.be.false;

        // select second item
        checkScope.myModel[1] = 1;
        checkScope.$digest();

        expect(checkTableScope.isSelected(0, 0), 'Item 1 still unselected').to.be.false;
        expect(checkTableScope.isSelected(1, 1), 'Item 2 now selected').to.be.true;

        // select first item
        checkScope.myModel[0] = 0;
        checkScope.$digest();

        expect(checkTableScope.isSelected(0, 0), 'Item 1 now selected').to.be.true;
        expect(checkTableScope.isSelected(1, 1), 'Item 2 still selected').to.be.true;
    });

    it('should correctly return the attribute from the passed object', function () {
        var column = { key: 'test' },
            data = { test: 'VALUE' };
        expect(elScope.getContent(column, data)).to.be.eq('VALUE');
    });

    it('should correctly interpolate expression and output nested properties from an object', function () {
        var column = { key: '{{ test.data }}' },
            data = { test: { data: 10 }};
        expect(elScope.getContent(column, data)).to.be.eq('10');
    });

    it('should correctly interpolate expression and apply the uppercase filter', function () {
        var column = { key: '{{ data | uppercase }}' },
            data = { data: 'lowercase' };
        expect(elScope.getContent(column, data)).to.be.eq('LOWERCASE');
    });

    it('should correctly interpolate expression and do the math inside it', function () {
        var column = { key: '{{ value * 10 }}' },
            data = { value: 100 };
        expect(elScope.getContent(column, data)).to.be.eq('1000');
    });

    it('should correctly interpolate expression and apply the currency filter to it', function () {
        var column = { key: '{{ amount | currency }}' },
            data = { amount: 12.5 };
        expect(elScope.getContent(column, data)).to.be.eq('$12.50');
    });
});
