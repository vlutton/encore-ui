var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxForm = require('../rxForm.page.js').rxForm;
var rxOptionFormTable = require('../rxForm.page.js').rxOptionFormTable;

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
            enable ? checkbox.select() : checkbox.unselect();
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
    },

    optRadioTable: {
        get: function () {
            return rxOptionFormTable.initialize($('rx-form-option-table[data="optionTableData"]'));
        }
    },

    optionTableRadio: {
        get: function () {
            return this.optRadioTable.selections;
        },
        set: function (selections) {
            this.optRadioTable.selectMany(selections);
        }
    },

    optCheckboxTable: {
        get: function () {
            return rxOptionFormTable.initialize($('rx-form-option-table[data="optionTableCheckboxData"]'));
        }
    },

    optionTableCheckbox: {
        get: function () {
            return this.optCheckboxTable.selections;
        },
        set: function (selections) {
            this.optCheckboxTable.unselectAll();
            this.optCheckboxTable.selectMany(selections);
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
            },
            optionTableRadio: [{ Name: 'Option #2' }],
            optionTableCheckbox: [{ Name: 'Item 1' }, { Name: 'Item 2' }]
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

        it('should have selected the second row in the radio option table', function () {
            expect(formPageObject.optionTableRadio).to.eventually.eql([1]);
        });

        it('should have selected both rows in the checkbox option table', function () {
            expect(formPageObject.optionTableCheckbox).to.eventually.eql([0, 1]);
        });

    });

    describe('rxOptionTable', function () {
        var optionTable;

        describe('radio', function () {
            var columnNames = ['Name', 'Static Content', 'Expression 2', 'Expression 3', 'Expression 4'];

            before(function () {
                optionTable = rxOptionFormTable.initialize($('rx-form-option-table[data="optionTableData"]'));
            });

            it('should not be empty', function () {
                expect(optionTable.isEmpty()).to.eventually.be.false;
            });

            it('should not have a "table empty" error message', function () {
                expect(optionTable.emptyMessage).to.eventually.be.null;
            });

            it('should have all column names', function () {
                expect(optionTable.columnNames).to.eventually.eql(columnNames);
            });

            it('should return column data as text by default', function () {
                var textData = ['$0.00', '$1.00', '$2.00'];
                expect(optionTable.columnData('Expression 4')).to.eventually.eql(textData);
            });

            it('should return column data as defined by a custom function', function () {
                var penniesData = [0, 100, 200];
                var penniesFn = function (cellElements) {
                    return cellElements.map(function (cellElement) {
                        return cellElement.getText().then(rxForm.currencyToPennies);
                    });
                };

                expect(optionTable.columnData('Expression 4', penniesFn)).to.eventually.eql(penniesData);
            });

            it('should select a column by text', function () {
                optionTable.selectByColumnText('Expression 4', '$2.00');
                expect(optionTable.selections).to.eventually.eql([2]);
            });

            describe('rows', function () {
                var row;
                var cellData = ['Option #3', 'Some Text & HTML', '200.00', 'NESTED NAME 3', '$2.00'];
                var rowData = _.zipObject(columnNames, cellData);

                before(function () {
                    row = optionTable.selectedRow;
                });

                it('should be selected', function () {
                    expect(row.isSelected()).to.eventually.be.true;
                });

                it('should not be the current saved data', function () {
                    expect(row.isCurrent()).to.eventually.be.false;
                });

                it('should have the current saved data in the first row', function () {
                    expect(optionTable.row(0).isCurrent()).to.eventually.be.true;
                });

                _.forEach(rowData, function (data, column) {
                    it('should have the correct data in the ' + column + ' column', function () {
                        expect(row.cell(column)).to.eventually.equal(data);
                    });
                });

            });

        });

        describe('checkbox', function () {

            before(function () {
                optionTable = rxOptionFormTable.initialize($('rx-form-option-table[data="optionTableCheckboxData"]'));
            });

            it('should have two rows selected', function () {
                expect(optionTable.selections).to.eventually.eql([0, 1]);
            });

            it('should unselect all rows', function () {
                optionTable.unselectAll();
                expect(optionTable.selections).to.eventually.be.empty;
            });

            it('should select many rows', function () {
                optionTable.selectMany([{ Name: 'Item 1' }, { Name: 'Item 2' }]);
                expect(optionTable.selections).to.eventually.eql([0, 1]);
            });

            it('should unselect many rows', function () {
                optionTable.unselectMany([{ Name: 'Item 1' }, { Name: 'Item 2' }]);
                expect(optionTable.selections).to.eventually.be.empty;
            });

        });

        describe('empty', function () {

            before(function () {
                optionTable = rxOptionFormTable.initialize($('rx-form-option-table[data="optionTableEmptyData"]'));
            });

            it('should be empty', function () {
                expect(optionTable.isEmpty()).to.eventually.be.true;
            });

            it('should have a "table empty" error message', function () {
                expect(optionTable.emptyMessage).to.eventually.equal('You don\'t have any data!');
            });

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
            expect(dropdown.options).to.eventually.eql(options);
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

            it('should lose precision when converting a fraction of a penny to an int', function () {
                expect(pennies('$0.019')).to.equal(1);
            });

            it('should ignore any dollar type indicators (CAN, AUS, USD)', function () {
                expect(pennies('$100 CAN')).to.equal(10000);
            });

            it('should convert negative currency notation to a negative integer', function () {
                expect(pennies('($100 AUS)')).to.equal(-10000);
            });

            it('should lose precision when converting negative fractions of a penny to an int', function () {
                expect(pennies('($1.011)')).to.equal(-101);
            });

            it('should not incur any binary rounding errors', function () {
                expect(pennies('$1.10')).to.equal(110);
            });

        });

    });

});
