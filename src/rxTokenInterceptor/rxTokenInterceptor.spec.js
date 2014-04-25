/* jshint node: true */

describe('rxTokenInterceptor', function () {
    var interceptor, session;

    beforeEach(function () {
        // load module
        module('encore.ui.rxTokenInterceptor');
        module('encore.ui.rxSession');

        inject(function ($injector) {
            interceptor = $injector.get('TokenInterceptor');
            session = $injector.get('Session');
            session.getTokenId = sinon.stub().returns('12345');
        });
    });

    it('Interceptor should exist', function () {
        expect(interceptor).to.exist;
    });

    it('Interceptor sets X-Auth-Token in headers', function () {
        var config = { headers: {}};
        interceptor.request(config);
        expect(config.headers).not.be.empty;
        expect(config.headers['X-Auth-Token']).to.eq('12345');
    });
});
