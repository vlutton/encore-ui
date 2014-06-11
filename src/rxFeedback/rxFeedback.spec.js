/* jshint node: true */
describe('rxFeedback', function () {
    var scope, compile, rootScope, el, feedbackSvc, apiUrl, httpMock, notifySvcMock, screenshotSvcMock;
    var validTemplate = '<rx-feedback></rx-feedback>';
    var theScreenshot = 'the screenshot';

    var feedback = {
        type: {
            label: 'type'
        },
        description: 'give me the kitchen sink'
    };

    var feedbackWithScreenshot = {
        type: feedback.type.label,
        description: feedback.description,
        screenshot: theScreenshot
    };

    beforeEach(function () {
        notifySvcMock = {
            add: sinon.stub()
        };

        screenshotSvcMock = {
            capture: sinon.stub().returns({
                then: sinon.stub().callsArgWith(0, theScreenshot)
            })
        };

        // load module
        module('encore.ui.configs');
        module('encore.ui.rxFeedback');

        // load templates
        module('templates/rxFeedback.html');

        module(function ($provide) {
            $provide.value('rxNotify', notifySvcMock);
            $provide.value('rxScreenshotSvc', screenshotSvcMock);
        });

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile, rxFeedbackSvc, $httpBackend, feedbackApi) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            feedbackSvc = rxFeedbackSvc;
            apiUrl = feedbackApi;
            httpMock = $httpBackend;
        });

        // overwrite the fallback so it doesn't refresh the page
        feedbackSvc.fallback = sinon.stub();

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    it('should submit data to feedback api', function () {
        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(200);

        scope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][1].type).to.equal('success');
    });

    it('should submit data even if screenshot fails', function () {
        var failureReason = 'some failure reason';

        var feedbackWithFailure = _.clone(feedbackWithScreenshot);
        feedbackWithFailure.screenshot = failureReason;

        httpMock.expectPOST(apiUrl, feedbackWithFailure).respond(200);

        screenshotSvcMock.capture = sinon.stub().returns({
            then: sinon.stub().callsArgWith(1, failureReason)
        });

        scope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][1].type).to.equal('success');
    });

    it('should show custom success message', function () {
        var customSuccess = '(successkid)';

        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond({
            message: customSuccess
        });

        scope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][0]).to.equal(customSuccess);
    });

    it('should show error message on API failure', function () {
        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(404);

        scope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][1].type).to.equal('error');
    });

    it('should call fallback on failure', function () {
        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(404);

        scope.sendFeedback(feedback);

        httpMock.flush();

        expect(feedbackSvc.fallback.calledOnce).to.be.true;
    });

    it('should show custom failure message', function () {
        var customFailure = '(fail)';

        httpMock.expectPOST(apiUrl, feedbackWithScreenshot).respond(404, {
            message: customFailure
        });

        scope.sendFeedback(feedback);

        httpMock.flush();

        expect(notifySvcMock.add.args[0][0]).to.contain(customFailure);
    });
});

describe('rxScreenshotSvc', function () {
    var rootScope, compile, scope, svc, timeout, el;
    var validTemplate = '<h1>Here is some content</h1>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxFeedback');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, rxScreenshotSvc, $timeout) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            compile = $compile;
            svc = rxScreenshotSvc;
            timeout = $timeout;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    it('should exist', function () {
        expect(svc).to.exist;
    });

    it('should reject promise if html2canvas not available', function (done) {
        delete window.html2canvas;

        var promise = svc.capture();

        promise.catch(function (reason) {
            expect(reason).to.exist;

            done();
        });

        scope.$digest();
    });

    it('should capture a screenshot if dependencies exist', function (done) {
        window.html2canvas = function (target, options) {
            options.onrendered({
                toDataURL: function () {
                    return 'dataurl';
                }
            });
        };

        var promise = svc.capture(el[0]);

        promise.then(function (screenshot) {
            expect(screenshot).to.exist;

            done();
        });

        scope.$digest();
    });
});

describe('rxFeedbackSvc', function () {
    var feedbackSvc, mockResource, mockWindow, mockNotifySvc;
    var apiUrl = 'myurl';

    beforeEach(function () {
        // load module
        module('encore.ui.rxFeedback');

        mockResource = sinon.stub().returns({
            save: sinon.stub()
        });

        mockWindow = {
            location: {},
            open: sinon.stub()
        };

        mockNotifySvc = {
            add: sinon.stub()
        };

        module(function ($provide) {
            $provide.value('feedbackApi', apiUrl);
            $provide.value('$resource', mockResource);
            $provide.value('$window', mockWindow);
            $provide.value('rxNotify', mockNotifySvc);
        });

        // Inject in angular constructs
        inject(function (rxFeedbackSvc) {
            feedbackSvc = rxFeedbackSvc;
        });
    });

    it('should exist', function () {
        expect(feedbackSvc).to.exist;
    });

    it('should have a default apiEndpoint', function () {
        expect(mockResource.calledWith(apiUrl)).to.be.true;
        expect(feedbackSvc.api.save).to.exist;
    });

    it('should allow overwriting that endpoint', function () {
        // set new api url
        var newUrl = 'newUrl';

        feedbackSvc.setEndpoint(newUrl);

        expect(mockResource.calledWith(newUrl)).to.be.true;
    });

    it('should have default fallback function to send e-mail', function () {
        var fackFeedback = {
            type: {
                label: 'test'
            },
            descrption: 'test'
        };

        expect(feedbackSvc.fallback).to.be.a.function;

        feedbackSvc.fallback(fackFeedback);

        expect(mockWindow.open.calledOnce).to.be.true;
    });

    it('should show e-mail feedback in current window if new window fails to load', function () {
        var feedback = {
            type: {
                label: 'test'
            },
            description: 'test'
        };

        expect(feedbackSvc.fallback).to.be.a.function;

        mockWindow.open.returns(undefined);
        feedbackSvc.fallback(feedback);

        expect(mockWindow.location.href).to.contain(feedback.type.label);
        expect(mockWindow.location.href).to.contain(feedback.description);
    });
});