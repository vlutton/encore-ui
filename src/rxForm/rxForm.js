/**
 * @ngdoc overview
 * @name rxForm
 * @description
 * # rxForm Component
 *
 * rxForm components are a set of directives used to create forms throughout Encore.
 * These directives provide a common HTML layout and style for all form elements,
 * which helps ensure form accessibility and makes creating new forms easier.
 *
 * ## Services
 * * {@link rxForm.service:rxFormUtils rxFormUtils}
 *
 * ## Directives
 * * {@link rxForm.directive:rxField rxField}
 * * {@link rxForm.directive:rxFieldContent rxFieldContent}
 * * {@link rxForm.directive:rxFieldName rxFieldName}
 * * {@link rxForm.directive:rxForm rxForm}
 * * {@link rxForm.directive:rxFormSection rxFormSection}
 * * {@link rxForm.directive:rxHelpText rxHelpText}
 * * {@link rxForm.directive:rxInlineError rxInlineError}
 * * {@link rxForm.directive:rxInput rxInput}
 * * {@link rxForm.directive:rxPrefix rxPrefix}
 * * {@link rxForm.directive:rxSuffix rxSuffix}
 *
 * ### Related Directives
 * * {@link rxButton.directive:rxButton rxButton}
 * * {@link rxCharacterCount.directive:rxCharacterCount rxCharacterCount}
 * * {@link rxCheckbox.directive:rxCheckbox rxCheckbox}
 * * {@link rxOptionTable.directive:rxOptionTable rxOptionTable}
 * * {@link rxRadio.directive:rxRadio rxRadio}
 * * {@link rxSelect.directive:rxSelect rxSelect}
 * * {@link rxToggleSwitch.directive:rxToggleSwitch rxToggleSwitch}
 *
 * ### Deprecated Directives
 * * {@link rxForm.directive:rxFormItem rxFormItem}
 * * {@link rxForm.directive:rxFormFieldset rxFormFieldset}
 *
 */
angular.module('encore.ui.rxForm', ['ngSanitize', 'encore.ui.rxMisc'])
/**
 * @name rxForm.directive:rxForm
 * @ngdoc directive
 * @restrict A
 * @description
 * The rxForm directive is an attribute directive meant to be used for
 * hierarchical validation of form-related elements. This directive may
 * be placed on ANY DOM element, not just `<form>`.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxFormSection rxFormSection}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form><!-- you can use a DIV, if desired -->
 *   <rx-form-section>
 *     ...
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxForm', function (rxNestedElement) {
    return rxNestedElement({
        restrict: 'A'
    });
})
/**
 * @name rxForm.directive:rxFormSection
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used for layout of sub-elements.
 *
 * By default, all `rxField` elements will display inline (horizontally).
 * If you wish to display `rxField` elements in a stacked manner, you may
 * place the `stacked` attribute on `rx-form-section`
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxForm rxForm}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxField rxField}</li>
 *       <li>HTML DIV Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>...</rx-field>
 *     <div>...</div>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 *
 * @param {*=} stacked
 * If present, `rxField` children will stack vertically rather than
 * display horizontally.
 */
.directive('rxFormSection', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxForm'
    });
})
/**
 * @name rxForm.directive:rxField
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used for layout of sub-elements.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block**
 *     <ul>
 *       <li>default: *shares width equally with sibling `rxField` and `div` elements*</li>
 *       <li>stacked: *max-width: 400px*</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxFormSection rxFormSection}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxFieldName rxFieldName}</li>
 *       <li>{@link rxForm.directive:rxFieldContent rxFieldContent}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>...</rx-field-name>
 *       <rx-field-content>...</rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxField', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxFormSection'
    });
})
/**
 * @name rxForm.directive:rxFieldName
 * @ngdoc directive
 * @restrict E
 * @scope
 * @description
 * Stylistic element directive that provides a standardized UI for
 * form field names.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxField rxField}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxFieldContent rxFieldContent}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>Any HTML Element</dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary</rx-field-name>
 *       <rx-field-content>...</rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 *
 * @param {Boolean=} [ng-required=false]
 * Is this field required? This will add/remove the required symbol to the left of the name.
 */
