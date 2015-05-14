var _ = require('lodash');
var rxCheckbox = require('./rxCheckbox.page').rxCheckbox;

/**
 * @description rxCheckbox exercises
 * @exports encore.exercise.rxCheckbox
 * @param {Object} [options=] - Test options. Used to build valid tests.
 * @param {String} [options.cssSelector=] - Fallback selector string with which to initialize widget.
 * @param {Boolean} [options.disabled=false] - Determines if the checkbox is disabled
 * @param {Boolean} [options.selected=false] - Determines if the checkbox is selected
 * @param {Boolean} [options.visible=true] - Determines if the checkbox is visible
 * @param {Boolean} [options.valid=true] - Determines if the checkbox is valid
 */
exports.rxCheckbox = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        selected: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            if (options.cssSelector === undefined) {
                component = rxCheckbox.main;
            } else {
                component = rxCheckbox.initialize($(options.cssSelector));
            }
        });

        it('should be a checkbox type', function () {
            expect(component.isCheckbox()).to.eventually.be.true;
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isDisabled()).to.eventually.eq(options.disabled);
        });

        it('should ' + (options.selected ? 'be' : 'not be') + ' selected', function () {
            expect(component.isSelected()).to.eventually.eq(options.selected);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
