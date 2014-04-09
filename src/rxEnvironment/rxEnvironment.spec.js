/* jshint node: true */
describe('rxEnvironment', function () {
    var rootScope, envSvc, location;

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        // Inject in angular constructs
        inject(function ($location, $rootScope, Environment) {
            location = $location;
            rootScope = $rootScope;
            envSvc = Environment;
        });
    });

    it('should default environment to local if no environment found', function () {
        location.path('nonsense');

        expect(envSvc.get().name).to.equal('local');
    });

    it('should get current environment based on location passed in', function () {
        // test local
        expect(envSvc.get('http://localhost:9001').name).to.equal('local');

        // test staging
        expect(envSvc.get('http://staging.encore.rackspace.com').name).to.equal('staging');

        // test prod
        expect(envSvc.get('http://encore.rackspace.com').name).to.equal('production');
    });

    it('should get current environment based on location.absUrl', function () {
        var fakeUrl;
        location.absUrl = function () {
            return fakeUrl;
        };

        // test local
        fakeUrl = 'http://localhost:9001';
        expect(envSvc.get().name).to.equal('local');

        // test staging
        fakeUrl = 'http://staging.encore.rackspace.com';
        expect(envSvc.get().name).to.equal('staging');

        // test staging with custom TLD
        fakeUrl = 'http://staging.cloudatlas.encore.rackspace.com';
        expect(envSvc.get().name).to.equal('staging');

        // test prod
        fakeUrl = 'http://encore.rackspace.com';
        expect(envSvc.get().name).to.equal('production');
    });

    it('should allow defining a new environment', function () {
        // test w/ simple string
        envSvc.add({
            name: 'custom',
            pattern: 'custom',
            url: 'custom'
        });
        location.path('http://custom/some/path');
        expect(envSvc.get().name).to.equal('custom');

        // test w/ regexp (matches http://craziness.*.com/)
        envSvc.add({
            name: 'crazy',
            pattern: /\/\/craziness\..*\.com\//,
            url: 'crazy'
        });
        location.path('http://craziness.anything.yeah.com/some/path');
        expect(envSvc.get().name).to.equal('crazy');
    });

    it('should throw error on bad environment', function () {
        var buildBadEnd = function () {
            // left off some values
            envSvc.add({
                name: 'custom'
            });
        };

        expect(buildBadEnd).to.throw(Error);
    });

    it('should provide current environment via rootscope', function () {
        expect(rootScope.environment.name).to.equal('local');

        // set environment to staging
        envSvc.set('staging');

        expect(rootScope.environment.name).to.equal('staging');
    });

    it('should allow you to completely overwrite defined environments', function () {
        envSvc.setAll([{
            name: 'custom',
            pattern: 'custom'
        }]);

        expect(rootScope.environment.name).to.equal('custom');
    });
});

describe('rxEnvironmentUrl', function () {
    var urlFilter, envSvc;

    beforeEach(function () {
        module('encore.ui.rxEnvironment');

        inject(function ($filter, Environment) {
            urlFilter = $filter('rxEnvironmentUrl');
            envSvc = Environment;
        });
    });

    it('should allow you to build paths based on environment', function () {
        // create url information to build on
        var url = { tld: 'cloudatlas', path: 'cbs/servers' };

        // set environment to staging
        envSvc.set('staging');

        expect(urlFilter(url)).to.equal('//staging.cloudatlas.encore.rackspace.com/cbs/servers');
    });
});

describe('rxEnvironmentMatch', function () {
    var urlMatch, envSvc;

    beforeEach(function () {
        module('encore.ui.rxEnvironment');

        inject(function ($filter, Environment) {
            urlMatch = $filter('rxEnvironmentMatch');
            envSvc = Environment;
        });
    });

    it('should match based on target environment', function () {
        // set environment to staging
        envSvc.set('staging');

        expect(urlMatch('staging'), 'staging').to.be.true;
        expect(urlMatch('!staging'), '!staging').to.be.false;
        expect(urlMatch('production'), 'production').to.be.false;
        expect(urlMatch('!production'), '!production').to.be.true;
    });
});

describe('rxIfEnvironment', function () {
    var rootScope, location, scope, compile, envSvc,
        stagingMsg = 'Show if staging',
        prodMsg = 'Show if not prod',
        stagingTemplate = '<div rx-if-environment="staging">' + stagingMsg + '</div>',
        notProdTemplate = '<div rx-if-environment="!production">' + prodMsg + '</div>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        inject(function ($rootScope, $compile, $location, Environment) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            location = $location;
            envSvc = Environment;
        });
    });

    it('should show if environment matches', function () {
        envSvc.set('staging');
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });

    it('should hide if environment does not match', function () {
        envSvc.set('local');
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should hide if negated environment matches', function () {
        envSvc.set('production');
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should show if negated environment does not match', function () {
        envSvc.set('local');
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });
});