var exercise = require('../rxBulkSelect.exercise');

describe('rxBulkSelect', function () {

    before(function () {
        demoPage.go('#/component/rxBulkSelect');
    });

    describe('exercises', exercise.rxBulkSelect());

});
