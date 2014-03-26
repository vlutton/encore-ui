/* jshint node: true */

describe('encore.ui.configs', function () {
    var dp;

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.configs');

        // Inject in angular constructs
        inject(function (devicePaths) {
            dp = devicePaths;
        });
    });

    it('should exist', function () {
        expect(dp).to.exist;
    });
});