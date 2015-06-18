var exercise = require('../rxCollapse.exercise');

describe('rxCollapse', function () {
    var rxCollapse;

    before(function () {
        demoPage.go('#/component/rxCollapse');
    });

    describe('custom title', exercise.rxCollapse({
        cssSelector: '.demo-with-title',
        hasTitle: true,
        expanded: true,
    }));

    describe('default title', exercise.rxCollapse({
        cssSelector: '.demo-no-title',
        hasTitle: false,
        expanded: false
    }));
});
