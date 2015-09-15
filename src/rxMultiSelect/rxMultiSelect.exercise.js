var rxMultiSelect = require('./rxMultiSelect.page').rxMultiSelect;

/**
   rxMultiSelect exercises.
   @exports encore.exercise.rxMultiSelect
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {rxMultiSelect} [options.instance=rxMultiSelect.main] - Component to exercise.
   @example
   ```js
   describe('default exercises', encore.exercise.rxMultiSelect({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.rxMultiSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxMultiSelect.main
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should start exercising defaults now');

    };
};
