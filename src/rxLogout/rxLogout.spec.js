/* jshint node: true */

describe('rxLogout', function () {
    var linkEl, scope, compile, rootScope, authMock, $window, $location,
        validTemplate = '<a href="#myPath" rx-logout></a>';

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.rxLogout');

        // Provide any mocks needed
        module(function ($provide) {
            // mock out Auth service
            var authApi = { logout: function () {}},
                mockWindow = { location: '' };

            // mock out html5 mode
            var mockLocation = { $$html5: false };

            authMock = sinon.mock(authApi);
            $window = sinon.mock(mockWindow);
            $location = sinon.stub(mockLocation);
            $provide.value('Auth', authApi);
            $provide.value('$window', $window);
            $provide.value('$location', $location);
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        linkEl = helpers.createDirective(validTemplate, compile, scope);
    });

    afterEach(function () {
        // zero out link element
        linkEl = null;
    });

    it('should fire logout on click', function () {
        // spy on scope.logout
        sinon.spy(scope, 'logout');

        helpers.clickElement(linkEl[0]);

        sinon.assert.calledOnce(scope.logout);

        // validate scope.logout was called
        scope.logout.restore();
    });

    describe('html5mode', function () {

        it('should route the user to #/login if html5 mode is disabled', function () {
            sinon.spy(scope, 'logout');
            scope.logout();
            expect($window.location).to.equal('#/login');
        });

        it('should route the user to /login if html5 mode is enabled', function () {
            $location.$$html5 = true;
            sinon.spy(scope, 'logout');
            scope.logout();
            expect($window.location).to.equal('/login');
        });

        after(function () {
            $location.$$html5 = false;
        });

    });

    it.skip('should prevent the default action on click', function () {
        // TODO figure out how to listen to the event that's being prevented

        // create fake event to spy on
        var fakeEvent = {
            preventDefault: function () {}
        };

        // spy on said event
        var prevDefSpy = sinon.spy(fakeEvent, 'preventDefault');

        // click the element
        helpers.clickElement(linkEl[0]);

        // validate preventDefault was called
        sinon.assert.calledOnce(prevDefSpy);
    });

    it('should fire auth-loginRequired when successfully logged out', function () {
        sinon.spy(rootScope, '$broadcast');

        authMock.expects('logout').callsArg(0);

        scope.logout();

        sinon.assert.calledOnce(rootScope.$broadcast);
        sinon.assert.calledWith(rootScope.$broadcast, 'event:auth-loginRequired');

        authMock.verify();
        authMock.restore();
    });

    it('should error and not fire auth-loginRequired when log out failed', function () {
        sinon.spy(rootScope, '$broadcast');
        sinon.spy(window, 'alert');

        authMock.expects('logout').once().returns(new Error());

        scope.logout();

        sinon.assert.notCalled(rootScope.$broadcast);

        rootScope.$broadcast.restore();

        authMock.verify();
        authMock.restore();
    });
});
