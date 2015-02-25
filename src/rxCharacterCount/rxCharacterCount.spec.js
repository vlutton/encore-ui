/* jshint node: true */

describe('rxCharacterCount', function () {
    var originalScope, scope, compile, rootScope, el;
    var defaultTemplate = '<textarea ng-model="comment" rx-character-count></textarea>';
    var maxCharsTemplate = '<textarea ng-model="comment" rx-character-count max-characters="50"></textarea>';
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
            compile = $compile;
        });

    });

    // The only way to get the textarea to fire its ngChange function
    // on text change
    var changeText = function (el, text) {
        el.controller('ngModel').$setViewValue(text);
        originalScope.$digest();
    };

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

});
