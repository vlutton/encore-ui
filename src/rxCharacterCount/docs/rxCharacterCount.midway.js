var exercise = require('../rxCharacterCount.exercise');

describe('rxCharacterCount', function () {

    before(function () {
        demoPage.go('#/component/rxCharacterCount');
    });

    describe('defaults', exercise.rxCharacterCount({
        cssSelector: '.demo-default-values'
    }));

    describe('low max characters', exercise.rxCharacterCount({
        cssSelector: '.demo-custom-max-characters',
        maxCharacters: 25
    }));

    describe('high near limit level', exercise.rxCharacterCount({
        cssSelector: '.demo-custom-low-boundary',
        nearLimit: 250
    }));

    describe('count insignificant whitespace', exercise.rxCharacterCount({
        cssSelector: '.demo-custom-do-not-trim',
        ignoreInsignificantWhitespace: false
    }));

    describe('initial value', exercise.rxCharacterCount({
        cssSelector: '.demo-initial-value'
    }));

});
