var rxCharacterCountPage = require('../rxCharacterCount.page').rxCharacterCount;
var exercise = require('../rxCharacterCount.exercise');

describe('rxCharacterCount', function () {
    var rxCharacterCount;

    before(function () {
        demoPage.go('#/component/rxCharacterCount');
        rxCharacterCount = rxCharacterCountPage.initialize($('.demo-default-values'));
    });

    it('should show element', function () {
        expect(rxCharacterCount.isDisplayed()).to.eventually.be.true;
    });

    it('should have the right default remaining characters', function () {
        expect(rxCharacterCount.remaining).to.eventually.equal('254');
    });

    it('should update the remaining when you insert text', function () {
        rxCharacterCount.comment = 'Foo';
        expect(rxCharacterCount.remaining).to.eventually.equal('251');
    });

    it('should erase all text and replace it with new text on update', function () {
        rxCharacterCount.comment = 'Bar';
        expect(rxCharacterCount.comment).to.eventually.equal('Bar');
    });

    it('should not set the near-limit class on an empty text box', function () {
        expect(rxCharacterCount.isNearLimit()).to.eventually.be.false;
    });

    it('should not set the over-limit class on an empty text box', function () {
        expect(rxCharacterCount.isOverLimit()).to.eventually.be.false;
    });

    it('should set the near-limit class when 250 characters entered', function () {
        rxCharacterCount.comment = Array(251).join('a');
        expect(rxCharacterCount.isNearLimit()).to.eventually.be.true;
    });

    it('should set the over-limit class when 255 characters entered', function () {
        rxCharacterCount.comment = Array(256).join('a');
        expect(rxCharacterCount.isOverLimit()).to.eventually.be.true;
    });

    describe('custom max-characters', function () {
        beforeEach(function () {
            rxCharacterCount = rxCharacterCountPage.initialize($('.demo-custom-max-characters'));
        });

        it('should have 25 remaining characters', function () {
            expect(rxCharacterCount.remaining).to.eventually.equal('25');
        });
    });

    describe('custom low-boundary', function () {
        beforeEach(function () {
            rxCharacterCount = rxCharacterCountPage.initialize($('.demo-custom-low-boundary'));
        });

        it('should set the near-limit class when we enter 5 characters', function () {
            rxCharacterCount.comment = Array(6).join('a');
            expect(rxCharacterCount.isNearLimit()).to.eventually.be.true;
        });
    });

    describe('exercises', exercise.rxCharacterCount());

});
