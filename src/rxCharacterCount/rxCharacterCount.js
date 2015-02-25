angular.module('encore.ui.rxCharacterCount', [])
.directive('rxCharacterCount', function ($compile) {
    var div = '<div class="character-countdown" ng-class="{ \'near-limit\': nearLimit, \'over-limit\': overLimit }">' +
              '{{ remaining }}</div>';
    return {
        restrict: 'A',
        require: 'ngModel',
        // scope:true ensures that our remaining/nearLimit/overLimit scope variables
        // only live within this directive
        scope: true,
        link: function (scope, element, attrs, ngModelCtrl) {
            $compile(div)(scope, function (clone) {
                element.after(clone);
            });

            var maxCharacters = _.parseInt(attrs.maxCharacters) || 254;
            var lowBoundary = _.parseInt(attrs.lowBoundary) || 10;
            scope.remaining = maxCharacters;
            scope.nearLimit = false;
            scope.overLimit = false;

            // This gets called whenever the ng-model for this element
            // changes, i.e. when someone enters new text into the textarea
            ngModelCtrl.$parsers.push(function (newText) {
                scope.remaining = maxCharacters - newText.length;
                scope.nearLimit = scope.remaining >= 0 && scope.remaining < lowBoundary;
                scope.overLimit = scope.remaining < 0;
                return newText;
            });
        }
    };
});
