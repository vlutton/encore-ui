/* jshint node: true */

describe('rxAccountInfo', function () {
    var scope, compile, rootScope, el, q, rxnotify;
    var validTemplate = '<rx-account-info account-number="123"></rx-account-info>';
    var defaultStack = 'page';

    var account, badges;

    beforeEach(function () {

        account = {
            name: 'Mosso'
        };

        badges = [
            {
                url: 'http://foo.com/bar.jpg',
                description: 'A badge!'
            }
        ];

        angular.module('testApp', function () {})
            .factory('Encore', function () {
                return {
                    getAccount: function () {
                        return { };
                    }
                };
            })
            .factory('SupportAccount', function () {
                return {
                    getBadges: function () {}
                };
            });
        
        // load module
        module('encore.ui.rxNotify');
        module('encore.ui.rxInfoPanel');
        module('templates/rxInfoPanel.html');
        module('encore.ui.rxAccountInfo', 'testApp');

        // load templates
        module('templates/rxAccountInfo.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile, $q, Encore, SupportAccount,
                rxNotify) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            q = $q;
            rxnotify = rxNotify;
            helpers.resourceStub($q, Encore, 'getAccount', account);
            helpers.resourceStub($q, SupportAccount, 'getBadges', badges);
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });
    
    it('should render template correctly', function () {
        scope.$digest();
        expect(el).not.be.empty;
        expect(el.find('h3').text()).to.contain('Account Info');
    });

    it('should populate the account number', function () {
        scope.$digest();
        expect(el).not.be.empty;
        expect(el.text()).to.contain('123');
    });

    it('should populate the account name', function () {
        account.$deferred.resolve(account);
        scope.$digest();
        expect(el.text()).to.contain('Mosso');
    });

    it('should populate the badges', function () {
        badges.$deferred.resolve(badges);
        scope.$digest();
        expect(el.find('img').attr('src'), 'badge image source').to.equal('http://foo.com/bar.jpg');
        expect(el.find('img').attr('tooltip'), 'badge tooltip description').to.equal('A badge!');
    });

    it('should display an error notification when it cannot load badges', function () {
        badges.$deferred.reject();
        scope.$digest();
        expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving badges for this account');
    });
    
    it('should display an error notification when it cannot load account name', function () {
        account.$deferred.reject();
        scope.$digest();
        expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving account name');
    });
});
