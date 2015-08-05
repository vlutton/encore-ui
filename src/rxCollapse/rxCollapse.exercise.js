var _ = require('lodash');
var rxCollapse = require('./rxCollapse.page').rxCollapse;

/**
   rxCollapse exercises.
   @exports encore.exercise.rxCollapse
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {rxCollapse} [options.instance=] - Component to exercise.
   @param {string} [options.cssSelector=] - DEPRECATED: Fallback selector string to initialize widget with.
   @param {String} title - The title of the rxCollapse element.
   @param {Boolean} expanded - Whether or not the rxCollapse element is currently expanded.
   @example
   ```js
   describe('default exercises', encore.exercise.rxCollapse({
       instance: myPage.hiddenSection, // select one of many widgets from your page objects
       title: 'My Custom rxCollapse Element',
       expanded: true
   }));
   ```
 */
exports.rxCollapse = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        title: undefined,
        expanded: false,
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxCollapse.main;
            }

            if (options.cssSelector !== undefined) {
                component = rxCollapse.initialize($(options.cssSelector));
            }
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should expand and collapse with toggle', function () {
            expect(component.isExpanded()).to.eventually.eq(options.expanded);

            component.toggle();
            expect(component.isExpanded()).to.eventually.eq(!options.expanded);

            component.toggle();
            expect(component.isExpanded()).to.eventually.eq(options.expanded);
        });

        if (!_.isUndefined(options.title)) {
            it('should show a custom title', function () {
                expect(component.title).to.eventually.equal(options.title);
            });
        } else {
            it('should show "See More" for the title', function () {
                expect(component.title).to.eventually.equal('See More');
            });

            it('should toggle between "See More" and "See Less"', function () {
                component.toggle();
                expect(component.title).to.eventually.equal('See Less');

                component.toggle();
                expect(component.title).to.eventually.equal('See More');
            });
        }

    };
};
