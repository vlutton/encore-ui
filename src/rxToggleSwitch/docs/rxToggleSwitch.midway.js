describe('rxToggleSwitch', function () {
    var rxToggleSwitch;

    before(function () {
        demoPage.go('#/components/rxToggleSwitch');
    });

    describe('defaults', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-default-values'))
    }));

    describe('specific model values', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-model-values'))
    }));

    describe('post hook', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-post-hook'))
    }));

    describe('disabled', encore.exercise.rxToggleSwitch({
        cssSelector: '.demo-disabled',
        disabled: true
    }));

});
