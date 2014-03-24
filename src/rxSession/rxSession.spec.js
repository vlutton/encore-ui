describe('rxSession', function () {
    var storage, session, mockToken, tomorrow;

    beforeEach(function () {
        module('encore.ui.rxSession');
        module('encore.ui.rxLocalStorage');
        tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
        mockToken = {
            access: {
                token:
                    {
                        id: 'someid',
                        expires: '2014-03-11T19:43:14.685Z',
                        'RAX-AUTH:authenticatedBy': ['PASSWORD']
                    },
                    serviceCatalog: [],
                    user: {
                        id: 'joe.customer',
                        'roles': [{ 'id': '9','name': 'Customer' }],
                        'RAX-AUTH:defaultRegion': ''
                    }
                }
            };

        inject(function ($injector) {
            session = $injector.get('Session');
            storage = $injector.get('LocalStorage');
            storage.setObject = sinon.spy();
            storage.getObject = sinon.stub().returns(mockToken);
            storage.removeItem = sinon.spy();
        });
    });

    describe('Session Service', function () {
        it('storeToken: should store token in session storage', function () {
            session.storeToken(mockToken);
            expect(storage.setObject.called).to.be.true;
        });

        it('getToken: should return token from session storage', function () {
            var token = session.getToken();
            expect(token).not.be.empty;
            expect(storage.getObject.called);
        });

        it('logoff: should remove token from session', function () {
            session.logoff('encoreToken');
            expect(storage.removeItem.called).to.be.true;
        });

        it('isCurrent: should evaluate the expiration date of the token', function () {
            expect(session.isCurrent()).to.be.false;
            storage.getObject = sinon.stub().returns();
            expect(session.isCurrent()).to.be.false;

            mockToken.access.token.expires = tomorrow;
            storage.getObject = sinon.stub().returns(mockToken);
            expect(session.isCurrent(mockToken)).to.be.true;
        });

        it('isAuthenticated: should indicate if user has been authenticated', function () {
            expect(session.isAuthenticated()).to.be.false;
            storage.getObject = sinon.stub().returns({});
            expect(session.isAuthenticated()).to.be.false;
        });
    });
});
