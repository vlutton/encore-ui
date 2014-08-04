/* jshint node: true */
describe('rxAuth', function () {
    var auth, identity, permission, session, token;

    token = {
        'access': { 'token': { 'id': 'somecrazyid', 'expires': '2014-03-20T19:47:36.711Z',
        'tenant': { 'id': '655062', 'name': '655062' }, 'RAX-AUTH:authenticatedBy': ['PASSWORD'] }}
    };

    beforeEach(function () {
        module('encore.ui.rxAuth');
        module('encore.ui.rxIdentity');
        module('encore.ui.rxSession');

        inject(function ($injector) {
            permission = $injector.get('Permission');
            session = $injector.get('Session');
            identity = $injector.get('Identity');

            identity.loginWithJSON = sinon.stub().returns(token);
            session.getToken = sinon.stub().returns(token);
            session.storeToken = sinon.stub();
            session.logout = sinon.stub();
            session.isCurrent = sinon.stub().returns(true);
            session.isAuthenticated = sinon.stub().returns(true);
            permission.getRoles = sinon.stub().returns([{ 'name': 'admin' }]);

            auth = $injector.get('Auth');
        });
    });

    describe('Auth Service', function () {
        it('Auth.login() should get a token', function () {
            var result = auth.login({ username: 'bruce.wayne', password: 'batmanRulez' });
            expect(result.access).not.be.empty;
            expect(identity.loginWithJSON.called).to.be.true;
        });

        it('Auth.loginWithJSON() should get a token', function () {
            var result = auth.loginWithJSON({ username: 'bruce.wayne', apiToken: '1-800-BAT-MANN' });
            expect(result.access).not.be.empty;
            expect(identity.loginWithJSON.called).to.be.true;
        });

        it('Auth.getToken() should return a token', function () {
            var result = auth.getToken();
            expect(result).not.be.empty;
            expect(result.access).not.be.empty;
            expect(session.getToken.called).to.be.true;
        });

        it('Auth.storeToken() should store a token', function () {
            auth.storeToken(token);
            expect(session.storeToken.called).to.be.true;
        });

        it('Auth.logout() should log off user via session.logout', function () {
            auth.logout();
            expect(session.logout.called).to.be.true;
        });

        it('Auth.isCurrent() should check token via session.isCurrent', function () {
            expect(auth.isCurrent()).to.be.true;
            expect(session.isCurrent.called).to.be.true;
        });

        it('Auth.isAuthenticated() should check token via session.isAuthenticated', function () {
            expect(auth.isAuthenticated()).to.be.true;
            expect(session.isAuthenticated.called).to.be.true;
        });

        it('Auth.getRoles() should retrieve user roles via permission.getRoles', function () {
            expect(auth.getRoles().length).to.eq(1);
            expect(permission.getRoles.called).to.be.true;
        });

        it('Auth.hasRole() should validate user has role via permission.hasRole', function () {
            expect(auth.hasRole('admin')).to.be.true;
            expect(auth.hasRole('fakeRole')).to.be.false;
            expect(permission.getRoles.called).to.be.true;
        });
    });

});
