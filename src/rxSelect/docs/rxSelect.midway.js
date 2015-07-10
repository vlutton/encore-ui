var rxSelect = encore.rxSelect;
var htmlCheckbox = encore.htmlCheckbox;
var htmlRadio = encore.htmlRadio;

describe('rxSelect', function () {
    var subject;

    before(function () {
        demoPage.go('#/components/rxSelect');
    });

    describe('(State) Valid Enabled', encore.exercise.rxSelect({
        cssSelector: '#selValidEnabled',
        disabled: false,
        visible: true,
        valid: true
    }));

    describe('(State) Valid NG-Disabled', encore.exercise.rxSelect({
        cssSelector: '#selValidNgDisabled',
        disabled: true,
        visible: true,
        valid: true
    }));

    describe('(State) Valid Disabled', encore.exercise.rxSelect({
        cssSelector: '#selValidDisabled',
        disabled: true,
        visible: true,
        valid: true
    }));

    describe('(State) Invalid Enabled', encore.exercise.rxSelect({
        cssSelector: '#selInvalidEnabled',
        disabled: false,
        visible: true,
        valid: false
    }));

    describe('(State) Invalid NG-Disabled', encore.exercise.rxSelect({
        cssSelector: '#selInvalidNgDisabled',
        disabled: true,
        visible: true,
        valid: false
    }));

    describe('(State) Invalid Disabled', encore.exercise.rxSelect({
        cssSelector: '#selInvalidDisabled',
        disabled: true,
        visible: true,
        valid: false
    }));

    describe('How do you like your bacon?', function () {
        before(function () {
            subject = rxSelect.initialize($('#selBaconPrep'));
        });

        it('should be invalid', function () {
            expect(subject.isValid()).to.eventually.be.false;
        });

        it('should have 5 options', function () {
            expect(subject.optionCount()).to.eventually.equal(5);
        });

        it('should contain desired option', function () {
            expect(subject.optionExists('Thick (borderline jerky)')).to.eventually.be.true;
        });

        it('should not contain undesired option', function () {
            expect(subject.optionExists('no preference')).to.eventually.be.false;
        });

        it('should not report a different option as selected', function () {
            expect(subject.option('Thick (borderline jerky)').isSelected()).to.eventually.be.false
        });

        it('should have expected options', function () {
            var opts = [
                'I do not like bacon',
                'Thin (light and crispy)',
                'Medium (perfect balance of flavor)',
                'Thick (borderline jerky)',
                'Crumbled (great on salads)',
            ];
            expect(subject.options).to.eventually.eql(opts);
        });

        it('should have expected values', function () {
            var vals = [ '', 'thin', 'medium', 'thick', 'crumbled' ];
            expect(subject.values).to.eventually.eql(vals);
        });

        it('should have a selected option by default', function () {
            /* redundant test, but moved from rxForm.midway.js */
            expect(subject.selectedOption.isSelected()).to.eventually.be.true;
        });

        describe('selecting "Thin (light and crispy)"', function () {
            var txt = 'Thin (light and crispy)';
            var val = 'thin';

            beforeEach(function () {
                subject.select(txt);
            });

            afterEach(function () {
                subject.select('I do not like bacon');
            });

            it('should be valid', function () {
                expect(subject.isValid()).to.eventually.be.true;
            });

            it('should display correct text', function () {
                expect(subject.selectedOption.text).to.eventually.eq(txt);
            });

            it('should have correct value', function () {
                expect(subject.selectedOption.value).to.eventually.eq(val);
            });
        });

        describe('Selecting "I do not like bacon"', function () {
            before(function () {
                subject.select('I do not like bacon');
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });
    });

    describe('Show/Hide Select', function () {
        var checkbox;

        before(function () {
            checkbox = htmlCheckbox.initialize($('#chkShow'));
            subject = rxSelect.initialize($('#selTargetShow'));
        });

        describe('when checkbox checked', function () {
            before(function () {
                checkbox.select();
            });

            it('should be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });
        });

        describe('when checkbox unchecked', function () {
            before(function () {
                checkbox.deselect();
            });

            it('should not be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });
        });
    });

    describe('Destroy Select', function () {
        var radDestroyed, radCreated;

        before(function () {
            radDestroyed = htmlRadio.initialize($('#radDestroyed'));
            radCreated = htmlRadio.initialize($('#radCreated'));
            subject = rxSelect.initialize($('#selTargetCreated'));
        });

        describe('when created', function () {
            before(function () {
                radCreated.select();
            });

            it('should be present', function () {
                expect(subject.isPresent()).to.eventually.be.true;
            });
        });

        describe('when destroyed', function () {
            before(function () {
                radDestroyed.select();
            });

            it('should not be present', function () {
                expect(subject.isPresent()).to.eventually.be.false;
            });
        });
    });
});
