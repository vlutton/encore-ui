var _ = require('lodash');
var Page = require('astrolabe').Page;

// "wait" for autosave to clear -- function passed to `browser.wait`
var forAutoSaveToClear = function () {
    return encore.rxNotify.all.exists('rxAutoSave data has been cleared!');
};

// anonymous page object
var autoSaving = Page.create({
    form: {
        set: function (formData) {
            encore.rxForm.fill(this, formData);
        }
    },

    checkbox: encore.rxForm.checkbox.generateAccessor(element(by.model('formData.checkbox'))),

    name: encore.rxForm.textField.generateAccessor(element(by.model('formData.name'))),

    description: encore.rxForm.textField.generateAccessor(element(by.model('formData.description'))),

    sensitiveData: encore.rxForm.textField.generateAccessor(element(by.model('formData.sensitive'))),

    clearAutoSave: {
        value: function () {
            element(by.buttonText('Clear rxAutoSave')).click();
            browser.wait(forAutoSaveToClear);
        }
    },

    clearAutoSaveWithPromise: {
        value: function () {
            element(by.buttonText('Clear rxAutoSave by resolving a promise')).click();
            browser.wait(forAutoSaveToClear);
        }
    }
});

describe('rxMisc', function () {
    before(function () {
        demoPage.go('#/components/rxMisc');
    });

    describe('rxAutoSave', function () {
        var autoSavedData = {
            checkbox: true,
            name: 'Canadian Armed Forces',
            description: ['Using snow as cover, leap from your hiding spot to',
                          'surprise your enemy in a display of tactical brilliance.',
                          'In order to prevent your outfit from soaking',
                          '(later risking hypothermia) you must wear the least',
                          'amount of clothes possible to stay dry through the night.'].join(' '),
            sensitiveData: 'Only Jay Parlar knows where the Candian Armed Forces lie in wait!'
        };

        var leavePage = function () {
            demoPage.go('#/components/rxPaginate');
            demoPage.go('#/components/rxMisc');
        };

        before(function () {
            autoSaving.form = autoSavedData;
            leavePage();
        });

        _.forEach(autoSavedData, function (data, property) {
            it('should remember the form data for ' + property, function () {
                if (property === 'sensitiveData') {
                    expect(autoSaving[property]).to.eventually.equal('');
                } else {
                    expect(autoSaving[property]).to.eventually.equal(data);
                }
            });
        });

        describe('should clear auto saved data', function () {

            before(function () {
                autoSaving.clearAutoSave();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), function (property) {
                it('should not remember the form data for ' + property, function () {
                    expect(autoSaving[property]).to.eventually.be.not.ok;
                });
            });

        });

        describe('should clear auto saved data with a promise', function () {

            before(function () {
                autoSaving.form = autoSavedData;
                autoSaving.clearAutoSaveWithPromise();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), function (property) {
                it('should not remember the form data for ' + property, function () {
                    expect(autoSaving[property]).to.eventually.be.not.ok;
                });
            });

        });
    });

    describe('convenience functions', function () {
        var fn;

        describe('currencyToPennies', function () {
            fn = encore.rxMisc.currencyToPennies;

            it('should convert a single penny to the integer one', function () {
                expect(fn('$0.01')).to.equal(1);
            });

            it('should lose precision when converting a fraction of a penny to an int', function () {
                expect(fn('$0.019')).to.equal(1);
            });

            it('should ignore any dollar type indicators (CAN, AUS, USD)', function () {
                expect(fn('$100 CAN')).to.equal(10000);
            });

            it('should convert negative currency notation to a negative integer', function () {
                expect(fn('($100 AUS)')).to.equal(-10000);
            });

            it('should lose precision when converting negative fractions of a penny to an int', function () {
                expect(fn('($1.011)')).to.equal(-101);
            });

            it('should not incur any binary rounding errors', function () {
                expect(fn('$1.10')).to.equal(110);
            });
        });

        describe('unless', function () {
            var unless;
            var elem;
            var message;

            before(function () {
                autoSaving.form = {
                    checkbox: false,
                    name: '',
                    description: '',
                    sensitiveData: ''
                };
                message = 'I am possibly not un-authorizing the above: true';
                unless = encore.rxMisc.unless;
                elem = element(by.binding('formData.checkbox'));
                encore.rxMisc.nullValueMatches.push(message);
            });

            it('should return `null` for non-present elements', function () {
                expect(unless(elem)).to.eventually.be.null;
            });

            it('should return a custom fallback value for non-present elements', function () {
                expect(unless(elem, function () {}, false)).to.eventually.be.false;
            });

            it('should return `null` for present elements that match null value text', function () {
                autoSaving.checkbox = true;
                expect(unless(elem)).to.eventually.be.null;
            });

            it('should return the text when an element does not match any null value text', function () {
                encore.rxMisc.nullValueMatches.length = 0;
                expect(unless(elem)).to.eventually.equal(message);
            });

            it('should return the result of a custom function', function () {
                var reverseIt = function (elem) {
                    return elem.getText().then(function (text) {
                        return text.split('').reverse().join('');
                    });
                };
                expect(unless(elem, reverseIt)).to.eventually.equal(message.split('').reverse().join(''));
            });

            it('should return null for elements that are not displayed', function () {
                element(by.cssContainingText('a', 'Hide this message')).click();
                expect(unless(elem)).to.eventually.be.null;
            });

            it('should return a custom fallback value for non-displayed elements', function () {
                expect(unless(elem, function () {}, false)).to.eventually.be.false;
            });

        });

        describe('newDate', function () {
            var date;

            before(function () {
                demoPage.go('#/components/rxMetadata');
                var transformFns = {
                    'Date Field': function (elem) {
                        return elem.getText().then(encore.rxMisc.newDate);
                    }
                };

                encore.rxMetadata.initialize('rx-metadata', transformFns).term('Date Field').then(function (dateField) {
                    date = dateField;
                });
            });

            it('should parse a date', function () {
                expect(date instanceof Date).to.be.true;
            });

            it('should match the date exactly', function () {
                var explicitDate = new Date('January 6, 1989 @ 00:00 (UTC-0600)');
                expect(date.valueOf()).to.equal(explicitDate.valueOf());
            });

        });

        describe('timings', function () {
            var metrics;
            var commonProperties = [ // present in both Chrome and Firefox
                'appcacheTime',
                'connectTime',
                'domReadyTime',
                'firstPaint',
                'initDomTreeTime',
                'loadEventTime',
                'loadTime',
                'lookupDomainTime',
                'readyStart',
                'redirectTime',
                'requestTime',
                'unloadEventTime'
            ];

            it('should report some timings', function () {
                expect(encore.rxMisc.getPerformanceMetrics()).to.eventually.not.be.empty;
            });

            it('should report a time for page load time', function () {
                encore.rxMisc.getPerformanceMetrics().then(function (performanceMetrics) {
                    metrics = performanceMetrics;
                    expect(Object.keys(metrics).sort()).to.eql(commonProperties);
                });
            });

            it('should update the metrics on page change', function () {
                demoPage.go('#/components/rxAge');
                expect(encore.rxMisc.getPerformanceMetrics()).to.eventually.not.eql(metrics);
            });

            it('should not update the metrics when a request is made without a refresh', function () {
                demoPage.go('#/components/rxMisc');
                encore.rxMisc.getPerformanceMetrics().then(function (performanceMetrics) {
                    metrics = performanceMetrics;
                    element(by.buttonText('Clear rxAutoSave by resolving a promise')).click();
                    browser.wait(function () {
                        return encore.rxNotify.all.exists('rxAutoSave data has been cleared!', 'success');
                    }, 5000, 'rxAutoSave notification did not appear!');
                    expect(encore.rxMisc.getPerformanceMetrics()).to.eventually.eql(metrics);
                });
            });

            it('should get just one property at a time', function () {
                expect(encore.rxMisc.getPerformanceMetrics('loadTime')).to.eventually.be.above(0);
            });

            it('should get more than one property at a time', function () {
                var keys = ['loadTime', 'redirectTime'];
                expect(encore.rxMisc.getPerformanceMetrics(keys)).to.eventually.include.keys(keys);
            });

        });
    });
});
