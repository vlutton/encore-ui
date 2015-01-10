var Page = require('astrolabe').Page;

var rxForm = require('../rxForm.page.js').rxForm;

// shortens the process of selecting form elements on the page object below
var elementByLabel = function (label) {
    return $('rx-form-item[label="' + label + '"]');
};

// an anonymous page object to prove that form filling works
var formPageObject = Page.create({

    form: {
        set: function (formData) {
            rxForm.form.fill(this, formData);
        }
    },

    txtPlainTextbox: {
        get: function () {
            return elementByLabel('Plain textbox').$('input');
        }
    },

    plainTextbox: {
        get: function () {
            return this.txtPlainTextbox.getAttribute('value');
        },
        set: function (input) {
            this.txtPlainTextbox.clear();
            this.txtPlainTextbox.sendKeys(input);
        }
    },

    chkRequireName: {
        get: function () {
            return elementByLabel('Require Name?').$('input');
        }
    },

    requireName: {
        get: function () {
            return this.chkRequireName.isSelected();
        },
        set: function (enable) {
            var checkbox = rxForm.checkbox.initialize(this.chkRequireName);
            enable ? checkbox.check() : checkbox.uncheck();
        }
    },

    selectBoxes: {
        get: function () {
            return Page.create({
                selVolumes: {
                    get: function () {
                        return element(by.model('volume.type'));
                    }
                },

                type: {
                    get: function () {
                        return rxForm.dropdown.initialize(this.selVolumes).selectedOption;
                    },
                    set: function (optionText) {
                        rxForm.dropdown.initialize(this.selVolumes).select(optionText);
                    }
                }
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
            selectBoxes: {
                type: 'PUNCHCARDS'
            }
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
            expect(formPageObject.selectBoxes.type.text).to.eventually.equal('PUNCHCARDS');
        });

    });

    describe('dropdown', function () {
        var dropdown;

        before(function () {
            dropdown = rxForm.dropdown.initialize(element(by.model('volume.type')));
        });

        it('should have the right number of options', function () {
            expect(dropdown.optionCount()).to.eventually.equal(11);
        });

        it('should have every option listed', function () {
            var options = ['SATA', 'SSD', 'CD', 'DVD', 'BLURAY', 'TAPE', 'FLOPPY',
                           'LASERDISC', 'JAZDRIVE', 'PUNCHCARDS', 'RNA'];
            dropdown.allOptions.then(function (allOptions) {
                expect(Object.keys(allOptions)).to.eql(options);
            });
        });

        it('should have a selected option by default', function () {
            expect(dropdown.selectedOption.isSelected()).to.eventually.be.true;
        });

        it('should not report a different option as selected', function () {
            expect(dropdown.option('CD').isSelected()).to.eventually.be.false;
        });

        it('should report non-existing options', function () {
            expect(dropdown.optionExists('DDR4')).to.eventually.be.false;
        });

        it('should report existing options', function () {
            expect(dropdown.optionExists('PUNCHCARD')).to.eventually.be.true;
        });

        it('should select a new option', function () {
            dropdown.select('DVD');
            expect(dropdown.selectedOption.text).to.eventually.equal('DVD');
        });

        it('should have a value', function () {
            expect(dropdown.selectedOption.value).to.eventually.equal('DVD');
        });

    });

    describe('convenience functions', function () {

        describe('currency to pennies', function () {
            var pennies = rxForm.currencyToPennies;

            it('should convert a single penny to the integer one', function () {
                expect(pennies('$0.01')).to.equal(1);
            });

            it('should convert a fraction of a penny to a float', function () {
                expect(pennies('$0.001')).to.equal(0.1);
            });

            it('should ignore any dollar type indicators (CAN, AUS, USD)', function () {
                expect(pennies('$100 CAN')).to.equal(10000);
            });

            it('should convert negative currency notation to a negative integer', function () {
                expect(pennies('($100 AUS)')).to.equal(-10000);
            });

            it('should convert negative currency notation to a negative float', function () {
                expect(pennies('($0.001)')).to.equal(-0.1);
            });

        });

    });

});
