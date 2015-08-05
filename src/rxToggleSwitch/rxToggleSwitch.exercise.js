var _ = require('lodash');
var rxToggleSwitch = require('./rxToggleSwitch.page').rxToggleSwitch;

/**
   rxToggleSwitch exercises.
   @exports encore.exercise.rxToggleSwitch
   @param {Object} [options] - Test options. Used to build valid tests.
   @param {rxToggleSwitch} [options.instance=] - Component to exercise.
   @param {string} [options.cssSelector=] - DEPRECATED: Fallback selector string to initialize widget with.
   @param {boolean} [options.disabled=false] - Determines if the switch can be toggled
   @example
   ```js
   describe('default exercises', encore.exercise.rxToggleSwitch({
       cssSelector: myPage.emailPreference // select one of many widgets from your page objects
   }));
   ```
 */
exports.rxToggleSwitch = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false
    });

    return function () {
        var component;
        var initialState;

        var getText = function (isEnabled) {
            return isEnabled ? 'ON' : 'OFF';
        };

        var toggle = function () {
            return component.isEnabled().then(function (enabled) {
                enabled ? component.disable() : component.enable();
            });
        };

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxToggleSwitch.main;
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxToggleSwitch.initialize($(options.cssSelector));
            }

            component.isEnabled().then(function (isEnabled) {
                initialState = isEnabled;
            });
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        if (options.disabled) {
            it('does not change state when clicked', function () {
                toggle();
                expect(component.isEnabled()).to.eventually.equal(initialState);
                expect(component.text).to.eventually.equal(getText(initialState));
            });
        } else {
            it('is in the ' + getText(initialState) + ' state', function () {
                expect(component.text).to.eventually.equal(getText(initialState));
            });

            it('changes to ' + getText(!initialState) + ' when clicked', function () {
                toggle();
                expect(component.isEnabled()).to.eventually.equal(!initialState);
                expect(component.text).to.eventually.equal(getText(!initialState));
            });

            it('returns to the ' + getText(initialState) + ' when clicked again', function () {
                toggle();
                expect(component.isEnabled()).to.eventually.equal(initialState);
                expect(component.text).to.eventually.equal(getText(initialState));
            });
        }

    };
};
