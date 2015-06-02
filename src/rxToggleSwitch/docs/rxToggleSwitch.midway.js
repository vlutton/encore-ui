var exercise = require('../rxToggleSwitch.exercise');

describe('rxToggleSwitch', function () {
    var rxToggleSwitch;

    before(function () {
        demoPage.go('/component/rxToggleSwitch');
    });

    describe('defaults', exercise.rxToggleSwitch({
        cssSelector: '.demo-default-values'
    }));

    describe('specific model values', exercise.rxToggleSwitch({
        cssSelector: '.demo-model-values'
    }));

    describe('post hook', exercise.rxToggleSwitch({
        cssSelector: '.demo-post-hook'
    }));

    describe('disabled', exercise.rxToggleSwitch({
        cssSelector: '.demo-disabled',
        disabled: true
    }));

});
