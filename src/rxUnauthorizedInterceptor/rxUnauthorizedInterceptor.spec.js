/* jshint node: true */

describe('rxUnauthorizedInterceptor', function () {
    var interceptor, mockWindow = {},
        q = { reject: sinon.spy() },
        location = {
            absUrl: function () { return 'https://localhost:9000/app/path'; },
            host: function () { return 'localhost'; },
            port: function () { return '9000'; },
            protocol: function () { return 'https'; },
            path: function () { return '/path'; }
        };

    beforeEach(function () {
        module('encore.ui.rxUnauthorizedInterceptor',
            function ($provide) {
                $provide.value('$window', mockWindow);
                $provide.value('$q', q);
                $provide.value('$location', location);
            });

        inject(function ($injector) {
            interceptor = $injector.get('UnauthorizedInterceptor');
        });
    });

    it('Unauthorized Interceptor shoud exist', function () {
        expect(interceptor).to.exist;
    });

    it('Interceptor handles error responses', function () {
        var response = { status: 500 };
        interceptor.responseError(response);

        expect(mockWindow.location).to.not.eq('/login');
        expect(q.reject.called).to.be.true;

        response.status = 401;
        interceptor.responseError(response);
        expect(mockWindow.location).to.contain('/login');
        expect(q.reject.called).to.be.true;
    });

    it('Interceptor sets proper redirect path', function () {
        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=/app/path');
    });
});
