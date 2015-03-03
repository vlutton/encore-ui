var _ = require('lodash');
var rxCharacterCount = require('./rxCharacterCount.page').rxCharacterCount;

/**
   rxCharacterCount exercises.
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {string} [options.cssSelector=] - Fallback selector string to initialize widget with.
   @example
   ```js
   describe('default exercises', encore.exercise.rxCharacterCount({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.rxCharacterCount = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, { /* defaults go here */ });

    return function () {
        var component;

        before(function () {
            if (options.cssSelector === undefined) {
                component = rxCharacterCount.main;
            } else {
                component = rxCharacterCount.initialize(options.cssSelector);
            }
        });

        it('should start exercising defaults now');

    };
};
