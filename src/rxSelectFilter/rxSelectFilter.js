/**
 * @ngdoc overview
 * @name rxSelectFilter
 * @description
 * # rxSelectFilter component
 *
 * This service exposes an object with single method, `create()`, used to create instances of a `SelectFilter`.
 *
 * ## Directives
 * * {@link rxSelectFilter.directive:rxSelectFilter rxSelectFilter}
 *
 * ## Filters
 * * {@link rxSelectFilter.filter:Apply Apply}
 *
 * ## Services
 * * {@link rxSelectFilter.service:SelectFilter SelectFilter}
 */
angular.module('encore.ui.rxSelectFilter', ['encore.ui.rxMisc', 'encore.ui.rxSelect'])
/**
 * @ngdoc filter
 * @name rxSelectFilter.filter:Apply
 * @description
 * Used to apply an instance of SelectFilter to an array.
 *
 * @param {Array} list The list to be filtered.
 * @param {Object} filter An instance of SelectFilter
 */
.filter('Apply', function () {
    return function (list, filter) {
        return filter.applyTo(list);
    };
})
/**
 * @ngdoc service
 * @name rxSelectFilter.service:SelectFilter
 * @description
 * A prototype for creating objects that can be used for filtering arrays.
 *
 * @method create(options) - Create a filter that tracks the provided properties.
 */
.service('SelectFilter', function () {
    return {
        create: function (options) {
            options = _.defaults(options, {
                properties: [],
                available: {},
                selected: _.isUndefined(options.available) ? {} : _.cloneDeep(options.available)
            });

            var filter = _.cloneDeep(options);

            var firstRun = true;

            function init (list) {
                filter.properties.forEach(function (property) {
                    if (_.isUndefined(filter.available[property])) {
                        filter.available[property] = _.uniq(_.pluck(list, property));
                    }

                    // Check `options.selected` instead of `filter.selected` because the latter
                    // is used as the model for `<rx-multi-select>`, which initializes its
                    // model to an empty array. However, the intent is select all options
                    // initially when left unspecified (preferred default behavior).
                    if (_.isUndefined(options.selected[property])) {
                        filter.selected[property] = _.clone(filter.available[property]);
                    }
                });
            }

            function isItemValid (item) {
                return filter.properties.every(function (property) {
                    return _.contains(filter.selected[property], item[property]);
                });
            }

            filter.applyTo = function (list) {
                if (firstRun) {
                    firstRun = false;
                    init(list);
                }
                return list.filter(isItemValid);
            };

            return filter;
        }
    };
})
/**
 * @ngdoc directive
 * @name rxSelectFilter.directive:rxSelectFilter
 * @restrict E
 * @scope
 * @description
 * Automatically creates the appropriate dropdowns to manage a filter object.
 *
 * @param {Object} filter - An instance of SelectFilter
 */
.directive('rxSelectFilter', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSelectFilter.html',
        scope: {
            filter: '='
        }
    };
});