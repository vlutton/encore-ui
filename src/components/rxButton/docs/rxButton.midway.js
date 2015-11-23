var rxButtonPage = encore.rxButton;

describe('rxButton', function () {
    var rxButton;

    before(function () {
        demoPage.go('#/components/rxButton');
        rxButton = rxButtonPage.initialize($('rx-button'));
    });

    it('should show element', function () {
        expect(rxButton.rootElement.isDisplayed()).to.eventually.be.true;
    });
});
