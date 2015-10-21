/* jshint node: true */

describe('SelectFilter', function () {
    var filter;
    var scope, compile, rootScope, template;

    beforeEach(function () {
        module('encore.ui.rxSelectFilter');
        module('encore.ui.rxForm');
        module('templates/rxSelectFilter.html');
        module('templates/rxFieldName.html');
 
        inject(function (SelectFilter, $rootScope, $compile) {
            filter = SelectFilter.create({
                properties: ['status', 'type'],
                selected: {
                    status: ['ENABLED']
                }
            });
 
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });
    });
   
   describe('rxForm hierarchy validation', function () {
        var createDirective;

       before(function () {
            createDirective = function () {
                helpers.createDirective(template, compile, scope);
            };
           
        });

        describe('rx-select-filter', function () {
            describe('when nested within rx-form-section', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-select-filter></rx-select-filter>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-form-section', function () {
                before(function () {
                    template = '<rx-select-filter></rx-select-filter>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            }); 
        });//rx-select-filter
    });

    describe('.applyTo', function () {
        var result;
        var inputArray = [{
            status: 'DISABLED',
            type: 'COMPUTER'
        }, {
            status: 'ENABLED',
            type: 'SWITCH'
        }];

        beforeEach(function () {
            result = filter.applyTo(inputArray);
        });

        describe('first run', function () {

            it('initializes the list of available options', function () {
                expect(filter.available).to.eql({
                    type: ['COMPUTER', 'SWITCH'],
                    status: ['DISABLED', 'ENABLED']
                });
            });

            it('selects all options for properties without explicit selection', function () {
                expect(filter.selected).to.eql({
                    type: ['COMPUTER', 'SWITCH'],
                    status: ['ENABLED']
                });
            });

        });

        it('keeps items with properties that are all selected', function () {
            expect(result).to.eql(_.rest(inputArray));
        });

        it('removes items with properties that are not selected', function () {
            expect(filter.applyTo([{
                type: 'SWITCH',
                status: 'UNKNOWN'
            }])).to.eql([]);
        });
    });
});
