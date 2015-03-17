/* jshint node: true */

describe('rxCharacterCount', function () {
    var originalScope, scope, compile, rootScope, el;
    var initialTemplate = '<textarea ng-model="initComment" rx-character-count></textarea>';
    var defaultTemplate = '<textarea ng-model="comment" rx-character-count></textarea>';
    var maxCharsTemplate = '<textarea ng-model="comment" rx-character-count max-characters="50"></textarea>';
    var noTrimTemplate = '<textarea ng-model="comment" rx-character-count max-characters="50" ng-trim="false">' +
                         '</textarea>';
    var boundaryTemplate = '<textarea ng-model="comment" rx-character-count max-characters="20" low-boundary="5">' +
                           '</textarea>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxCharacterCount');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            rootScope = $rootScope;
            originalScope = $rootScope.$new();
            originalScope.comment = '';
            originalScope.initComment = 'I have an initial value';
            compile = $compile;
        });

    });

    // Originate the text change from the element
    // so that the ngChange function is executed
    var changeText = function (el, text) {
        el.val(text).triggerHandler('input');
        originalScope.$digest();
    };

    describe('initialTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(initialTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should initialize `remaining` based on the initial model value', function () {
            expect(scope.remaining).to.equal(231);
        });
    });

    describe('defaultTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(defaultTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should have sane defaults ', function () {
            expect(scope.remaining).to.equal(254);
            expect(el.find('.character-countdown').hasClass('near-limit')).to.be.false;
            expect(el.find('.character-countdown').hasClass('over-limit')).to.be.false;
        });

        it('should update `remaining` when the model changes', function () {
            expect(scope.remaining).to.equal(254);

            changeText(el, 'foo');
            expect(scope.remaining).to.equal(251);
        });
    });

    describe('boundaryTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(boundaryTemplate, compile, originalScope);
            scope = el.scope();
        });
        
        it('should let you pass in a custom lowBoundary', function () {
            expect(scope.nearLimit).to.be.false;
            
            changeText(el, '1234567890123456');
            expect(scope.nearLimit).to.be.true;
        });
    });

    describe('maxCharsTemplate', function () {
        beforeEach(function () {
            el = helpers.createDirective(maxCharsTemplate, compile, originalScope);
            scope = el.scope();
        });

        it('should let you pass in a custom maxCharacters', function () {
            expect(scope.remaining).to.equal(50);
        });
        
        it('should set nearLimit to true when we drop below', function () {
            expect(scope.nearLimit).to.be.false;

            // Pass in 40 characters, should not be below limit
            changeText(el, '1234567890123456789012345678901234567890');
            expect(scope.nearLimit).to.be.false;
            
            // Pass in 41 characters, should be below limit
            changeText(el, '12345678901234567890123456789012345678901');
            expect(scope.nearLimit).to.be.true;
        });

        it('should set overLimit when we drop below 0', function () {

            expect(scope.nearLimit).to.be.false;

            // Pass in 40 characters, should not be below limit
            changeText(el, '1234567890123456789012345678901234567890');
            expect(scope.nearLimit, 'near, 40 chars').to.be.false;
            expect(scope.overLimit, 'over, 40 chars').to.be.false;
            
            // Pass in 50 characters, should be below limit, but not over
            changeText(el, '12345678901234567890123456789012345678901234567890');
            expect(scope.nearLimit, 'near, 50 chars').to.be.true;
            expect(scope.overLimit, 'over, 50 chars').to.be.false;
            
            // Pass in 51 characters, should be over, but not below
            changeText(el, '123456789012345678901234567890123456789012345678901');
            expect(scope.nearLimit, 'near, 51 chars').to.be.false;
            expect(scope.overLimit, 'over, 51 chars').to.be.true;
        });
    });

    describe('character highlighting', function () {

        describe('with ngTrim', function ()  {

            beforeEach(function () {
                el = helpers.createDirective(maxCharsTemplate, compile, originalScope);
                scope = el.scope();
            });

            it('should not count leading spaces when spliting text on the limit', function () {
                var str = '     123456789012345678901234567890123456789012345';

                // Pass in 50 characters, should not be below limit
                changeText(el, str);
                expect(scope.underLimitText).to.equal(str);
                expect(scope.overLimitText).to.equal('');

                // Pass in 55 characters, should be below limit, but not over
                changeText(el, str + '67890');
                expect(scope.underLimitText).to.equal(str + '67890');
                expect(scope.overLimitText).to.equal('');

                // Pass in 56 characters, should be over limit, but not below
                changeText(el, str + '678901');
                expect(scope.underLimitText).to.equal(str + '67890');
                expect(scope.overLimitText).to.equal('1');
            });

            it('should not include trailing whitespace over the limit', function () {
                // Pass in 55 characters, including 4 trailing spaces
                var str = '12345678901234567890123456789012345678901234567890';
                changeText(el, str + '1    ');
                expect(scope.underLimitText).to.equal(str);
                expect(scope.overLimitText).to.equal('1');
            });

        });

        describe('without ngTrim', function () {

            beforeEach(function () {
                el = helpers.createDirective(noTrimTemplate, compile, originalScope);
                scope = el.scope();
            });

            it('should count leading spaces when spliting text on the limit', function () {
                var str = '     123456789012345678901234567890123456789012345';

                // Pass in 50 characters, should be below limit, but not over
                changeText(el, str);
                expect(scope.underLimitText).to.equal(str);
                expect(scope.overLimitText).to.equal('');

                // Pass in 51 characters, should be over limit, but not below
                changeText(el, str + '6');
                expect(scope.underLimitText).to.equal(str);
                expect(scope.overLimitText).to.equal('6');
            });

            it('should include trailing whitespace over the limit', function () {
                // Pass in 55 characters, including 4 trailing spaces
                var str = '12345678901234567890123456789012345678901234567890';
                changeText(el, str + '1    ');
                expect(scope.underLimitText).to.equal(str);
                expect(scope.overLimitText).to.equal('1    ');
            });

        });

    });

});
