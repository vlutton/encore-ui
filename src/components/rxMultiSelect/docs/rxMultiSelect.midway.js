describe('rxMultiSelect', function () {
    before(function () {
        demoPage.go('#/components/rxMultiSelect');
    });

    describe('exercises', encore.exercise.rxMultiSelect({
        instance: encore.rxMultiSelect.initialize($('#classification')),
        inputs: ['Type A', 'Type B', 'Type C', 'Type D']
    }));

});
