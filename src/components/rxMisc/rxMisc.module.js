/**
 * @ngdoc overview
 * @name rxMisc
 * @description
 * # rxMisc Component
 *
 * A module for shared functionality across framework components.
 *
 * ## Filters
 * * {@link rxMisc.filter:titleize titleize}
 *
 * ## Services
 * * {@link rxMisc.service:rxAutoSave rxAutoSave}
 * * {@link rxMisc.service:rxDOMHelper rxDOMHelper}
 * * {@link rxMisc.service:rxNestedElement rxNestedElement}
 */
angular.module('encore.ui.rxMisc', [
    'debounce',
    'encore.ui.quarks'
]);