.directive('rxFieldName', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxField',
        transclude: true,
        scope: {
            ngRequired: '=?'
        },
        templateUrl: 'templates/rxFieldName.html'
    });
})
/**
 * @name rxForm.directive:rxFieldContent
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used for layout of sub-elements.
 * This element is used to wrap the actual content markup for your
 * controls, labels, help text, and error messages.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxField rxField}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxFieldName rxFieldName}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxInput rxInput}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>
 *          <i class="fa fa-exclamation"></i>
 *          Important Field Name
 *       </rx-field-name>
 *       <rx-field-content>
 *          <rx-input>...</rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxFieldContent', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxField'
    });
})
/**
 * @name rxForm.directive:rxInput
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used for layout of sub-elements.
 * Place your HTML control elements within this directive.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxFieldContent rxFieldContent}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>Any HTML Element</dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxPrefix rxPrefix}</li>
 *       <li>{@link rxForm.directive:rxSuffix rxSuffix}</li>
 *       <li>{@link rxCheckbox.directive:rxCheckbox rxCheckbox}</li>
 *       <li>{@link rxRadio.directive:rxRadio rxRadio}</li>
 *       <li>{@link rxSelect.directive:rxSelect rxSelect}</li>
 *       <li>{@link rxToggleSwitch.directive:rxToggleSwitch rxToggleSwitch}</li>
 *       <li>{@link rxOptionTable.directive:rxOptionTable rxOptionTable}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <input type="number" />
 *         </rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxInput', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxFieldContent'
    });
})
/**
 * @name rxForm.directive:rxPrefix
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used to wrap content to be placed
 * inline with a form control element.
 *
 * * Best placed before a form control element.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**inline block** *(only as wide as necessary for content)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxInput rxInput}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxSuffix rxSuffix}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>Any HTML Element</dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <rx-prefix>$</rx-prefix>
 *           <input type="number" />
 *           <rx-suffix>Million</rx-suffix>
 *         </rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxPrefix', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxInput'
    });
})
/**
 * @name rxForm.directive:rxSuffix
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used to wrap content to be placed
 * inline with a form control element.
 *
 * * Best placed after a form control element.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**inline block** *(only as wide as necessary for content)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link rxForm.directive:rxInput rxInput}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link rxForm.directive:rxPrefix rxPrefix}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>Any HTML Element</dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <rx-prefix>$</rx-prefix>
 *           <input type="number" />
 *           <rx-suffix>Million</rx-suffix>
 *         </rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxSuffix', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxInput'
    });
})
/**
 * @name rxForm.directive:rxInlineError
 * @ngdoc directive
 * @restrict E
 * @description
 * Stylistic element directive used to wrap an error message.
 *
 * * **block** element *(full width of parent)*
 * * Best used as a sibling after {@link rxForm.directive:rxInput rxInput},
 *   and {@link rxForm.directive:rxHelpText rxHelpText} elements.
 *
 * @example
 * <pre>
 * ...
 * <form rx-form name="demoForm">
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <rx-prefix>$</rx-prefix>
 *           <input type="number" name="salary" min="1000000" ng-model="salary" />
 *           <rx-suffix>Million</rx-suffix>
 *         </rx-input>
 *         <rx-inline-error ng-show="demoForm.salary.$errors.min">
 *           Salary must be above $1,000,000
 *         </rx-inline-error>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxInlineError', function () {
    return {
        restrict: 'E'
    };
})
/**
 * @name rxForm.directive:rxHelpText
 * @ngdoc directive
 * @restrict E
 * @description
 * Stylistic element directive used to wrap form input help text.
 *
 * * **block** element *(full width of parent)*
 * * Best used as a sibling after {@link rxForm.directive:rxInput rxInput},
 *   but before {@link rxForm.directive:rxInlineError rxInlineError} elements.
 *
 * @example
 * <pre>
 * ...
 * <form rx-form name="demoForm">
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <rx-prefix>$</rx-prefix>
 *           <input type="number" name="salary" />
 *           <rx-suffix>Million</rx-suffix>
 *         </rx-input>
 *         <rx-help-text>Must be greater than $1,000,000</rx-help-text>
 *         <rx-inline-error ng-show="demoForm.salary.$errors.minimum">
 *           Salary must be above $1,000,000
 *         </rx-inline-error>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxHelpText', function () {
    return {
        restrict: 'E'
    };
})
/**
 * @name rxForm.directive:rxFormItem
 * @deprecated
 * @ngdoc directive
 * @restrict E
 * @scope
 * @description
 * **DEPRECATED** - This directive has been marked as deprecated and *will be removed* in a future
 * release of the EncoreUI framework.  Please see current rxForm documentation for updated
 * functionality.
 *
 * This directive is used to wrap input fields and select boxes in the proper HTML.
 * It will attach the `<label>` to a transcluded input using the `id` attribute of the input.
 * If no `id` attribute exists, it will create one.
 *
 * @param {String} label - Text to use for <label>
 * @param {String} prefix - Text to include to the left of content
 * @param {String} suffix - Text to include to the right of content
 * @param {String} description - Text to place below input
 */
