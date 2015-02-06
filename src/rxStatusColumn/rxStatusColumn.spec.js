/* jshint node: true */

describe('rxStatusColumn directive', function () {
    var scope, compile, rootScope, el, rxstatusMappings;

    beforeEach(function () {
        // load module
        module('encore.ui.rxStatusColumn');

        // load templates
        module('templates/rxStatusColumn.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile, rxStatusMappings) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            rxstatusMappings = rxStatusMappings;
        });

        scope.status = 'MyInfoStatus';

        rxstatusMappings.mapToActive('SUCCESS');
        rxstatusMappings.mapToInfo('MyInfoStatus');
        rxstatusMappings.mapToWarning('MyWarningStatus');
        rxstatusMappings.mapToError('MyErrorStatus');
        rxstatusMappings.mapToPending('InProgress');

        rxstatusMappings.mapToActive('ApiSuccess', 'myApi');

    });

    it('shall set the right style for ACTIVE', function () {
        var validTemplate = '<td rx-status-column status="ACTIVE"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-ACTIVE')).to.be.true;
    });

    it('shall set the right style for ERROR', function () {
        var validTemplate = '<td rx-status-column status="ERROR"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-ERROR')).to.be.true;
        expect(el.find('i').hasClass('fa-ban')).to.be.true;
    });

    it('shall set the right style for WARNING', function () {
        var validTemplate = '<td rx-status-column status="WARNING"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-WARNING')).to.be.true;
        expect(el.find('i').hasClass('fa-exclamation-triangle')).to.be.true;
    });
    
    it('shall set the right style for INFO', function () {
        var validTemplate = '<td rx-status-column status="INFO"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-INFO')).to.be.true;
        expect(el.find('i').hasClass('fa-info-circle')).to.be.true;
    });

    it('shall correctly map to INFO', function () {
        var validTemplate = '<td rx-status-column status="MyInfoStatus"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-INFO')).to.be.true;
    });
    
    it('shall correctly map to WARNING', function () {
        var validTemplate = '<td rx-status-column status="MyWarningStatus"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-WARNING')).to.be.true;
    });
    
    it('shall correctly map to ERROR', function () {
        var validTemplate = '<td rx-status-column status="MyErrorStatus"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-ERROR')).to.be.true;
    });
    
    it('shall correctly map to PENDING', function () {
        var validTemplate = '<td rx-status-column status="InProgress"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-PENDING')).to.be.true;
    });

    it('shall fallback to global mapping if api mapping cannot be found', function () {
        var validTemplate = '<td rx-status-column status="MyErrorStatus" api="myApi"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-ERROR')).to.be.true;
    });

    it('shall use the api mapping if present', function () {
        var validTemplate = '<td rx-status-column status="ApiSuccess" api="myApi"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-ACTIVE')).to.be.true;
    });

    it('shall use the passed in status as the tooltip text', function () {
        var validTemplate = '<td rx-status-column status="MyErrorStatus"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.find('span').attr('tooltip')).to.equal('MyErrorStatus');
    });
    
    it('shall use tooltipContent if passed in', function () {
        var validTemplate = '<td rx-status-column status="MyErrorStatus" tooltip-content="mytooltip"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.find('span').attr('tooltip')).to.equal('mytooltip');
    });

    it('shall update the status column when status changes', function () {
        var validTemplate = '<td rx-status-column status="{{ status }}"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.hasClass('status-INFO')).to.be.true;

        scope.status = 'MyErrorStatus';
        scope.$digest();
        expect(el.hasClass('status-ERROR')).to.be.true;
        expect(el.hasClass('status-INFO')).to.be.false;
    });

    it('shall update the tooltip when the tooltip changes', function () {
        scope.tooltipTest = 'My Tooltip';
        var validTemplate = '<td rx-status-column status="MyErrorStatus" tooltip-content="{{ tooltipTest }}"></td>';
        el = helpers.createDirective(validTemplate, compile, scope);
        expect(el.find('span').attr('tooltip')).to.equal('My Tooltip');

        scope.tooltipTest = 'Another Tooltip';
        scope.$digest();
        expect(el.find('span').attr('tooltip')).to.equal('Another Tooltip');
    });
});

