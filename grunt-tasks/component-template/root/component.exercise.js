var {%= name %} = require('./{%= name %}.page').{%= name %};

/**
   {%= name %} exercises.
   @exports encore.exercise.{%= name %}
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {{%= name %}} [options.instance={%= name %}.main] - Component to exercise.
   @example
   ```js
   describe('default exercises', encore.exercise.{%= name %}({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.{%= name %} = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: {%= name %}.main
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should start exercising defaults now');

    };
};
