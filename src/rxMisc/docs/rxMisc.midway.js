var _ = require('lodash');
var Page = require('astrolabe').Page;

var rxForm = require('../../rxForm/rxForm.page').rxForm;
var rxNotify = require('../../rxNotify/rxNotify.page').rxNotify;

// "wait" for autosave to clear -- function passed to `browser.wait`
var forAutoSaveToClear = function () {
    return rxNotify.all.exists('rxAutoSave data has been cleared!');
};

// anonymous page object
var autoSaving = Page.create({

    form: {
        set: function (formData) {
            rxForm.form.fill(this, formData);
        }
    },

    chkAutoSaves: {
        get: function () {
            return element(by.model('formData.checkbox'));
        }
    },

    checkbox: {
        get: function () {
            return rxForm.checkbox.initialize(this.chkAutoSaves).isSelected();
        },
        set: function (enable) {
            var checkbox = rxForm.checkbox.initialize(this.chkAutoSaves);
            enable ? checkbox.select() : checkbox.unselect();
        }
    },

    txtName: {
        get: function () {
            return element(by.model('formData.name'));
        }
    },

    name: {
        get: function () {
            return this.txtName.getAttribute('value');
        },
        set: function (input) {
            this.txtName.clear();
            this.txtName.sendKeys(input);
        }
    },

    txtDescription: {
        get: function () {
            return element(by.model('formData.description'));
        }
    },

    description: {
        get: function () {
            return this.txtDescription.getAttribute('value');
        },
        set: function (input) {
            this.txtDescription.clear();
            this.txtDescription.sendKeys(input);
        }
    },

    txtSensitive: {
        get: function () {
            return element(by.model('formData.sensitive'));
        }
    },

    sensitiveData: {
        get: function () {
            return this.txtSensitive.getAttribute('value');
        },
        set: function (input) {
            this.txtSensitive.clear();
            this.txtSensitive.sendKeys(input);
        }
    },

    clearAutoSave: {
        value: function () {
            element(by.buttonText('Clear rxAutoSave')).click();
            browser.wait(forAutoSaveToClear);
        }
    },

    clearAutoSaveWithPromise: {
        value: function () {
            element(by.buttonText('Clear rxAutoSave by resolving a promise')).click();
            browser.wait(forAutoSaveToClear);
        }
    }

});

describe('rxMisc', function () {

    before(function () {
        demoPage.go('#/component/rxMisc');
    });

    describe('rxAutoSave', function () {
        var autoSavedData = {
            checkbox: true,
            name: 'Canadian Armed Forces',
            description: ['Using snow as cover, leap from your hiding spot to',
                          'surprise your enemy in a display of tactical brilliance.',
                          'In order to prevent your outfit from soaking',
                          '(later risking hypothermia) you must wear the least',
                          'amount of clothes possible to stay dry through the night.'].join(' '),
            sensitiveData: 'Only Jay Parlar knows where the Candian Armed Forces lie in wait!'
        };

        var leavePage = function () {
            demoPage.go('#/component/rxPaginate');
            demoPage.go('#/component/rxMisc');
        };

        before(function () {
            autoSaving.form = autoSavedData;
            leavePage();
        });

        _.forEach(autoSavedData, function (data, property) {
            it('should remember the form data for ' + property, function () {
                if (property === 'sensitiveData') {
                    expect(autoSaving[property]).to.eventually.equal('');
                } else {
                    expect(autoSaving[property]).to.eventually.equal(data);
                }
            });
        });

        describe('should clear auto saved data', function () {

            before(function () {
                autoSaving.clearAutoSave();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), function (property) {
                it('should not remember the form data for ' + property, function () {
                    expect(autoSaving[property]).to.eventually.be.not.ok;
                });
            });

        });

        describe('should clear auto saved data with a promise', function () {

            before(function () {
                autoSaving.form = autoSavedData;
                autoSaving.clearAutoSaveWithPromise();
                leavePage();
            });

            _.forEach(_.keys(autoSavedData), function (property) {
                it('should not remember the form data for ' + property, function () {
                    expect(autoSaving[property]).to.eventually.be.not.ok;
                });
            });

        });

    });

});
