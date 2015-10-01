/**
 * @ngdoc overview
 * @name rxModalAction
 * @description
 * # rxModalAction Component
 *
 * The rxModalAction component provides a hook to open and perform operations on a modal window.
 * 
 * This provides a hook into Angular-UI Bootstrap's modal directive. It's used as a link to open a modal window. The 
 * content inside the window is blank, however you can tie this with `<rx-modal-form>` to build a modal form window 
 * (including the modal title and submit/cancel buttons).
 *
 * **NOTE:** This module has a dependency on [Angular-UI Bootstrap](http://angular-ui.github.io/bootstrap/), so if 
 * it is going to be used, Bootstrap needs to be included in your webpage.
 * 
 * ## Directives
 * * {@link rxModalAction.directive:rxModalAction rxModalAction}
 * * {@link rxModalAction.directive:rxModalFooter rxModalFooter}
 * * {@link rxModalAction.directive:rxModalForm rxModalForm}
 *
 * ## Services
 * * {@link rxModalAction.service:rxModalFooterTemplates rxModalFooterTemplates}
 */
angular.module('encore.ui.rxModalAction', ['ui.bootstrap'])
.run(function ($compile, $templateCache) {
    $compile($templateCache.get('templates/rxModalFooters.html'));
})
/**
 * @ngdoc directive
 * @name rxModalAction.directive:rxModalForm
 * @restrict E
 * @scope
 * @description
 * Responsible for creating the HTML necessary for modal form
 *
 * The `<rx-modal-form>` directive is helpful for providing a common format to forms inside modals (hence the name). 
 *
 * This directive also provides an 'autofocus' mechanism, which will move the keyboard focus cursor to the first 
 * 'tabbable' input available in the form.
 * 
 * @param {string} title Title of modal window
 * @param {string} [subtitle] Subtitle of modal window
 * @param {boolean} [isLoading] True to show a spinner by default
 * @param {string} [submitText] 'Submit' button text to use. Defaults to 'Submit'
 * @param {string} [cancelText] 'Cancel' button text to use. Defaults to 'Cancel'
 * @param {string} [returnText] 'Return' button text to use. Defaults to 'Return'
 * @param {string} [defaultFocus] default focus element. May be 'submit' or 'cancel'. Defaults to 'firstTabbable'
 *
 * @example
 * <pre>
 * <rx-modal-form title="My Form" is-loading="true" submit-text="Yes!"></rx-modal-form>
 * </pre>
 */
.directive('rxModalForm', function ($timeout, $compile, rxModalFooterTemplates) {
    return {
        transclude: true,
        templateUrl: 'templates/rxModalActionForm.html',
        restrict: 'E',
        scope: {
            title: '@',
            subtitle: '@?',
            isLoading: '=?',
            submitText: '@?',
            cancelText: '@?',
            returnText: '@?',
            defaultFocus: '@?'
        },
        link: function (scope, element) {
            // Copy the text variables onto the parent scope so they can be accessible by transcluded content.
            _.assign(scope.$parent, _.pick(scope, ['submitText', 'cancelText', 'returnText']));

            // Manually compile and insert the modal's footers into the DOM.
            $compile(rxModalFooterTemplates.flush())(scope.$parent, function (clone) {
                element.children('div.modal-footer').append(clone);
            });

            var focusSelectors = {
                'cancel': 'button.cancel',
                'submit': 'button.submit',
                'firstTabbable': 'input:not([type="hidden"]):not([disabled="disabled"]), textarea, select'
            };
            var setFocus = function (focus) {
                var formSelector, focusElement;

                if (focus === 'cancel' || focus === 'submit') {
                    formSelector = element[0].querySelector('.modal-footer');
                    focusElement = formSelector.querySelector(focusSelectors[focus]);
                } else {
                    focus = 'firstTabbable';
                    formSelector = element[0].querySelector('.modal-form');
                    // first check for an element with autofocus
                    focusElement = formSelector.querySelector('[autofocus]');
                    if (!focusElement) {
                        focusElement = formSelector.querySelector(focusSelectors[focus]);
                    }
                }
                if (focusElement) {
                    focusElement.focus();
                }
            };

            // Give content some time to load to set the focus
            $timeout(function () {
                setFocus(scope.defaultFocus);
            }, 400);

            // Remove the title attribute, as it will cause a popup to appear when hovering over page content
            // @see https://github.com/rackerlabs/encore-ui/issues/256
            element.removeAttr('title');
        }
    };
})
.controller('rxModalCtrl', function ($scope, $modalInstance, $rootScope) {
    // define a controller for the modal to use
    $scope.submit = function () {
        $modalInstance.close($scope);
    };

    $scope.cancel = $modalInstance.dismiss;

    // cancel out of the modal if the route is changed
    $rootScope.$on('$routeChangeSuccess', $modalInstance.dismiss);
})
/**
 * @ngdoc service
 * @name rxModalAction.service:rxModalFooterTemplates
 * @description
 * A cache for storing the modal footer templates
 * This is used internally by rxModalFooter, which is preferred
 * for registering templates over direct calling of this api.
 *
 * @example
 * <pre>
 * rxModalFooterTemplates.add("step1", "<p>Step 1 Body</p>");
 * rxModalFooterTemplates.flush(); // returns html string to be inserted into DOM
 * </pre>
 */
