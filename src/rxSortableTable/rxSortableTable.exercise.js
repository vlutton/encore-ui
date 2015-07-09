var rxSortableTable = require('./rxSortableTable.page').rxSortableTable;

/**
   rxSortableTable exercises.
   @exports encore.exercise.rxSortableTable
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {string} [options.cssSelector=] - Fallback selector string to initialize widget with.
   @example
   ```js
   describe('default exercises', encore.exercise.rxSortableTable({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.rxSortableTable = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, { /* defaults go here */ });

    return function () {
        var component;

        before(function () {
            if (options.cssSelector === undefined) {
                component = rxSortableTable.main;
            } else {
                component = rxSortableTable.initialize($(options.cssSelector));
            }
        });

        it('should start exercising defaults now');

    };
};
