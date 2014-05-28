/* jshint node: true */

describe('rxUnauthorizedInterceptor', function () {
    var interceptor, mockWindow = {},
        session = { logout: sinon.spy() },
        q = { reject: sinon.spy() },
        cases = {
            'fullPath': '/app/path',
            'login': '/', // /login is an actual app, so the interceptor never kicks in
            'root': '/', // / may not need to be authorized, but in case it is, redirect will be /
        },
        currentCase = cases.fullPath,
        location = {
            absUrl: function () { return 'https://localhost:9000' + currentCase; },
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
                $provide.value('Session', session);
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
        expect(session.logout.called).to.be.true;
    });

    it('Interceptor sets proper redirect path', function () {
        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=/app/path');
    });

    it('Interceptor sets proper redirect path for /login', function () {
        currentCase = cases.login;
        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=/');
    });

    it('Interceptor sets proper redirect path for /', function () {
        currentCase = cases.root;
        interceptor.responseError({ status: 401 });
        expect(mockWindow.location).to.contain('redirect=/');
    });
});
