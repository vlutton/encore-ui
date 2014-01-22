angular.module('encore.ui.rxProductResources', ['encore.ui.rxActiveUrl', 'encore.ui.rxRelatedMenu'])
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxProductResources
 * @restrict E
 * @description
 * TBD
 */
.directive('rxProductResources', function () {
    return {
        restrict: 'E',
        templateUrl: 'rxProductResources.tpl.html',
        scope: {
            user: '='
        }
    };
});