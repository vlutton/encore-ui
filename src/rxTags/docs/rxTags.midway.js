describe('rxTags', function () {

    before(function () {
        demoPage.go('#/component/rxTags');
    });

    describe('exercises', encore.exercise.rxTags({
        instance: encore.rxTags.initialize($('#standard-tags')),
        sampleText: 'orange'
    }));

});
