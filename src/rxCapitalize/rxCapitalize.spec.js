/* jshint node: true */

describe('rxCapitalize', function () {
    var capitalize;

    beforeEach(function () {
        module('encore.ui.rxCapitalize');

        inject(function ($filter) {
            capitalize = $filter('rxCapitalize');
        });
    });

    it('should capitalize just the first letter of the sentence', function () {
        var sentence = 'steve holt';

        expect(capitalize(sentence)).to.equal('Steve holt');
    });
});