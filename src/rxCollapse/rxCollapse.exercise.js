var _ = require('lodash');
var rxCollapse = require('./rxCollapse.page').rxCollapse;

/**
   rxCollapse exercises.
   @exports encore.exercise.rxCollapse
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {string} [options.cssSelector=] - Fallback selector string to initialize widget with.
   @example
   ```js
   describe('default exercises', encore.exercise.rxCollapse({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.rxCollapse = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        hasTitle: true,
        expanded: true,
    });

    return function () {
        var component;

        before(function () {
            if (options.cssSelector === undefined) {
                component = rxCollapse.main;
            } else {
                component = rxCollapse.initialize($(options.cssSelector));
            }
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should expand and collapse with toggle', function () {
            expect(component.isExpanded).to.eventually.eq(options.expanded);

            // Collapse
            component.toggle();
            expect(component.isExpanded).to.eventually.eq(!options.expanded);

            // Expand
            component.toggle();
            expect(component.isExpanded).to.eventually.eq(options.expanded);
        });
        
        if (options.hasTitle) {
            it('should show a custom title', function () {
                expect(component.titleText()).to.eventually.equal('A Custom Title');
            });
        } else {
            it('should show see more for title of other version', function () {
                expect(component.titleText()).to.eventually.equal('See More');
            });

            it('should toggle between see more or see less as text', function () {
                //Expand
                component.toggle();
                expect(component.titleText()).to.eventually.equal('See Less');

                //Collapse
                component.toggle();
                expect(component.titleText()).to.eventually.equal('See More');
            });
        }

    };
};
