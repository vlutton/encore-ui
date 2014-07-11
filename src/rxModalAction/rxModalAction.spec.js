/* jshint node: true */

describe('rxModalForm', function () {
    var el, scope, compile, rootScope, timeout;

    var rxModalForm = '<rx-modal-form>${ fields }</rx-modal-form>';
    var hiddenInput = '<input type="hidden">';
    var textInput = '<input type="text">';
    var autofocusInput = '<input type="text" autofocus>';
    var textarea = '<textarea></textarea>';
    var selectBox = '<select><option>foo</option></select>';

    beforeEach(function () {
        module('encore.ui.rxModalAction');
        module('templates/rxModalActionForm.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $timeout) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            timeout = $timeout;
        });
    });

    it('should focus on first tabbable element', function () {
        var formHtml = _.template(rxModalForm, {
            fields: textInput + textarea
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var input = el.find('input')[0];
        var secondFocusable = el.find('textarea')[0];

        sinon.spy(input, 'focus');
        sinon.spy(secondFocusable, 'focus');

        timeout.flush();

        expect(input.focus.calledOnce).to.be.true;

        // should only focus the first element
        expect(secondFocusable.focus.called).to.be.false;
    });

    it('should focus on select and textareas', function () {
        // going to re-use this for our different elements
        var focusable;

        var formHtml = _.template(rxModalForm, {
            fields: textarea
        });

        el = helpers.createDirective(formHtml, compile, scope);

        focusable = el.find('textarea')[0];

        sinon.spy(focusable, 'focus');

        timeout.flush();

        expect(focusable.focus.calledOnce).to.be.true;

        // now check the select box
        formHtml = _.template(rxModalForm, {
            fields: selectBox
        });

        el = helpers.createDirective(formHtml, compile, scope);

        focusable = el.find('select')[0];

        sinon.spy(focusable, 'focus');

        timeout.flush();

        expect(focusable.focus.calledOnce).to.be.true;
    });

    it('should not focus on hidden input element', function () {
        var formHtml = _.template(rxModalForm, {
            fields: hiddenInput + textInput
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var inputs = el.find('input');

        sinon.spy(inputs[0], 'focus');
        sinon.spy(inputs[1], 'focus');

        timeout.flush();

        expect(inputs[0].focus.called).to.be.false;
        expect(inputs[1].focus.calledOnce).to.be.true;
    });

    it('should prioritize elements with an autofocus attribute', function () {
        var formHtml = _.template(rxModalForm, {
            fields: textInput + autofocusInput
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var inputs = el.find('input');

        sinon.spy(inputs[0], 'focus');
        sinon.spy(inputs[1], 'focus');

        timeout.flush();

        expect(inputs[0].focus.called).to.be.false;
        expect(inputs[1].focus.calledOnce).to.be.true;
    });
});

describe('rxModalAction', function () {
    var el, scope, compile, rootScope, mockModal, modalApi, instanceApi, instanceMock, controller;
    var validTemplate = '<rx-modal-action ' +
                            'template-url="test.html" ' +
                            'post-hook="post()" ' +
                            'pre-hook="pre()" ' +
                            '>Title</rx-modal-action>';

    var setupModalCtrl = function (ctrl) {
        controller(ctrl, {
            $scope: scope,
            $modalInstance: instanceApi
        });
    };

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.rxModalAction');

        // load the template
        module('templates/rxModalAction.html');
        module('templates/rxModalActionForm.html');

        modalApi = {
            open: sinon.stub().returns({
                result: {
                    then: function (onSubmit, onCancel) {
                        instanceApi.close = onSubmit;
                        instanceApi.dismiss = onCancel;
                    }
                }
            })
        };

        instanceApi = {
            close: function () {},
            dismiss: function () {}
        };
        instanceMock = sinon.mock(instanceApi);

        // Provide any mocks needed
        module(function ($provide) {
            mockModal = sinon.mock(modalApi);
            $provide.value('$modal', modalApi);
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $controller) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            scope.postAction = sinon.spy();

            compile = $compile;
            controller = $controller;
        });

        el = helpers.createDirective(validTemplate, compile, scope);

        scope.$digest();
    });

    afterEach(function () {
        // zero out link element
        el = null;
    });

    it('should create a link to open a modal', function () {
        var link = el.find('a');

        expect(link).to.exist;
        expect(link.text()).to.equal('Title');
    });

    it('should create a new modal on click', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.assert.calledOnce(modalApi.open);
        expect(modalApi.open.args[0][0]).to.include.keys(['templateUrl','controller','scope']);
    });

    it('should close on submit', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').once();
        instanceMock.expects('dismiss').never();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();

        instanceMock.verify();
    });

    it('should dismiss modal on cancel', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').once();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.cancel();

        instanceMock.verify();
    });

    it('should dismiss modal on routeChange', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').once();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        // fake a route change
        rootScope.$broadcast('$routeChangeSuccess');

        instanceMock.verify();
    });

    it('should focus on calling link after submitting', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.spy(link, 'focus');

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();

        sinon.assert.calledOnce(link.focus);
    });

    it('should focus on calling link after cancelling or submitting', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.spy(link, 'focus');

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.cancel();

        helpers.clickElement(link);

        scope.submit();

        sinon.assert.calledTwice(link.focus);
    });

    it('should run prehook function before open', function () {
        scope.pre = sinon.spy();

        el.scope().showModal({ preventDefault: function () {}});

        expect(scope.pre.callCount).to.equal(1);
    });

    it('should run posthook function after close', function () {
        scope.post = sinon.spy();

        el.scope().showModal({ preventDefault: function () {}});

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();

        expect(scope.post.callCount).to.equal(1);
    });

    it('should update callCounts but not close the modal', function () {
        var overridingTemplate = '<rx-modal-action ' +
                                     'controller="rxTestCtrl" ' +
                                     'template-url="test.html" ' +
                                     'post-hook="post()" ' +
                                     'pre-hook="pre()" ' +
                                     '>Title</rx-modal-action>';

        scope.rxTestCtrl = function ($scope) {
            $scope.count = 0;
            $scope.submit = sinon.spy();
        };

        controller('rxTestCtrl', {
            $scope: scope,
            $modalInstance: instanceApi
        });

        el = helpers.createDirective(overridingTemplate, compile, scope);

        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').never();

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.submit();
        expect(scope.submit.callCount).to.equal(1);
    });
});