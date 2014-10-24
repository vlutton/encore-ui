var rxFormPage = require('../rxForm.page.js').rxForm;

describe('rxForm', function () {
    var dropdown;

    before(function () {
        demoPage.go('#/component/rxForm');
        dropdown = rxFormPage.dropdown.initialize(element(by.model('volume.type')));
    });

    it('should have the right number of options', function () {
        expect(dropdown.optionCount()).to.eventually.equal(11);
    });

    it('should have every option listed', function () {
        var options = ['SATA', 'SSD', 'CD', 'DVD', 'BLURAY', 'TAPE', 'FLOPPY',
                       'LASERDISC', 'JAZDRIVE', 'PUNCHCARDS', 'RNA'];
        dropdown.allOptions.then(function (allOptions) {
            expect(Object.keys(allOptions)).to.eql(options);
        });
    });

    it('should have a selected option by default', function () {
        expect(dropdown.selectedOption.isSelected()).to.eventually.be.true;
    });

    it('should not report a different option as selected', function () {
        expect(dropdown.option('CD').isSelected()).to.eventually.be.false;
    });

    it('should report non-existing options', function () {
        expect(dropdown.optionExists('DDR4')).to.eventually.be.false;
    });

    it('should report existing options', function () {
        expect(dropdown.optionExists('PUNCHCARD')).to.eventually.be.true;
    });

    it('should select a new option', function () {
        dropdown.select('DVD');
        expect(dropdown.selectedOption.text).to.eventually.equal('DVD');
    });

    it('should have a value', function () {
        expect(dropdown.selectedOption.value).to.eventually.equal('DVD');
    });

});
