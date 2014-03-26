/* jshint node: true */
describe('rxPermission', function () {
    describe('rxPermission Directive', function () {
        var scope, compile, rootScope, el, elFail;
        var validTemplate = '<rx-permission role="pass">Hello</rx-permission>';
        var invalidTemplate = '<rx-permission role="fail">Hello</rx-permission>';

        beforeEach(function () {
            module('encore.ui.rxPermission', function ($provide) {
                $provide.decorator('Permission', function ($delegate) {
                    $delegate.hasRole = function (role) {
                        return role === 'pass';
                    };

                    return $delegate;
                });
            });

            module('templates/rxPermission.html');

            inject(function ($location, $rootScope, $compile) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                compile = $compile;
            });

            el = helpers.createDirective(validTemplate, compile, scope);
            elFail = helpers.createDirective(invalidTemplate, compile, scope);
        });

        it('rxPermission: should display text when user has role', function () {
            expect(el.text().trim()).to.be.eq('Hello');
        });

        it('rxPermission: should not display text when user does not have role', function () {
            expect(elFail.text().trim()).to.be.empty;
        });
    });

    describe('Permission', function () {
        var permission, session, mockToken;

        mockToken = {
            access: {
                token:
                    {
                        id: 'someid',
                    },
                    user: {
                        id: 'joe.customer',
                        'roles': [{ 'id': '9','name': 'Customer' }]
                    }
                }
            };

        beforeEach(function () {
            module('encore.ui.rxPermission');
            module('encore.ui.rxSession');

            inject(function ($injector) {
                permission = $injector.get('Permission');
                session = $injector.get('Session');
                session.getToken = sinon.stub().returns(mockToken);
            });
        });

        it('Permission service: should return list of roles on getRoles', function () {
            expect(permission.getRoles()).not.be.empty;
            expect(permission.getRoles().length).to.be.eq(1);

            session.getToken = sinon.stub().returns(null);
            expect(permission.getRoles()).to.be.empty;
            expect(session.getToken.called).to.be.true;
        });

        it('Permission service: should validate if user has role', function () {
            expect(permission.hasRole('Customer')).to.be.true;
            expect(permission.hasRole('Invalid Role')).to.be.false;
            expect(session.getToken.called).to.be.true;
        });
    });
});
