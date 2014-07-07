describe('rxStatusSvc: Status', function () {
    var status, scope, rootScope, rxNotify;

    beforeEach(function () {
        //module('encore');
        module('encore.ui.rxStatusSvc');

        inject(function ($rootScope, Status, _rxNotify_) {
            scope = $rootScope.$new();
            status = Status;
            rxNotify = _rxNotify_;
            rootScope = $rootScope;

            status.setScope(scope);

            sinon.spy(status, 'setStatus');
        });
    });

    afterEach(function () {
        status.setStatus.restore();
    });

    it('Status: setLoading returns a loading message', function () {
        status.setLoading('Loading');
        expect(status.setStatus.calledWithMatch('Loading')).to.be.true;
        expect(status.setStatus.args[0][1]).to.include.keys('loaded', 'loading');
    });

    it('Status: setSuccess returns a success message', function () {
        status.setSuccess('Yup');
        expect(status.setStatus.calledWithMatch('Yup')).to.be.true;
        expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
    });

    it('Status: setSuccessNext returns a success message upon next route change', function () {
        status.setSuccessNext('Yup later');
        expect(status.setStatus.calledWithMatch('later')).to.be.true;
        expect(status.setStatus.args[0][1]).to.include({ show: 'next' });
    });

    it('Status: setError returns an error message', function () {
        status.setError('Err');
        expect(status.setStatus.calledWithMatch('Err')).to.be.true;
        expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
    });

    it('Status: setWarning returns a warning message', function () {
        status.setWarning('Warn');
        expect(status.setStatus.calledWithMatch('Warn')).to.be.true;
        expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
    });

    it('Status: setInfo returns an info message', function () {
        status.setInfo('Info');
        expect(status.setStatus.calledWithMatch('Info')).to.be.true;
        expect(status.setStatus.args[0][1]).to.include.keys('success', 'type');
    });

    it('Status: clear returns no message', function () {
        status.clear();
        sinon.assert.notCalled(status.setStatus);
    });

    it('Status: complete results in an immediate success', function () {
        status.complete();
        expect(scope.status.show).to.be.equal('immediate');
    });

    it('Status: dismiss results in removal of an existing message', function () {
        var info = status.setInfo('Info');
        status.dismiss(info);
        expect(scope.status.loading).to.be.equal(false);
    });

    it('Status: should reset stack to "page" upon beginning of route reload', function () {
        inject(function (Status) {
            var spy = sinon.spy(Status, 'setStack');
            rootScope.$broadcast('$routeChangeStart');
            expect(Status.setStack.args[0][0]).to.be.equal('page');
            spy.restore();
        });
    });
});

describe('rxStatusSvc: StatusUtil', function () {
    var util,
        rootScope,
        status = {
            setScope: function () { }
        };

    beforeEach(function () {
        module('ngRoute');
        module('encore.ui.rxStatusSvc', function ($provide) {
            $provide.value('Status', status);
        });

        inject(function ($rootScope, StatusUtil) {
            util = StatusUtil;
            rootScope = $rootScope;

            sinon.spy(status, 'setScope');
        });
    });

    afterEach(function () {
        status.setScope.restore();
    });

    it('StatusUtil: should allow storing of rootScope reference', function () {
        util.setupScope();
        expect(status.setScope.args[0][0]).to.be.deep.equal(rootScope);
    });

    it('StatusUtil: should allow storing of provided scope reference', function () {
        util.setupScope({ fake: 'object' });
        expect(status.setScope.args[0][0]).to.be.deep.equal({ fake: 'object' });
    });
});

describe('rxStatusSvc: ErrorFormatter', function () {
    var errorFormatter;

    beforeEach(function () {
        module('encore.ui.rxStatusSvc');

        inject(function (ErrorFormatter) {
            errorFormatter = ErrorFormatter;
        });
    });

    it('should use an error object with a message property', function () {
        var error = { message: 'foobar' };
        expect(errorFormatter.buildErrorMsg('Hi ${message}', error)).to.equal('Hi foobar');
    });

    it('should use statusText for ${message} if there is no message property', function () {
        var error = { statusText: 'baz' };
        expect(errorFormatter.buildErrorMsg('Hi ${message}', error)).to.equal('Hi baz');
    });

    it('should replace ${message} with "Unknown error" if it cannot find message or statusText', function () {
        var error = {};
        expect(errorFormatter.buildErrorMsg('Hi ${message}', error)).to.equal('Hi Unknown error');
    });

    it('should accept arbitrary template variables', function () {
        var error = { firstVar: 'foo', secondVar: 'bar' };
        expect(errorFormatter.buildErrorMsg('${firstVar} ${secondVar}', error)).to.equal('foo bar');
    });
});
