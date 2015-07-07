/* jshint node: true */
describe('rxForm', function () {
    var el, scope, compile, rootScope, template;

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('templates/rxFormItem.html');
        module('templates/rxFieldName.html');
        //module('encore.ui.rxMisc');

        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('(deprecated directive) rxFormItem', function () {
        var sandbox;
        var formInput = '<input type="text">';

        var createDirective = function (inputTemplate) {
            var formItemTemplate = '<rx-form-item label="Name"><%= input %></rx-form-item>';
            var html = _.template(formItemTemplate)({
                input: inputTemplate
            });

            return helpers.createDirective(html, compile, scope);
        };//createDirective()

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            sandbox.stub(window.console, 'warn');

            el = createDirective(formInput);
        });

        afterEach(function () {
            sandbox.restore();
            el = null;
        });

        it('should emit deprecation warning in console', function () {
            template = '<rx-form-item></rx-form-item>';
            helpers.createDirective(template, compile, scope);

            expect(console.warn).to.be.calledOnce;
            expect(console.warn).to.be.calledWithMatch('DEPRECATION WARNING');
        });

        it('should render template correctly', function () {
            expect(el).to.not.be.empty;
            expect(el.find('input')).to.not.be.empty;
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

    describe('hierarchy validation', function () {
        var createDirective;
        beforeEach(function () {
            createDirective = function () {
                helpers.createDirective(template, compile, scope);
            };
        });

        describe('rx-form', function () {
            before(function () {
                template = '<form rx-form></form>';
            });

            it('should not throw error on creation', function () {
                expect(createDirective).to.not.throw(Error);
            });
        });//rx-form

        describe('rx-form-section', function () {
            describe('when nested within rx-form', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section></rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-form', function () {
                before(function () {
                    template = '<rx-form-section></rx-form-section>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-form-section

        describe('rx-field', function () {
            describe('when nested within rx-form-section', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field></rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-form-section', function () {
                before(function () {
                    template = '<rx-field></rx-field>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-field

        describe('rx-field-name', function () {
            describe('when nested within rx-field', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-name>Name</rx-field-name>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not throw error when created', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-field', function () {
                before(function () {
                    template = '<rx-field-name></rx-field-name>';
                });

                it('should throw error when created', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-field-name

        describe('rx-field-content', function () {
            describe('when nested within rx-field', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-content></rx-field-content>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-field', function () {
                before(function () {
                    template = '<rx-field-content></rx-field-content>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-field-content

        describe('rx-input', function () {
            describe('when nested within rx-field-content', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-content>' +
                                    '<rx-input></rx-input>' +
                                '</rx-field-content>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-field-content', function () {
                before(function () {
                    template = '<rx-input></rx-input>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-input

        describe('rx-prefix', function () {
            describe('when nested within rx-input', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-content>' +
                                    '<rx-input>' +
                                        '<rx-prefix>$</rx-prefix>' +
                                    '</rx-input>' +
                                '</rx-field-content>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-input', function () {
                beforeEach(function () {
                    template = '<rx-prefix></rx-prefix>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-prefix

        describe('rx-suffix', function () {
            describe('when nested within rx-input', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-content>' +
                                    '<rx-input>' +
                                        '<rx-suffix>million</rx-suffix>' +
                                    '</rx-input>' +
                                '</rx-field-content>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-input', function () {
                before(function () {
                    template = '<rx-suffix></rx-suffix>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });//rx-suffix
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
