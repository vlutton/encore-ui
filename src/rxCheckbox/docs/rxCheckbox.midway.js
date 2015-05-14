var rxCheckboxPage = require('../rxCheckbox.page').rxCheckbox;
var exercise = require('../rxCheckbox.exercise');

describe('rxCheckbox', function () {
    before(function () {
        demoPage.go('#/component/rxCheckbox');
    });

    describe('(State) NG-Disabled Checked', exercise.rxCheckbox({
        cssSelector: "#checkOne",
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) NG-Disabled Unchecked', exercise.rxCheckbox({
        cssSelector: "#checkTwo",
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Disabled Checked', exercise.rxCheckbox({
        cssSelector: "#checkSeven",
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Disabled Unchecked', exercise.rxCheckbox({
        cssSelector: "#checkEight",
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Checked', exercise.rxCheckbox({
        cssSelector: "#checkThree",
        disabled: false,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Unchecked', exercise.rxCheckbox({
        cssSelector: "#checkFour",
        disabled: false,
        selected: false,
        valid: true
    }));

    describe('(State) Invalid Checked', exercise.rxCheckbox({
        cssSelector: "#checkFive",
        disabled: false,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Unchecked', exercise.rxCheckbox({
        cssSelector: "#checkSix",
        disabled: false,
        selected: false,
        valid: false
    }));

    describe('Show/Hide Input', function () {
        var chkSure, chkReallySure;

        before(function () {
            chkSure = rxCheckboxPage.initialize($('#chkAmSure'));
            chkReallySure = rxCheckboxPage.initialize($('#chkAmReallySure'));
        });

        describe('"Are you sure?"', function () {
            it('should be displayed', function () {
                expect(chkSure.isDisplayed()).to.eventually.be.true;
            });

            describe('when checked', function () {
                before(function () {
                    chkSure.select();
                });

                it('should be valid', function () {
                    expect(chkSure.isValid()).to.eventually.be.true;
                });

                it('should show "Are you REALLY sure?"', function () {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.true;
                });
            });

            describe('when unchecked', function () {
                before(function () {
                    chkSure.deselect();
                });

                it('should not be valid', function () {
                    expect(chkSure.isValid()).to.eventually.be.false;
                });

                it('should not show "Are you REALLY sure?"', function () {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.false;
                });
            });
        });
    });

    describe('Destroy Input', function () {
        var chkRemove, chkRemoveable;

        before(function () {
            chkRemove = rxCheckboxPage.initialize($('#chkRemoveCheckbox'));
            chkRemoveable = rxCheckboxPage.initialize($('#chkRemoveable'));
        });

        describe('when checked', function () {
            before(function () {
                chkRemove.select();
            });

            describe('Static Checkbox', function () {
                it('should not exist', function () {
                    expect(chkRemoveable.isPresent()).to.eventually.be.false;
                });
            });
        });

        describe('when unchecked', function () {
            before(function () {
                chkRemove.deselect();
            });

            describe('Static Checkbox', function () {
                it('should exist', function () {
                    expect(chkRemoveable.isPresent()).to.eventually.be.true;
                });
            });
        });
    });
});
