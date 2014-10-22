/* jshint node: true */

describe('rxAccountInfo', function () {
    var scope, compile, rootScope, el, q, rxnotify;
    var validTemplate = '<rx-account-info account-number="123"></rx-account-info>';
    var defaultStack = 'page';

    var account, badges, teamBadges;

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

        teamBadges = [
            {
                url: 'http://foo.com/team-bar.jpg',
                description: 'A team badge!'
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
            })
            .factory('Teams', function () {
                return {
                    badges: function () {}
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
                rxNotify, Teams) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            q = $q;
            rxnotify = rxNotify;
            helpers.resourceStub($q, Encore, 'getAccount', account);
            helpers.resourceStub($q, SupportAccount, 'getBadges', badges);
            helpers.resourceStub($q, Teams, 'badges', teamBadges);
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

    it('should not populate the team badges if no team-id was specified', function () {
        expect(_.keys(teamBadges)).to.not.contain('$deferred');
    });

    it('should display an error notification when it cannot load account name', function () {
        account.$deferred.reject();
        scope.$digest();
        expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving account name');
    });

    describe('with Team Badges', function () {
        beforeEach(function () {
            validTemplate = '<rx-account-info account-number="123" team-id="321"></rx-account-info>';

            el = helpers.createDirective(validTemplate, compile, scope);
        });

        it('should populate the team badges', function () {
            teamBadges.$deferred.resolve(teamBadges);
            scope.$digest();
            expect(el.find('img').attr('src'), 'badge image source').to.equal('http://foo.com/team-bar.jpg');
            expect(el.find('img').attr('tooltip'), 'badge tooltip description').to.equal('A team badge!');
        });

        it('should display an error notification when it cannot load badges', function () {
            teamBadges.$deferred.reject();
            scope.$digest();
            expect(rxnotify.stacks[defaultStack][0].text).to.equal('Error retrieving badges for this team');
        });
    
    });
});