.directive('rxFormItem', function ($document, rxDOMHelper) {
    var warnMsg = 'DEPRECATION WARNING: rxFormItem has been marked as deprecated ' +
        'and will be removed in a future release of the EncoreUI framework. ' +
        'Please see current rxForm documentation for updated functionality.';
    console.warn(warnMsg); // jshint ignore:line

    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormItem.html',
        transclude: true,
        scope: {
            label: '@',
            suffix: '@',
            prefix: '@',
            description: '@'
        },
        link: function (scope, el) {
            var inputSelectors = [
                '.field-input-wrapper input',
                '.field-input-wrapper select',
                '.field-input-wrapper textarea'
            ];
            inputSelectors = inputSelectors.join(', ');

            // For accessibility reasons, we need to link the <label> to the <input>
            // To do this, we use the 'for' and 'id' attributes on the <label> and <input> tags, respectively
            // Since the field input is dynamically inserted, we don't know its ID (or if it has one)
            // This code takes care of linking the two

            var setFieldId = function () {
                // default to scope's id
                var fieldId = 'field-' + scope.$id;

                var inputField = el[0].querySelector(inputSelectors);

                scope.isTextArea = _.isObject(inputField) && inputField.type === 'textarea';

                // make sure an input field is found
                if (!_.isObject(inputField)) {
                    return;
                }

                // Manually insert the `suffix` span after the input/select/textarea
                // It needs to be in between the input/select/textarea and any other
                // transcluded content, so we have to do it here instead of in the template
                if (scope.suffix) {
                    var suffixSpan = $document[0].createElement('span');
                    suffixSpan.innerHTML = scope.suffix;
                    suffixSpan.className = 'field-suffix';
                    inputField.parentNode.insertBefore(suffixSpan, inputField.nextSibling);
                }

                // Put a <span class="field-input"> around the input/select/textarea
                var fieldInputSpan = $document[0].createElement('span');
                fieldInputSpan.className = 'field-input';
                rxDOMHelper.wrapAll(fieldInputSpan, inputField);

                var inputId = inputField.getAttribute('id');

                if (_.isString(inputId)) {
                    fieldId = inputId;
                } else {
                    inputField.setAttribute('id', fieldId);
                }

                el[0].querySelector('.field-label').setAttribute('for', fieldId);
            };

            setFieldId();
        }
    };
})
/**
 * @name rxForm.directive:rxFormFieldset
 * @deprecated
 * @ngdoc directive
 * @restrict E
 * @scope
 * @description
 * **DEPRECATED** - This directive has been marked as deprecated and *will be removed* in a future
 * release of the EncoreUI framework.  Please see current rxForm documentation for updated
 * functionality.
 *
 * This directive is used to wrap a set of input fields in the proper HTML
 *
 * @param {String} legend - Text to use for <legend>
 * @param {String} description - Text to place below input
 */
.directive('rxFormFieldset', function () {
    var warnMsg = 'DEPRECATION WARNING: rxFormFieldset has been marked as deprecated ' +
        'and will be removed in a future release of the EncoreUI framework. ' +
        'Please see current rxForm documentation for updated functionality.';
    console.warn(warnMsg); // jshint ignore:line

    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormFieldset.html',
        transclude: true,
        scope: {
            legend: '@',
            description: '@'
        }
    };
})
/**
 * @name rxForm.service:rxFormUtils
 * @ngdoc service
 *
 * @description
 * Set of utility functions used by rxForm to access form data
 *
 * @example
 * <pre>
 * // Returns the selected option for the rxFormOptionTable with id tableId
 * // [{ tableId: 'tableId', fieldId: 'fieldId', rowId: 'rowId' }]
 * getSelectedOptionForTable(tableId)

 * // Returns the selected option for the rxFormOptionTable in the tabset with id tabsetId
 * // [{ tableId: 'tableId', fieldId: 'fieldId', rowId: 'rowId' }]
 * getSelectedOptionForTabSet(tabsetId)
 * </pre>
 */
.factory('rxFormUtils', function ($document) {
    var rxFormUtils = {};

    // Returns the selected option for the rxFormOptionTable with id: tableId
    // and fieldId: fieldId (optional)
    // @param {String} tableId - The id of the table
    // @returns {object} The rowId of the selected option
    rxFormUtils.getSelectedOptionForTable = function (tableId) {
        var selectedRow;
        var row = $document[0].querySelector('rx-form-option-table#' + tableId + ' .selected input');

        if (_.isObject(row) && 'value' in row) {
            selectedRow = { rowId: row.value };
        }
        return selectedRow;
    };

    // Returns the selected option within the tabset
    // @param {String} tabsetId - The id of the tabset
    // @returns {object} The tableId, fieldId, and rowId of the selected option
    rxFormUtils.getSelectedOptionForTabSet = function (tabsetId) {
        var selectedOption;
        var xpathToTable = '//div[@id="' + tabsetId +
            '"]//tr[contains(@class, "selected")]//ancestor::rx-form-option-table';
        var result = $document[0].evaluate(xpathToTable, $document[0], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (result.singleNodeValue) {
            var table = result.singleNodeValue;
            var fieldId = table.getAttribute('field-id');
            var rowId = rxFormUtils.getSelectedOptionForTable(table.id).rowId;
            selectedOption = { tableId: table.id, fieldId: fieldId, rowId: rowId };
        }
        return selectedOption;
    };

    return rxFormUtils;
});
