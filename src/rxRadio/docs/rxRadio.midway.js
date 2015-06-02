var rxRadioPage = require('../rxRadio.page').rxRadio;
var exercise = require('../rxRadio.exercise');

describe('rxRadio', function () {
    var subject;

    before(function () {
        demoPage.go('/component/rxRadio');
    });

    describe('(State) NG-Disabled Selected', exercise.rxRadio({
        cssSelector: '#radOne',
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) NG-Disabled Unselected', exercise.rxRadio({
        cssSelector: '#radTwo',
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Disabled Selected', exercise.rxRadio({
        cssSelector: '#radSeven',
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Disabled Unselected', exercise.rxRadio({
        cssSelector: '#radEight',
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Selected', exercise.rxRadio({
        cssSelector: '#radThree',
        disabled: false,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Unselected', exercise.rxRadio({
        cssSelector: '#radFour',
        disabled: false,
        selected: false,
        valid: true
    }));

    describe('(State) Invalid Selected', exercise.rxRadio({
        cssSelector: '#radFive',
        disabled: false,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Unselected', exercise.rxRadio({
        cssSelector: '#radSix',
        disabled: false,
        selected: false,
        valid: false
    }));

    describe('Show/Hide Input', function () {
        var radHate, radLike, radLove;

        before(function () {
            radHate = rxRadioPage.initialize($('#radHateBacon'));
            radLike = rxRadioPage.initialize($('#radLikeBacon'));
            radLove = rxRadioPage.initialize($('#radLoveBacon'));
        });

        describe('"I hate bacon"', function () {
            before(function () {
                subject = radHate;
            });

            it('should be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"Actually, I LOVE bacon"', function () {
            before(function () {
                subject = radLove;
            });

            it('should not be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"I like bacon"', function () {
            before(function () {
                subject = radLike;
            });

            it('should be visible', function () {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', function () {
                expect(subject.isValid()).to.eventually.be.false;
            });

            describe('when selected', function () {
                before(function () {
                    subject.select();
                });

                it('should be valid', function () {
                    expect(subject.isValid()).to.eventually.be.true;
                });

                describe('"I hate bacon"', function () {
                    it('should be valid', function () {
                        expect(radHate.isValid()).to.eventually.be.true;
                    });
                });

                describe('"Actually, I LOVE bacon"', function () {
                    before(function () {
                        subject = radLove;
                    });

                    it('should be visible', function () {
                        expect(subject.isDisplayed()).to.eventually.be.true;
                    });

                    it('should be valid', function () {
                        expect(subject.isValid()).to.eventually.be.true;
                    });
                });
            });
        });
    });//Show/Hide Input

    describe('Destroy Input', function () {
        var radCreated, radDestroyed, radTargetCreated;

        before(function () {
            radCreated = rxRadioPage.initialize($('#radCreated'));
            radDestroyed = rxRadioPage.initialize($('#radDestroyed'));
            radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
        });

        it('"Destroyed" should be selected', function () {
            expect(radDestroyed.isSelected()).to.eventually.be.true;
        });

        it('"Created" should not be selected', function () {
            expect(radCreated.isSelected()).to.eventually.be.false;
        });

        it('target radio should not be present', function () {
            radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
            expect(radTargetCreated.isPresent()).to.eventually.be.false;
        });

        describe('when "Created" is selected', function () {
            before(function () {
                radCreated.select();
            });

            it('"Destroyed" should not be selected', function () {
                expect(radDestroyed.isSelected()).to.eventually.be.false;
            });

            it('target radio should be present', function () {
                radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.true;
            });
        });

        describe('when "Destroyed" is selected again', function () {
            before(function () {
                radDestroyed.select();
            });

            it('"Created" should not be selected', function () {
                expect(radCreated.isSelected()).to.eventually.be.false;
            });

            it('target radio should not be present', function () {
                radTargetCreated = rxRadioPage.initialize($('#radTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.false;
            });
        });
    });//Destroy Input
});