.factory('rxModalFooterTemplates', function () {
    var globals = {};
    var locals = {};

    return {
        /*
         * Concatenates all the registered templates and clears the local template cache.
         * @public
         * @returns {string} The concatenated templates wrapped in an ng-switch.
         */
        flush: function () {
            var states = _.assign({}, globals, locals);
            locals = {};
            return _.values(states).reduce(function (html, template) {
                return html + template;
            }, '<div ng-switch="state">') + '</div>';
        },
        /*
         * Register a template with an associated state.
         * @public
         * @param {string} The state being registered.
         * @param {string} The template assicated with the state.
         * @param [object} options
         * @param {boolean} options.global Indicates if the template is used in other modals.
         */
        add: function (state, template, options) {
            if (options.global) {
                globals[state] = template;
            } else {
                locals[state] = template;
            }
        }
    };
})
/**
 * @ngdoc directive
 * @name rxModalAction.directive:rxModalFooter
 * @restrict E
 * @scope
 * @description
 * Define a footer for the next modal.
 *
 * When a modal has multiple views or kicks off a process that should be tracked within the modal, the 
 * `<rx-modal-footer>` directive should be used.  
 *
 * Modal Footers should be defined in the same template as the Modal Form unless the footer is global, in which case it
 * should be loaded in `module.run()`.  Global footers can be used in any subsequent modal by changing to the state 
 * they were defined with.
 *
 * The modal's controller also inherits the `setState()` method on the scope, which should be used to toggle different 
 * views or footers. See the *Multi-View Example* in the component {@link /#/components/rxModalAction demo} for an 
 * example of this design pattern's usage.  
 * 
 * The default `editing` state shows the standard submit and cancel buttons, and the only other state provided by the 
 * framework is `complete` (showing the return button).
 * 
 * @param {String} state The content will be shown in the footer when this state is activated.
 * @param {String=} [global] If the global attribute is present, then this footer can be used
 *                          in other modals. This attribute takes no values.
 *
 * @example
 * <pre>
 * <rx-modal-footer state="confirm">
 *     <button class="button" ng-click="setState('pending')">I understand the risks.</button>
 * </rx-modal-footer>
 * </pre>
 */
