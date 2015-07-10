
describe('rxCollapse', function () {

    before(function () {
        demoPage.go('#/component/rxCollapse');
    });

    describe('custom title', encore.exercise.rxCollapse({
        cssSelector: '.demo-with-title',
        title: 'A Custom Title',
        expanded: true,
    }));

    describe('default title', encore.exercise.rxCollapse({
        cssSelector: '.demo-no-title',
        expanded: false
    }));
});
