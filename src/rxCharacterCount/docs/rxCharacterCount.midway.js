
describe('rxCharacterCount', function () {

    before(function () {
        demoPage.go('#/components/rxCharacterCount');
    });

    describe('defaults', encore.exercise.rxCharacterCount({
        cssSelector: '.demo-default-values'
    }));

    describe('low max characters', encore.exercise.rxCharacterCount({
        cssSelector: '.demo-custom-max-characters',
        maxCharacters: 25
    }));

    describe('high near limit level', encore.exercise.rxCharacterCount({
        cssSelector: '.demo-custom-low-boundary',
        nearLimit: 250
    }));

    describe('count insignificant whitespace', encore.exercise.rxCharacterCount({
        cssSelector: '.demo-custom-do-not-trim',
        ignoreInsignificantWhitespace: false
    }));

    describe('initial value', encore.exercise.rxCharacterCount({
        cssSelector: '.demo-initial-value'
    }));

    describe('with highlighting', encore.exercise.rxCharacterCount({
        cssSelector: '.demo-highlighting',
        maxCharacters: 10,
        highlight: true
    }));

});