.directive('rxModalFooter', function (rxModalFooterTemplates) {
    return {
        restrict: 'E',
        compile: function (element, attrs) {
            var footer = angular.element('<div></div>')
                .append(element.html())
                .attr('ng-switch-when', attrs.state);

            rxModalFooterTemplates.add(attrs.state, footer[0].outerHTML, {
               global: attrs.global !== undefined
            });

            return function (scope, el) {
                el.remove();
            };
        }
    };
})
/**
 * @ngdoc directive
 * @name rxModalAction.directive:rxModalAction
 * @restrict E
 * @scope
 * @description
 * Link which will show a modal window on click, and handle callbacks for pre/post modal actions
 *
 * # Template URL
 *
 * Due to the complex nature of the information passed into modal windows, HTML is handled via a template (versus 
 * transcluding the content).
 * 
 * One benefit is that this allows for multiple actions to re-use the same template. It also allows modal content to 
 * live in a separate file, which can be helpful for maintainability if the modal HTML is complex. While this can be 
 * done via `ng-include`, it would be a little extra work for a common scenario.
 *
 * # Hooks
 *
 * `rxModalAction` allows you to define functions to be called at different points of the modal lifecycle.  These hooks 
 * are optional and the modal window is fully functional without any being defined.
 *
 * ## Pre-hook
 *
 * The `pre-hook` function is called before the modal window is shown.  Use a this to populate field information inside 
 * of the modal.  This is useful when you have information you don't want loaded when the page is first opened, but do 
 * need for the modal.  It is also useful for dynamic information that is based on actions taken.
 *
 * ## Post-hook
 *
 * The `post-hook` function is called after the modal is submitted.  A `post-hook` is useful to take actions based upon 
 * input in the modal.  For example, you can use the user input that gets entered to send API requests with specific 
 * JSON data.  Or you can simply run a pre-defined API call (assuming the modal is a simple confirmation dialog).
 *
 * ## Dismiss-hook
 *
 * The `dismiss-hook` function is called after the modal is closed without submitting.  This may happen via any of the 
 * following scenarios:
 *
 * * Clicking the "Cancel" button
 * * Clicking the "X" button in the top right
 * * Pressing `ESC`
 * * Explicitly calling `$modalInstance.dismiss()` in your javascript logic
 *
 * This hook is useful for making changes to UI state when the user wants to cancel the given action.  For example, you 
 * may use this to return an indeterminate component to a previous state (e.g. toggle switches).
 * 
 * @param {Function=} [preHook] Function to call when a modal is opened
 * @param {Function=} [postHook] Function to call when a modal is submitted (not called when cancelled out of)
 * @param {Function=} [dismissHook] Function to call when a modal is dismissed (not called when submitted)
 * @param {String=} [templateUrl] URL of template to use for modal content
 * @param {*=} [disable-esc] If the `disable-esc` attribute is present, then "Press Esc to close" will be disabled
 *                           for the modal. This attribute takes no values.
 *
 * @example
 * <pre>
 * <rx-modal-action
 *     pre-hook="myPreHook(this)"
 *     post-hook="myPostHook(fields)"
 *     template-url="modalContent.html"
 *     disable-esc>
 *         My Link Text
 * </rx-modal-action>
 * </pre>
 */
.directive('rxModalAction', function ($modal) {
    var createModal = function (config, scope) {
        config = _.defaults(config, {
            templateUrl: config.templateUrl,
            controller: 'rxModalCtrl',
            scope: scope
        });

        config.windowClass = 'rxModal';

        var modal = $modal.open(config);

        return modal;
    };

    return {
        transclude: true,
        templateUrl: 'templates/rxModalAction.html',
        restrict: 'E',
        scope: true,
        link: function (scope, element, attrs) {
            // add any class passed in to scope
            scope.classes = attrs.classes;

            var focusLink = function () {
                element.find('a')[0].focus();
            };

            var handleDismiss = function () {
                focusLink();

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function (if it exists)
                scope.$eval(attrs.dismissHook);
            };

            var handleSubmit = function () {
                focusLink();

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function
                scope.$eval(attrs.postHook);
            };

            scope.showModal = function (evt) {
                evt.preventDefault();

                // Note: don't like having to create a 'fields' object in here,
                // but we need it so that the child input fields can bind to the modalScope
                scope.fields = {};

                scope.setState = function (state) {
                    scope.state = state;
                };
                scope.setState('editing');

                // Since we don't want to isolate the scope, we have to eval our attr instead of using `&`
                // The eval will execute function (if it exists)
                scope.$eval(attrs.preHook);

                if (_.has(attrs, 'disableEsc')) {
                    attrs.keyboard = false;
                }

                var modal = createModal(attrs, scope);

                modal.result.then(handleSubmit, handleDismiss);
            };
        }
    };
});
