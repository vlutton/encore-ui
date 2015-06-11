
describe('rxToggleSwitch', function () {
    var rxToggleSwitch;

    before(function () {
        demoPage.go('#/components/rxToggleSwitch');
    });

    describe('defaults', encore.exercise.rxToggleSwitch({
        cssSelector: '.demo-default-values'
    }));

    describe('specific model values', encore.exercise.rxToggleSwitch({
        cssSelector: '.demo-model-values'
    }));

    describe('post hook', encore.exercise.rxToggleSwitch({
        cssSelector: '.demo-post-hook'
    }));

    describe('disabled', encore.exercise.rxToggleSwitch({
        cssSelector: '.demo-disabled',
        disabled: true
    }));

});
