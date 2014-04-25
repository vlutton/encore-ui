/* jshint node: true */

describe('rxUnauthorizedInterceptor', function () {
    var interceptor, mockWindow = {},
        q = { reject: sinon.spy() };

    beforeEach(function () {
        module('encore.ui.rxUnauthorizedInterceptor',
            function ($provide) {
                $provide.value('$window', mockWindow);
                $provide.value('$q', q);
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
        expect(mockWindow.location).to.eq('/login');
        expect(q.reject.called).to.be.true;
    });
});
