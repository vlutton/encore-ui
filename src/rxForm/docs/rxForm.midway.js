var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxForm = encore.rxForm;
var htmlCheckbox = encore.htmlCheckbox;
var htmlSelect = encore.htmlSelect;
var rxOptionTable = encore.rxOptionTable;

// shortens the process of selecting form elements on the page object below
var elementByLabel = function (label) {
    return $('rx-form-item[label="' + label + '"]');
};

// an anonymous page object to prove that form filling works
var formPageObject = Page.create({
    form: {
        set: function (formData) {
            rxForm.fill(this, formData);
        }
    },

    plainTextbox: rxForm.textField.generateAccessor($('#txtPlain')),

    requireName: htmlCheckbox.generateAccessor($('#chkNameRequired')),

    volumeTypeSelect: {
        get: function () {
            return Page.create({
                type: htmlSelect.generateAccessor($('#selVolumeType'))
            });
        }
    },

    radioTableObject: {
        get: function () {
            return rxOptionTable.initialize($('#radioOptionTable'));
        }
    },

    radioTable: rxOptionTable.generateAccessor($('#radioOptionTable')),

    checkboxTableObject: {
        get: function () {
            return rxOptionTable.initialize($('#checkboxOptionTable'));
        }
    },

    checkboxTable: rxOptionTable.generateAccessor($('#checkboxOptionTable'))
});

describe('rxForm', function () {
    before(function () {
        demoPage.go('#/component/rxForm');
    });

    describe('form filling', function () {
        var formData = {
            plainTextbox: 'This is a plain textbox',
            requireName: false,
            volumeTypeSelect: {
                type: 'PUNCHCARDS'
            },
            radioTable: [{ Name: 'Option #2' }],
            checkboxTable: [{ Name: 'Item 1' }, { Name: 'Item 2' }]
        };

        before(function () {
            formPageObject.form = formData;
        });

        it('should have filled the plainTextbox value', function () {
            expect(formPageObject.plainTextbox).to.eventually.equal('This is a plain textbox');
        });

        it('should have unchecked the requireName checkbox', function () {
            expect(formPageObject.requireName).to.eventually.be.false;
        });

        it('should have selected the volume type', function () {
            expect(formPageObject.volumeTypeSelect.type.text).to.eventually.equal('PUNCHCARDS');
        });

        it('should have selected the second row in the radio option table', function () {
            expect(formPageObject.radioTable).to.eventually.eql([1]);
        });

        it('should have selected both rows in the checkbox option table', function () {
            expect(formPageObject.checkboxTable).to.eventually.eql([0, 1]);
        });
    });
});
