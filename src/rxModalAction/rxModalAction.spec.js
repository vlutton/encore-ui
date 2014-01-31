/* jshint node: true */

describe('rxModalAction', function () {
    var el, scope, compile, rootScope, mockModal, modalApi, instanceApi, instanceMock,
        validTemplate = '<rx-modal-action ' +
                            'template-url="test.html" ' +
                            'post-hook="post()" ' +
                            'pre-hook="pre()" ' +
                            '>Title</rx-modal-action>';

    var setupModalCtrl = function (ctrl) {
        var ctrlScope = {};

        ctrl(ctrlScope, instanceApi);

        return ctrlScope;
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
            dismiss: function () {},
        };
        instanceMock = sinon.mock(instanceApi);

        // Provide any mocks needed
        module(function ($provide) {
            mockModal = sinon.mock(modalApi);
            $provide.value('$modal', modalApi);
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            scope.postAction = sinon.spy();

            compile = $compile;
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

        var ctrlScope = setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        ctrlScope.submit();

        instanceMock.verify();
    });

    it('should dismiss modal on cancel', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        instanceMock.expects('close').never();
        instanceMock.expects('dismiss').once();

        var ctrlScope = setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        ctrlScope.cancel();

        instanceMock.verify();
    });

    it('should focus on calling link after submitting', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.spy(link, 'focus');

        var ctrlScope = setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        ctrlScope.submit();

        sinon.assert.calledOnce(link.focus);
    });

    it('should focus on calling link after cancelling or submitting', function () {
        var link = el.find('a')[0];

        helpers.clickElement(link);

        sinon.spy(link, 'focus');

        var ctrlScope = setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        ctrlScope.cancel();

        helpers.clickElement(link);

        ctrlScope.submit();

        sinon.assert.calledTwice(link.focus);
    });

    it('should run prehook function before open', function () {
        scope.pre = sinon.spy();

        el.scope().showModal({ preventDefault: function () {} });

        expect(scope.pre.callCount).to.equal(1);
    });

    it('should run posthook function after close', function () {
        scope.post = sinon.spy();

        el.scope().showModal({ preventDefault: function () {} });

        var ctrlScope = setupModalCtrl(modalApi.open.getCall(0).args[0].controller);

        ctrlScope.submit();

        expect(scope.post.callCount).to.equal(1);
    });
});