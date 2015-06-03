var rxFieldNamePage = require('../rxFieldName.page').rxFieldName;
var rxCheckboxPage = require('../../rxCheckbox/rxCheckbox.page').rxCheckbox;
var exercise = require('../rxFieldName.exercise');

describe('rxFieldName', function () {
    var subject;

    before(function () {
        demoPage.go('#/component/rxFieldName');
    });

    describe('(State) Required', exercise.rxFieldName({
        cssSelector: '#eleFieldNameStateRequired',
        visible: true,
        required: true
    }));

    describe('(State) Optional', exercise.rxFieldName({
        cssSelector: '#eleFieldNameStateOptional',
        visible: true,
        required: false
    }));

    describe('Example', function () {
        var checkbox;

        before(function () {
            checkbox = rxCheckboxPage.initialize($('#chkFieldRequired'));
            subject = rxFieldNamePage.initialize($('#eleFieldName'));
        });

        describe('when checkbox checked', function () {
            before(function () {
                checkbox.select();
            });

            it('symbol should be visible', function () {
                expect(subject.isSymbolVisible()).to.eventually.be.true;
            });
        });

        describe('when checkbox unchecked', function () {
            before(function () {
                checkbox.deselect();
            });

            it('symbol should not be visible', function () {
                expect(subject.isSymbolVisible()).to.eventually.be.false;
            });
        });
    });
});
