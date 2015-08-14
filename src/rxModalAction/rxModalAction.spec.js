/* jshint node: true */

describe('rxModalForm', function () {
    var el, scope, compile, rootScope, timeout;

    var rxModalForm = '<rx-modal-form>${ fields }</rx-modal-form>';
    var hiddenInput = '<input type="hidden">';
    var disabledInput = '<input disabled="disabled">';
    var textInput = '<input type="text">';
    var autofocusInput = '<input type="text" autofocus>';
    var textarea = '<textarea></textarea>';
    var selectBox = '<select><option>foo</option></select>';

    beforeEach(function () {
        // The footers template must be loaded first because it is used in .run
        module('templates/rxModalFooters.html');

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

    it('should inject the modal footers into the template', function () {
        var formHtml = _.template(rxModalForm, {
            fields: textInput + textarea
        });

        el = helpers.createDirective(formHtml, compile, scope);

        expect(el.children('div.modal-footer').children().attr('ng-switch')).to.equal('state');
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

        expect(input.focus).to.be.calledOnce;

        // should only focus the first element
        expect(secondFocusable.focus).to.not.be.called;
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

        expect(focusable.focus).to.be.calledOnce;

        // now check the select box
        formHtml = _.template(rxModalForm, {
            fields: selectBox
        });

        el = helpers.createDirective(formHtml, compile, scope);

        focusable = el.find('select')[0];

        sinon.spy(focusable, 'focus');

        timeout.flush();

        expect(focusable.focus).to.be.calledOnce;
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

        expect(inputs[0].focus).to.not.be.called;
        expect(inputs[1].focus).to.be.calledOnce;
    });

    it('should not focus on disabled input element', function () {
        var formHtml = _.template(rxModalForm, {
            fields: disabledInput + textInput
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var inputs = el.find('input');

        sinon.spy(inputs[0], 'focus');
        sinon.spy(inputs[1], 'focus');

        timeout.flush();

        expect(inputs[0].focus).to.not.be.called;
        expect(inputs[1].focus).to.be.calledOnce;
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

        expect(inputs[0].focus).to.not.be.called;
        expect(inputs[1].focus).to.be.calledOnce;
    });

    describe('when a default focus is specified', function () {
        var focus;

        beforeEach(function () {
            focus = sinon.spy(HTMLElement.prototype, 'focus');
        });

        afterEach(function () {
            focus.restore();
        });

        it('should focus on cancel button when specified', function () {
            var rxModalForm = '<rx-modal-form default-focus="${defaultFocus}">${ fields }</rx-modal-form>';
            var formHtml = _.template(rxModalForm, {
                fields: textInput + textarea + selectBox,
                defaultFocus: 'cancel'
            });

            // The state must be manually written since the modal was not created via rxModalAction
            scope.state = 'editing';
            el = helpers.createDirective(formHtml, compile, scope);

            timeout.flush();

            // should only focus the specified element
            expect(focus).to.have.been.calledOnce;
            expect(focus.firstCall.thisValue.tagName).to.equal('BUTTON');
            expect(focus.firstCall.thisValue.classList.contains('cancel')).to.be.true;

        });

        it('should focus on submit button when specified', function () {
            var rxModalForm = '<rx-modal-form default-focus="${defaultFocus}">${ fields }</rx-modal-form>';
            var formHtml = _.template(rxModalForm, {
                fields: textInput + textarea + selectBox,
                defaultFocus: 'submit'
            });

            // The state must be manually written since the modal was not created via rxModalAction
            scope.state = 'editing';
            el = helpers.createDirective(formHtml, compile, scope);

            timeout.flush();

            // should only focus the specified element
            expect(focus).to.have.been.calledOnce;
            expect(focus.firstCall.thisValue.tagName).to.equal('BUTTON');
            expect(focus.firstCall.thisValue.classList.contains('submit')).to.be.true;

        });

        it('should focus on First Tabbable when anything else is specified', function () {
            var rxModalForm = '<rx-modal-form default-focus="${defaultFocus}">${ fields }</rx-modal-form>';
            var formHtml = _.template(rxModalForm, {
                fields: textInput + textarea + selectBox,
                defaultFocus: 'foo'
            });

            el = helpers.createDirective(formHtml, compile, scope);

            timeout.flush();

            // should only focus the specified element
            expect(focus).to.have.been.calledOnce;
            expect(focus.firstCall.thisValue.tagName).to.equal('INPUT');
        });
    });

    it('should not throw errors if no focusable elements are found', function () {
        var formHtml = _.template(rxModalForm, {
            fields: ''
        });

        var test = function () {
            helpers.createDirective(formHtml, compile, scope);
            timeout.flush();
        };

        expect(test).to.not.throw('focus');
    });
});

describe('rxModalFooterTemplates', function () {
    var rxModalFooterTemplates;

    function wrap (html) {
        return _.template('<div ng-switch="state">${html}</div>', {
            html: html
        });
    }

    beforeEach(function () {
        module('encore.ui.rxModalAction');

        inject(function (_rxModalFooterTemplates_) {
            rxModalFooterTemplates = _rxModalFooterTemplates_;
        });
    });

    _.each(['local', 'global'], function (type) {
        it('should store the templates of ' + type + ' states', function () {
            var fooHtml = '<div>foo</div>';
            rxModalFooterTemplates.add('test', fooHtml, { global: type === 'global' });
            expect(rxModalFooterTemplates.flush()).to.equal(wrap(fooHtml));
        });
    });

    it('should concatenate multiple templates', function () {
        var fooHtml = '<div>foo</div>';
        var barHtml = '<div>bar</div>';
        rxModalFooterTemplates.add('foo', fooHtml, { global: false });
        rxModalFooterTemplates.add('bar', barHtml, { global: false });
        expect(rxModalFooterTemplates.flush()).to.equal(wrap(fooHtml + barHtml));
    });

    it('should overwrite global states with local ones', function () {
        var state = 'test';
        var globalHtml = '<div>foo</div>';
        var localHtml = '<div>bar</div>';
        rxModalFooterTemplates.add(state, globalHtml, { global: true });
        rxModalFooterTemplates.add(state, localHtml, { global: false });
        expect(rxModalFooterTemplates.flush()).to.equal(wrap(localHtml));
    });
});

describe('rxModalFooter', function () {
    var scope, compile, addFooter;

    var footerHtml = '<rx-modal-footer state="testState">foo</rx-modal-footer>';

    beforeEach(function () {
        module('encore.ui.rxModalAction');

        module(function ($provide) {
            addFooter = sinon.stub();
            $provide.value('rxModalFooterTemplates', { add: addFooter });
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    it('should wrap the content in a modal-footer div', function () {
        helpers.createDirective(footerHtml, compile, scope);
        expect(addFooter.firstCall.args[1]).to.equal(
            '<div ng-switch-when="testState">foo</div>'
        );
    });

    it('should save the template with its state', function () {
        helpers.createDirective(footerHtml, compile, scope);
        expect(addFooter).to.have.been.calledOnce;
        expect(addFooter.firstCall.args[0]).to.equal('testState');
    });

    it('should set the global option to false by default', function () {
        helpers.createDirective(footerHtml, compile, scope);
        expect(addFooter.firstCall.args[2]).to.eql({ global: false });
    });

    it('should set the global option to true if the attribute is present', function () {
        var footerHtml = '<rx-modal-footer state="testState" global>foo</rx-modal-footer>';
        helpers.createDirective(footerHtml , compile, scope);
        expect(addFooter.firstCall.args[2]).to.eql({ global: true });
    });
});

describe('rxModalAction', function () {
    var el, scope, compile, rootScope, mockModal, modalApi, instanceApi, instanceMock, controller;
    var validTemplate = '<rx-modal-action ' +
                            'template-url="test.html" ' +
                            'post-hook="post()" ' +
                            'pre-hook="pre()" ' +
                            'dismiss-hook="dismiss()" ' +
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

    it('should run dismiss-hook function after cancel', function () {
        scope.dismiss = sinon.spy();

        el.scope().showModal({ preventDefault: function () {}});

        setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        scope.cancel();

        expect(scope.dismiss.callCount).to.equal(1);
    });

    it('should update callCounts but not close the modal', function () {
        var overridingTemplate = '<rx-modal-action ' +
                                     'controller="rxTestCtrl" ' +
                                     'template-url="test.html" ' +
                                     'post-hook="post()" ' +
                                     'pre-hook="pre()" ' +
                                     'dismiss-hook="dismiss()"' +
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
