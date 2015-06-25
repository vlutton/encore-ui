var _ = require('lodash');
var Page = require('astrolabe').Page;

// shortens the process of selecting form elements on the page object below
var elementByLabel = function (label) {
    return $('rx-form-item[label="' + label + '"]');
};

// an anonymous page object to prove that form filling works
var formPageObject = Page.create({
    form: {
        set: function (formData) {
            encore.rxForm.form.fill(this, formData);
        }
    },

    plainTextbox: encore.rxForm.textField.generateAccessor($('#txtPlain')),

    requireName: encore.rxForm.checkbox.generateAccessor($('#chkNameRequired')),

    options: {
        get: function () {
            return Page.create({
                first: encore.rxForm.radioButton.generateAccessor($('#first-option')),
                second: encore.rxForm.radioButton.generateAccessor($('#second-option'))
            });
        }
    },

    volumeTypeSelect: {
        get: function () {
            return Page.create({
                type: encore.rxForm.dropdown.generateAccessor($('#selVolumeType'))
            });
        }
    }

});

describe('rxForm', function () {
    before(function () {
        demoPage.go('#/component/rxForm');
    });

    describe('form filling', function () {
        var formData = {
            plainTextbox: 'This is a plain textbox',
            requireName: false,
            options: {
                first: true,
                second: false
            },
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

        it('should have selected the first radio option', function () {
            expect(formPageObject.options.first).to.eventually.be.true;
        });

        it('should not have selected the second radio option', function () {
            expect(formPageObject.options.second).to.eventually.be.false;
        });

        it('should have selected the volume type', function () {
            expect(formPageObject.volumeTypeSelect.type.text).to.eventually.equal('PUNCHCARDS');
        });

    });
});
