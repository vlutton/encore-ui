/* jshint node: true */

describe('rxToggleSwitch', function () {
    var scope, timeout, compile, rootScope, directiveScope, el, disabledEL, customEL, postHookEL,
        validTemplate = '<rx-toggle-switch ng-model="model"></rx-toggle-switch>',
        disabledTemplate = '<rx-toggle-switch ng-model="model" disabled="true"></rx-toggle-switch>',
        postHookTemplate = '<rx-toggle-switch ng-model="model" post-hook="countMe(newVal, oldVal)"></rx-toggle-switch>',
        customTemplate =
            '<rx-toggle-switch ng-model="customModel" true-value="TEST" false-value="TEST-FALSY"></rx-toggle-switch>';

    beforeEach(function () {
        module('encore.ui.rxToggleSwitch');
        module('templates/rxToggleSwitch.html');

        inject(function ($rootScope, $compile, $timeout) {
            timeout = $timeout;
            rootScope = $rootScope;
            compile = $compile;
            scope = $rootScope.$new();
            scope.countMe = sinon.stub();

            scope.countMe.withArgs('TEST-FALSY', 'TEST').returns('custom');
            scope.model = true;
            scope.customModel = 'TEST';
        });

        el = helpers.createDirective(validTemplate, compile, scope);
        el = helpers.getChildDiv(el, 'rx-toggle-switch', 'class');

        disabledEL = helpers.createDirective(disabledTemplate, compile, scope);
        disabledEL = helpers.getChildDiv(disabledEL, 'rx-toggle-switch', 'class');

        customEL = helpers.createDirective(customTemplate, compile, scope);
        customEL = helpers.getChildDiv(customEL, 'rx-toggle-switch', 'class');

        postHookEL = helpers.createDirective(postHookTemplate, compile, scope);
        postHookEL = helpers.getChildDiv(postHookEL, 'rx-toggle-switch', 'class');
    });

    afterEach(function () {
        el = null;
        disabledEL = null;
        directiveScope = null;
        customEL = null;
        postHookEL = null;
    });

    it('should render template correctly', function () {
        expect(el).to.not.be.empty;
        expect(el.hasClass('rx-toggle-switch')).to.be.true;
        expect(el.hasClass('on')).to.be.true;
        expect(helpers.getChildDiv(el, 'knob', 'class')).not.be.empty;
    });

    it('should switch the model value when update is called', function () {
        directiveScope = el.scope();

        expect(el.hasClass('on')).to.be.true;

        expect(scope.model).to.be.true;
        directiveScope.update(scope.model);
        scope.$apply();
        expect(scope.model).to.be.false;

        expect(el.hasClass('on')).to.be.false;
        sinon.assert.notCalled(scope.countMe);

        expect(scope.model).to.be.false;
        directiveScope.update(scope.model);
        scope.$apply();
        expect(scope.model).to.be.true;

        expect(el.hasClass('on')).to.be.true;
    });

    it('should render disabled template correctly', function () {
        expect(disabledEL.attr('disabled')).to.not.be.empty;
    });

    it('should NOT switch the model value when switch is called (disabled)', function () {
        directiveScope = disabledEL.scope();

        expect(scope.model).to.be.true;
        directiveScope.update(scope.model);
        scope.$apply();
        expect(scope.model).to.be.true;

        expect(disabledEL.hasClass('on')).to.be.true;
    });

    it('should render custom values template correctly', function () {
        directiveScope = customEL.scope();

        expect(scope.customModel).to.be.eq('TEST');
        directiveScope.update(scope.customModel);
        scope.$apply();
        expect(scope.customModel).to.be.eq('TEST-FALSY');
    });

    it('should call posthook when updating value', function () {
        directiveScope = postHookEL.scope();

        expect(scope.model).to.be.true;
        directiveScope.update(scope.model);
        timeout.flush(1);
        scope.$apply();
        expect(scope.model).to.be.false;
        sinon.assert.calledOnce(scope.countMe);
    });
});
