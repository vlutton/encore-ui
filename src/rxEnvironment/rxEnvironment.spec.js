/* jshint node: true */
describe('rxEnvironment', function () {
    var rootScope, envSvc, location, log;

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        // Inject in angular constructs
        inject(function ($location, $rootScope, Environment, $log) {
            location = $location;
            rootScope = $rootScope;
            envSvc = Environment;
            log = $log;
        });

        sinon.stub(location, 'absUrl');
    });

    afterEach(function () {
        location.absUrl.restore();
    });

    it('should warn and return first environment if no environment found', function () {
        location.absUrl.returns('http://nonsense');

        sinon.spy(log, 'warn');

        expect(envSvc.get().name).to.equal('local');
        expect(log.warn.calledOnce).to.be.true;
    });

    it('should get current environment based on location passed in', function () {
        // test local
        expect(envSvc.get('http://localhost:9001').name).to.equal('local');

        // test staging
        expect(envSvc.get('http://staging.encore.rackspace.com').name).to.equal('unified-preprod');

        // test prod
        expect(envSvc.get('http://encore.rackspace.com').name).to.equal('unified');

        // test unified-preprod
        expect(envSvc.get('http://randenv.encore.rackspace.com').name).to.equal('unified-preprod');

        // test unified
        expect(envSvc.get('http://encore.rackspace.com').name).to.equal('unified');
    });

    it('should get current environment based on location.absUrl', function () {
        // test local
        location.absUrl.returns('http://localhost:9001');
        expect(envSvc.get().name).to.equal('local');

        // test staging
        location.absUrl.returns('http://staging.encore.rackspace.com');
        expect(envSvc.get().name).to.equal('unified-preprod');

        // test prod
        location.absUrl.returns('http://encore.rackspace.com');
        expect(envSvc.get().name).to.equal('unified');
    });

    it('should allow defining a new environment', function () {
        // test w/ simple string
        envSvc.add({
            name: 'custom',
            pattern: '//custom',
            url: 'custom'
        });
        location.absUrl.returns('http://custom');
        expect(envSvc.get().name).to.equal('custom');

        // test w/ regexp (matches http://craziness.*.com/)
        envSvc.add({
            name: 'crazy',
            pattern: /\/\/craziness\..*\.com\//,
            url: 'crazy'
        });
        location.absUrl.returns('http://craziness.anything.yeah.com/some/path');
        expect(envSvc.get().name).to.equal('crazy');
    });

    it('should throw error on bad environment', function () {
        sinon.spy(log, 'error');
        // left off some values
        envSvc.add({
            name: 'custom'
        });

        expect(log.error.calledOnce).to.be.true;
    });

    it('should allow you to completely overwrite defined environments', function () {
        envSvc.setAll([{
            name: 'custom',
            pattern: /./,
            url: 'mycustomurl'
        }]);

        expect(envSvc.get().name).to.equal('custom');
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

        // set environment to build from
        sinon.stub(envSvc, 'get').returns({
            url: '//staging.{{tld}}.encore.rackspace.com/{{path}}'
        });

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
        // override current environment
        sinon.stub(envSvc, 'get').returns({
            name: 'staging'
        });

        expect(urlMatch('staging'), 'staging').to.be.true;
        expect(urlMatch('!staging'), '!staging').to.be.false;
        expect(urlMatch('production'), 'production').to.be.false;
        expect(urlMatch('!production'), '!production').to.be.true;
    });
});

describe('rxIfEnvironment', function () {
    var rootScope, scope, compile, envSvc,
        stagingMsg = 'Show if staging',
        prodMsg = 'Show if not prod',
        stagingTemplate = '<div rx-if-environment="staging">' + stagingMsg + '</div>',
        notProdTemplate = '<div rx-if-environment="!production">' + prodMsg + '</div>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        inject(function ($rootScope, $compile, Environment) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            envSvc = Environment;
        });

        // override get functionality so we can customize environment
        sinon.stub(envSvc, 'get');
    });

    it('should show if environment matches', function () {
        envSvc.get.returns({
            name: 'staging'
        });
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });

    it('should hide if environment does not match', function () {
        envSvc.get.returns({
            name: 'local'
        });
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should hide if negated environment matches', function () {
        envSvc.get.returns({
            name: 'production'
        });
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should show if negated environment does not match', function () {
        envSvc.get.returns({
            name: 'local'
        });
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });
});
