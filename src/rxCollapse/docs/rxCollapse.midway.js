var exercise = require('../rxCollapse.exercise');

describe('rxCollapse', function () {

    before(function () {
        demoPage.go('#/component/rxCollapse');
    });

    describe('custom title', exercise.rxCollapse({
        cssSelector: '.demo-with-title',
        title: 'A Custom Title',
        expanded: true,
    }));

    describe('default title', exercise.rxCollapse({
        cssSelector: '.demo-no-title',
        expanded: false
    }));
});
