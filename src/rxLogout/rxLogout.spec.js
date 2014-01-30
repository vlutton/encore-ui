/* jshint node: true */

describe('rxLogout', function () {
    var linkEl, scope, compile, rootScope, authMock,
        validTemplate = '<a href="#myPath" rx-logout></a>';

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.rxLogout');

        // Provide any mocks needed
        module(function ($provide) {
            // mock out Auth service
            var authApi = {
                logout: function () {}
            };

            authMock = sinon.mock(authApi);
            $provide.value('Auth', authApi);
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