/* jshint node: true */
describe('rxFormItem', function () {
    var el, scope, compile, rootScope,
        formInput = '<input type="text">',
        formItemTemplate = '<rx-form-item label="Name"><%= input %></rx-form-item>';

    var createDirective = function (inputTemplate) {
        var html = _.template(formItemTemplate, {
            input: inputTemplate
        });

        return helpers.createDirective(html, compile, scope);
    };

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('templates/rxFormItem.html');

        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = createDirective(formInput);
    });

    afterEach(function () {
        el = null;
    });

    it('should render template correctly', function () {
        expect(el).not.be.empty;
        expect(el.find('input')).not.be.empty;
        expect(el.find('label').text()).to.contain('Name');
    });

    it('should not put text-area-label class on the element', function () {
        expect(el.find('div').hasClass('text-area-label')).to.be.false;
    });

    it('should link label to form input using unique id', function () {
        var uniqueId = el.find('label').eq(0).attr('for');

        expect(uniqueId).to.have.length.above(0);
        expect(el.find('input').eq(0).attr('id')).to.equal(uniqueId);
    });

    it('should gracefully fail if no input added', function () {
        el = createDirective('Some non-input text');

        var uniqueId = el.find('label').eq(0).attr('for');

        expect(uniqueId).to.be.undefined;
    });

    it('should link label to form input using field id', function () {
        el = createDirective('<input id="myId">');

        var uniqueId = el.find('label').eq(0).attr('for');

        expect(uniqueId).to.equal('myId');
    });

    it('should link to label to select box', function () {
        el = createDirective('<select id="myId"></select>');

        var uniqueId = el.find('label').eq(0).attr('for');

        expect(uniqueId).to.equal('myId');
    });

    it('should link to first input if multiple found', function () {
        el = createDirective('<select></select><input id="myId">');

        var uniqueId = el.find('label').eq(0).attr('for');
        var selectId = el.find('select').eq(0).attr('id');

        expect(uniqueId).to.not.equal('myId');
        expect(uniqueId).to.equal(selectId);
    });

    describe('textarea special case', function () {
        var oldFormInput;

        beforeEach(function () {
            oldFormInput = formInput;
            formInput = '<textarea>';
            el = createDirective(formInput);
        });

        afterEach(function () {
            formInput = oldFormInput;
        });
        it('should put text-area-label class on the main div', function () {
            expect(el.find('div').hasClass('text-area-label')).to.be.true;
        });
    });
});

describe('rxFormUtils', function () {

    var rxFormUtilsSvc, rootScope, $document;

    var template;

    beforeEach(function () {
        module('encore.ui.rxForm');

        inject(function ($rootScope, _$document_, rxFormUtils) {
            rootScope = $rootScope;
            $document = _$document_;
            rxFormUtilsSvc = rxFormUtils;
        });

        template = $('<div id="tabSet1"><div class="tab-content"><div class="tab-pane">' +
                       '<rx-form-option-table id="table1" field-id="table1_fieldId">' +
                         '<div>' +
                           '<table><thead></thead><tbody>' +
                             '<tr class="ng-scope selected">' +
                               '<td><label><input value="table1_rowId1"></label></td>' +
                             '</tr>' +
                             '<tr class="ng-scope">' +
                               '<td><label><input value="table1_rowId2"></label></td>' +
                             '</tr>' +
                             '<tr><td><label><input value="table1_rowId3"></label></td></tr>' +
                           '</tbody></table>' +
                         '</div>' +
                       '</rx-form-option-table>' +
                     '</div></div></div>' +
                     '<div id="tabSet2"><div class="tab-content"><div class="tab-pane">' +
                       '<rx-form-option-table id="table2">' +
                         '<div>' +
                           '<table><thead></thead><tbody>' +
                             '<tr class="ng-scope selected">' +
                               '<td><label><input value="table2_rowId1"></label></td>' +
                             '</tr>' +
                             '<tr class="ng-scope selected">' +
                               '<td><label><input value="table2_rowId2"></label></td>' +
                             '</tr>' +
                             '<tr><td><label><input value="table2_rowId3"></label></td></tr>' +
                           '</tbody></table>' +
                         '</div>' +
                       '</rx-form-option-table>' +
                     '</div></div></div>');

        rootScope.$digest();
        $($document[0].body).append(template);
    });

    describe('getSelectedOptionForTable', function () {

        var selectedOption = { rowId: 'table1_rowId1' };

        it('returns the selected option for the table with id tableId', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTable('table1')).to.deep.equal(selectedOption);
        });

        it('returns undefined if no table is found with that id', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTable('notMyTable')).to.be.undefined;
        });

    });

    describe('getSelectedOptionForTabSet', function () {

        var selectedOption = { tableId: 'table1', fieldId: 'table1_fieldId', rowId: 'table1_rowId1' };

        it('returns the selected option for the tabset', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTabSet('tabSet1')).to.deep.equal(selectedOption);
        });

        it('returns undefined if no tabset is found with that id', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTabSet('notMyTabSet')).to.be.undefined;
        });

        it('returns the selected option without the field id if no field-id exists', function () {
            var selectedOptionNoFieldId = { tableId: 'table2', fieldId: null, rowId: 'table2_rowId1' };
            expect(rxFormUtilsSvc.getSelectedOptionForTabSet('tabSet2')).to.deep.equal(selectedOptionNoFieldId);
        });

    });

});
