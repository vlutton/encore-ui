angular.module('encore.ui.rxRadio', [])
.directive('rxRadio', function () {
    return {
        restrict: 'A',
        scope: {
            ngDisabled: '=?'
        },
        compile: function (tElement, tAttrs) {
            // automatically set input type
            tElement.attr('type', 'radio');
            tAttrs.type = 'radio';

            return function (scope, element, attrs) {
                var disabledClass = 'rx-disabled';
                var wrapper = angular.element('<div class="rxRadio"></div>');
                var fakeRadio = '<div class="fake-radio">' +
                        '<div class="tick"></div>' +
                    '</div>';

                element.wrap(wrapper);
                element.after(fakeRadio);

                // apply/remove disabled attribute so we can
                // apply a CSS selector to style sibling elements
                if (attrs.disabled) {
                    wrapper.addClass(disabledClass);
                }
                if (_.has(attrs, 'ngDisabled')) {
                    scope.$watch('ngDisabled', function (newVal) {
                        if (newVal === true) {
                            wrapper.addClass(disabledClass);
                        } else {
                            wrapper.removeClass(disabledClass);
                        }
                    });
                }

                // remove stylistic markup when element is destroyed
                element.on('$destroy', function () {
                    wrapper[0].remove();
                });
            };
        }//compile
    };
});
