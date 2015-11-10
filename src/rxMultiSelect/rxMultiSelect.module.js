/**
 * @ngdoc overview
 * @name rxMultiSelect
 * @description
 * # rxMultiSelect Component
 * This component is a multi-select dropdown with checkboxes for each option.
 * It is a replacement for `<select multiple>` when space is an issue, such as
 * in the header of a table.
 * ## Services
 * * Links to service APIs provided by rxMultiSelect component.
 *
 * ## Directives
 * * {@link rxMultiSelect.directive:rxMultiSelect rxMultiSelect}
 * * {@link rxMultiSelect.directive:rxSelectOption rxSelectOption}
 *
 * ## Related Directives (if applicable)
 * * Links to directive APIs provided by other components.
 */
angular.module('encore.ui.rxMultiSelect', [
    'encore.ui.rxSelectFilter'
]);
