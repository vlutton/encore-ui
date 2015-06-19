angular.module('encore.ui.rxSelect', [])
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxSelect
 * @restrict A
 * @param {Boolean} [ngDisabled=""] - Angular expression that evaluates to a Boolean
 * @description This directive is to apply styling to native `<select>` elements
 */
.directive('rxSelect', function () {
    return {
        restrict: 'A',
        scope: {
            ngDisabled: '=?'
        },
        link: function (scope, element, attrs) {
            var disabledClass = 'rx-disabled';
            var wrapper = '<div class="rxSelect"></div>';
            var fakeSelect = '<div class="fake-select">' +
                    '<div class="select-trigger">' +
                        '<i class="fa fa-fw fa-caret-down"></i>' +
                    '</div>' +
                '</div>';

            element.wrap(wrapper);
            element.after(fakeSelect);
            // must be defined AFTER the element is wrapped
            var parent = element.parent();

            // apply/remove disabled class so we have the ability to
            // apply a CSS selector for purposes of style sibling elements
            if (_.has(attrs, 'disabled')) {
                parent.addClass(disabledClass);
            }
            if (_.has(attrs, 'ngDisabled')) {
                scope.$watch('ngDisabled', function (newVal) {
                    if (newVal === true) {
                        parent.addClass(disabledClass);
                    } else {
                        parent.removeClass(disabledClass);
                    }
                });
            }

            var removeParent = function () {
                parent.remove();
            };

            // remove stylistic markup when element is destroyed
            element.on('$destroy', function () {
                scope.$evalAsync(removeParent);
            });
        }
    };
});
