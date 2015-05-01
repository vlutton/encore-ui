var rxSelect = require('../rxSelect.page').rxSelect;
var htmlCheckbox = require('../../rxCheckbox/rxCheckbox.page').htmlCheckbox;
var htmlRadio = require('../../rxRadio/rxRadio.page').htmlRadio;

var exercise = require('../rxSelect.exercise');

describe('rxSelect', function () {
    var subject;

    before(function () {
        demoPage.go('#/component/rxSelect');
    });

    describe('(State) NG-Disabled', exercise.rxSelect({
        cssSelector: '#selOne',
        disabled: true,
        visible: true,
        valid: true
    }));

    describe('(State) Disabled', exercise.rxSelect({
        cssSelector: '#selTwo',
        disabled: true,
        visible: true,
        valid: true
    }));

    describe('(State) Valid', exercise.rxSelect({
        cssSelector: '#selThree',
        disabled: false,
        visible: true,
        valid: true
    }));

    describe('(State) Invalid', exercise.rxSelect({
        cssSelector: '#selFour',
        disabled: false,
        visible: true,
        valid: false
    }));

    describe('With Validation', function () {
        before(function () {
            subject = rxSelect.initialize($('#selBaconPrep'));
        });

        it('should not be valid', function () {
            expect(subject.isValid()).to.eventually.be.false;
        });

        describe('Selecting "Thick (borderline jerky)"', function () {
            before(function () {
                subject.selectOption('Thick (borderline jerky)');
            });

            it('should be valid', function () {
                expect(subject.isValid()).to.eventually.be.true;
            });
        });

        describe('Selecting "I do not like bacon"', function () {
            before(function () {
                subject.selectOption('I do not like bacon');
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
