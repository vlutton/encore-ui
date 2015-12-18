/**
 * @ngdoc overview
 * @name rxMisc
 * @description
 * # rxMisc Component
 *
 * A module for shared functionality across framework components.
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
