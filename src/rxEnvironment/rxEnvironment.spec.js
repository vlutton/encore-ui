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
        expect(log.warn).to.be.calledOnce;
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
        expect(envSvc.isLocal(), 'isLocal localhost:9001').to.be.true;
        expect(envSvc.isPreProd(), 'test for preprod when environment is local').to.be.false;

        // test preprod
        location.absUrl.returns('http://preprod.encore.rackspace.com');
        expect(envSvc.get().name).to.equal('preprod');
        expect(envSvc.isPreProd(), 'isPreProd for preprod.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is preprod').to.be.true;

        // test staging
        location.absUrl.returns('http://staging.encore.rackspace.com');
        expect(envSvc.get().name).to.equal('unified-preprod');
        expect(envSvc.isUnifiedPreProd(), 'isUnifiedPreProd for staging.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnified(), 'test for unified when environment is unified-preprod').to.be.true;

        // test unified
        location.absUrl.returns('http://encore.rackspace.com');
        expect(envSvc.get().name).to.equal('unified');
        expect(envSvc.isUnified(), 'isUnified for encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;
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

        expect(log.error).to.be.calledOnce;
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
    var urlMatch, envSvc, _location, setUrl;

    beforeEach(function () {
        module('encore.ui.rxEnvironment');

        inject(function ($filter, Environment, $location) {
            urlMatch = $filter('rxEnvironmentMatch');
            envSvc = Environment;
            _location = $location;

            setUrl = function (url) {
                sinon.stub(_location, 'absUrl').returns(url);
            };
        });
    });

    describe('unified-preprod', function () {
        it('should match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('unified-preprod'), 'staging.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified-preprod'), 'negate staging.encore.rackspace.com').to.be.false;
        });

        it('should match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('unified-preprod'), 'preprod.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified-preprod'), 'negate preprod.encore.rackspace.com').to.be.false;
        });

        it('should not match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('unified-preprod'), 'encore.rackspace.com').to.be.false;
            expect(urlMatch('!unified-preprod'), 'negate encore.rackspace.com').to.be.true;
        });
        
        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('unified-preprod'), 'localhost').to.be.false;
            expect(urlMatch('!unified-preprod'), 'negate localhost').to.be.true;
        });
    });

    describe('preprod', function () {
        it('should match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('preprod'), 'preprod.encore.rackspace.com').to.be.true;
            expect(urlMatch('!preprod'), 'negate preprod.encore.rackspace.com').to.be.false;
        });
        
        it('should not match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('preprod'), 'staging.encore.rackspace.com').to.be.false;
            expect(urlMatch('!preprod'), 'negate staging.encore.rackspace.com').to.be.true;
        });

        it('should not match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('preprod'), 'encore.rackspace.com').to.be.false;
            expect(urlMatch('!preprod'), 'encore.rackspace.com').to.be.true;
        });
        
        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('preprod'), 'localhost').to.be.false;
            expect(urlMatch('!preprod'), 'localhost').to.be.true;
        });
    });

    describe('local', function () {
        it('should not match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('local'), 'preprod.encore.rackspace.com').to.be.false;
            expect(urlMatch('!local'), 'negate preprod.encore.rackspace.com').to.be.true;
        });
        
        it('should not match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('local'), 'staging.encore.rackspace.com').to.be.false;
            expect(urlMatch('!local'), 'negate staging.encore.rackspace.com').to.be.true;
        });

        it('should not match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('local'), 'encore.rackspace.com').to.be.false;
            expect(urlMatch('!local'), 'negate encore.rackspace.com').to.be.true;
        });
        
        it('should match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('local'), 'localhost').to.be.true;
            expect(urlMatch('!local'), 'negate localhost').to.be.false;
        });
    });
    
    describe('production', function () {
        it('should not match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('unified-prod'), 'preprod.encore.rackspace.com').to.be.false;
            expect(urlMatch('!unified-prod'), 'negate preprod.encore.rackspace.com').to.be.true;
        });
        
        it('should not match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('unified-prod'), 'staging.encore.rackspace.com').to.be.false;
            expect(urlMatch('!unified-prod'), 'negate staging.encore.rackspace.com').to.be.true;
        });

        it('should match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('unified-prod'), 'encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified-prod'), 'negate encore.rackspace.com').to.be.false;
        });
        
        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('unified-prod'), 'localhost').to.be.false;
            expect(urlMatch('!unified-prod'), 'negate localhost').to.be.true;
        });
    });
    
    describe('unified', function () {
        it('should match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('unified'), 'preprod.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified'), 'negate preprod.encore.rackspace.com').to.be.false;
        });
        
        it('should match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('unified'), 'staging.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified'), 'negate staging.encore.rackspace.com').to.be.false;
        });

        it('should match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('unified'), 'encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified'), 'negate encore.rackspace.com').to.be.false;
        });
        
        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('unified'), 'localhost').to.be.false;
            expect(urlMatch('!unified'), 'negate localhost').to.be.true;
        });
    });

});

describe('rxIfEnvironment', function () {
    var rootScope, scope, compile, envSvc, _location, setUrl,
        stagingMsg = 'Show if staging',
        prodMsg = 'Show if not prod',
        stagingTemplate = '<div rx-if-environment="unified-preprod">' + stagingMsg + '</div>',
        notProdTemplate = '<div rx-if-environment="!unified-preprod">' + prodMsg + '</div>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        inject(function ($rootScope, $compile, $location, Environment) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            envSvc = Environment;
            _location = $location;
            
            setUrl = function (url) {
                sinon.stub(_location, 'absUrl').returns(url);
            };
        });

        // override get functionality so we can customize environment
        sinon.stub(envSvc, 'get');
    });

    it('should show if environment matches', function () {
        setUrl('https://staging.encore.rackspace.com');
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });

    it('should hide if environment does not match', function () {
        setUrl('https://localhost:9000');
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should hide if negated environment matches', function () {
        setUrl('https://staging.encore.rackspace.com');
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should show if negated environment does not match', function () {
        setUrl('https://localhost:9000');
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });
});