describe('rxStatusMappings', function () {
    var rxstatusMappings;

    beforeEach(function () {

        module('encore.ui.rxStatusColumn');

        inject(function (rxStatusMappings) {
            rxstatusMappings = rxStatusMappings;
        });
    });

    describe('addGlobal()',  function () {
        it('should not fail when passed an empty object',  function () {
            rxstatusMappings.addGlobal({});
        });

        it('should accept a mapping object', function () {
            rxstatusMappings.addGlobal({
                'E': 'ERROR',
                'W': 'WARNING',
                'A': 'ACTIVE',
                'I': 'INFO',
                'P': 'PENDING'
            });

            expect(rxstatusMappings.getInternalMapping('E')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('W')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('I')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('P')).to.equal('PENDING');
        });

        it('should accept multiple mappings to one status', function () {
            rxstatusMappings.addGlobal({
                'E': 'ERROR',
                'EE': 'ERROR',
                'W': 'WARNING',
                'WW': 'WARNING',
                'A': 'ACTIVE',
                'AA': 'ACTIVE',
                'I': 'INFO',
                'II': 'INFO',
                'P': 'PENDING',
                'PP': 'PENDING'
            });

            expect(rxstatusMappings.getInternalMapping('E')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('EE')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('W')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('WW')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('AA')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('I')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('II')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('P')).to.equal('PENDING');
            expect(rxstatusMappings.getInternalMapping('PP')).to.equal('PENDING');
        });

        it('should convert lowercase map targets to uppercase', function () {
            rxstatusMappings.addGlobal({
                'E': 'error',
                'W': 'warning',
                'A': 'active',
                'I': 'info',
                'P': 'pending'
            });

            expect(rxstatusMappings.getInternalMapping('E')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('W')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('I')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('P')).to.equal('PENDING');
        });
    });

    describe('addAPI()', function () {
        it('should accept an API mapping object', function () {
            rxstatusMappings.addAPI('myApi', {
                'E': 'ERROR',
                'W': 'WARNING',
                'A': 'ACTIVE',
                'I': 'INFO',
                'P': 'PENDING'
            });

            expect(rxstatusMappings.getInternalMapping('E'), 'no mapping without api').to.equal('E');
            expect(rxstatusMappings.getInternalMapping('E', 'myApi'), 'provided api').to.equal('ERROR');

            expect(rxstatusMappings.getInternalMapping('W'), 'no mapping without api').to.equal('W');
            expect(rxstatusMappings.getInternalMapping('W', 'myApi'), 'provided api').to.equal('WARNING');

            expect(rxstatusMappings.getInternalMapping('A'), 'no mapping without api').to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi'), 'provided api').to.equal('ACTIVE');

            expect(rxstatusMappings.getInternalMapping('I'), 'no mapping without api').to.equal('I');
            expect(rxstatusMappings.getInternalMapping('I', 'myApi'), 'provided api').to.equal('INFO');
            
            expect(rxstatusMappings.getInternalMapping('P'), 'no mapping without api').to.equal('P');
            expect(rxstatusMappings.getInternalMapping('P', 'myApi'), 'provided api').to.equal('PENDING');
        });

        it('should give higher precendence to API mappings', function () {
            rxstatusMappings.addGlobal({
                'E': 'ERROR'
            });

            rxstatusMappings.addAPI('myApi', {
                'E': 'INFO'
            });

            expect(rxstatusMappings.getInternalMapping('E'), 'no api provided').to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('E', 'myApi'), 'api provided').to.equal('INFO');
        });

        it('should fall back to global mappings when status not present on API', function () {
            rxstatusMappings.addGlobal({
                'E': 'ERROR'
            });
            expect(rxstatusMappings.getInternalMapping('E', 'myApi'), 'api provided').to.equal('ERROR');
        });
        
    });

    describe('mapToActive', function () {
        it('should accept a single string as a mapping', function () {
            rxstatusMappings.mapToActive('A');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ACTIVE');
        });
        
        it('should accept an array of mappings', function () {
            rxstatusMappings.mapToActive(['A', 'B', 'C']);

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('ACTIVE');
        });

        it('should accept a single API mapping', function () {
            rxstatusMappings.mapToActive('A', 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('ACTIVE');
        });
        
        it('should accept an array of API mappings', function () {
            rxstatusMappings.mapToActive(['A', 'B', 'C'], 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('B');
            expect(rxstatusMappings.getInternalMapping('B', 'myApi')).to.equal('ACTIVE');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('C');
            expect(rxstatusMappings.getInternalMapping('C', 'myApi')).to.equal('ACTIVE');
        });
    });
    
    describe('mapToInfo', function () {
        it('should accept a single string as a mapping', function () {
            rxstatusMappings.mapToInfo('A');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('INFO');
        });
        
        it('should accept an array of mappings', function () {
            rxstatusMappings.mapToInfo(['A', 'B', 'C']);

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('INFO');
        });

        it('should accept a single API mapping', function () {
            rxstatusMappings.mapToInfo('A', 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('INFO');
        });
        
        it('should accept an array of API mappings', function () {
            rxstatusMappings.mapToInfo(['A', 'B', 'C'], 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('B');
            expect(rxstatusMappings.getInternalMapping('B', 'myApi')).to.equal('INFO');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('C');
            expect(rxstatusMappings.getInternalMapping('C', 'myApi')).to.equal('INFO');
        });
    });
    
    describe('mapToWarning', function () {
        it('should accept a single string as a mapping', function () {
            rxstatusMappings.mapToWarning('A');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('WARNING');
        });
        
        it('should accept an array of mappings', function () {
            rxstatusMappings.mapToWarning(['A', 'B', 'C']);

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('WARNING');
        });

        it('should accept a single API mapping', function () {
            rxstatusMappings.mapToWarning('A', 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('WARNING');
        });
        
        it('should accept an array of API mappings', function () {
            rxstatusMappings.mapToWarning(['A', 'B', 'C'], 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('B');
            expect(rxstatusMappings.getInternalMapping('B', 'myApi')).to.equal('WARNING');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('C');
            expect(rxstatusMappings.getInternalMapping('C', 'myApi')).to.equal('WARNING');
        });
    });
    
    describe('mapToError', function () {
        it('should accept a single string as a mapping', function () {
            rxstatusMappings.mapToError('A');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ERROR');
        });
        
        it('should accept an array of mappings', function () {
            rxstatusMappings.mapToError(['A', 'B', 'C']);

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('ERROR');
        });

        it('should accept a single API mapping', function () {
            rxstatusMappings.mapToError('A', 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('ERROR');
        });
        
        it('should accept an array of API mappings', function () {
            rxstatusMappings.mapToError(['A', 'B', 'C'], 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('B');
            expect(rxstatusMappings.getInternalMapping('B', 'myApi')).to.equal('ERROR');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('C');
            expect(rxstatusMappings.getInternalMapping('C', 'myApi')).to.equal('ERROR');
        });
    });
    
    describe('mapToPending', function () {
        it('should accept a single string as a mapping', function () {
            rxstatusMappings.mapToPending('A');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('PENDING');
        });
        
        it('should accept an array of mappings', function () {
            rxstatusMappings.mapToPending(['A', 'B', 'C']);

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('PENDING');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('PENDING');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('PENDING');
        });

        it('should accept a single API mapping', function () {
            rxstatusMappings.mapToPending('A', 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('PENDING');
        });
        
        it('should accept an array of API mappings', function () {
            rxstatusMappings.mapToPending(['A', 'B', 'C'], 'myApi');

            expect(rxstatusMappings.getInternalMapping('A')).to.equal('A');
            expect(rxstatusMappings.getInternalMapping('A', 'myApi')).to.equal('PENDING');
            expect(rxstatusMappings.getInternalMapping('B')).to.equal('B');
            expect(rxstatusMappings.getInternalMapping('B', 'myApi')).to.equal('PENDING');
            expect(rxstatusMappings.getInternalMapping('C')).to.equal('C');
            expect(rxstatusMappings.getInternalMapping('C', 'myApi')).to.equal('PENDING');
        });
    });

    describe('getInternalMapping', function () {
        it('should return back the input if it is not found in a map', function () {
            expect(rxstatusMappings.getInternalMapping('foo')).to.equal('foo');
        });
    });
});
