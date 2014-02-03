/* jshint node: true */

describe('encore.ui.configs', function () {
    var routes, dp;

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.configs');

        // Inject in angular constructs
        inject(function (ROUTE_PATHS, devicePaths) {
            routes = ROUTE_PATHS;
            dp = devicePaths;
        });
    });

    it('should exist', function () {
        expect(routes).to.exist;
        expect(dp).to.exist;
    });
});