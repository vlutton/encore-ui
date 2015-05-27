var _ = require('lodash');
var rxFieldName = require('./rxFieldName.page').rxFieldName;

/**
 * rxFieldName exercises.
 * @exports encore.exercise.rxFieldName
 * @param {Object} [options=] - Test options. Used to build valid tests.
 * @param {string} [options.cssSelector=] - Fallback selector string to initialize widget with.
 * @param {string} [options.visible=true] - Determines if the field name is visible
 * @param {string} [options.present=true] - Determines if the field name is present in the DOM
 * @param {string} [options.required=false] - Determines if the field name displays as required
 */
exports.rxFieldName = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        visible: true,
        present: true,
        required: false
    });

    return function () {
        var component;

        before(function () {
            if (options.cssSelector === undefined) {
                component = rxFieldName.main;
            } else {
                component = rxFieldName.initialize($(options.cssSelector));
            }
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.present === true) {
            it('should be present', function () {
                expect(component.isPresent()).to.eventually.be.true;
            });

            it('symbol should be present', function () {
                expect(component.isSymbolPresent()).to.eventually.be.true;
            });
        } else {
            it('should not be present', function () {
                expect(component.isPresent()).to.eventually.be.false;
            });

            it('symbol should not be present', function () {
                expect(component.isSymbolPresent()).to.eventually.be.false;
            });
        }

        if (options.required === true) {
            it('symbol should be visible', function () {
                expect(component.isSymbolVisible()).to.eventually.be.true;
            });
        } else {
            it('symbol should not be visible', function () {
                expect(component.isSymbolVisible()).to.eventually.be.false;
            });
        }
    };
};
