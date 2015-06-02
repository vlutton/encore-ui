angular.module('encore.ui.rxForm', ['ngSanitize', 'encore.ui.rxMisc'])
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormItem
 * @restrict E
 * @description
 * This directive is used to wrap input fields and select boxes in the proper HTML.
 * It will attach the `<label>` to a transcluded input using the `id` attribute of the input.
 * If no `id` attribute exists, it will create one.
 *
 * @scope
 * @param {String} label - Text to use for <label>
 * @param {String} prefix - Text to include to the left of content
 * @param {String} suffix - Text to include to the right of content
 * @param {String} description - Text to place below input
 */
.directive('rxFormItem', function ($document, rxDOMHelper) {
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
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormFieldset
 * @restrict E
 * @description
 * This directive is used to wrap a set of input fields in the proper HTML
 * @scope
 * @param {String} legend - Text to use for <legend>
 * @param {String} description - Text to place below input
 */
.directive('rxFormFieldset', function () {
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
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormOptionTable
 * @restrict E
 * @description
 * This directive is used to build a table of radio/checkbox inputs
 * @scope
 * @param {Array} data - Array of objects used to populate table. Properties must match columns data
 * key. Example:
 * ```
 * [
 *     {
 *         'name': 'Option 1',
 *         'value': 0
 *     }, {
 *         'name': 'Option 2',
 *         'value': 1
 *     }, {
 *         'name': 'Option 3',
 *         'value': 2
 *     }
 * ]
 * ```
 * @param {array} columns - Array of objects with label/key values. Example:
 * ```
 * [{
 *     'label': 'Name',
 *     'key': 'name'
 * }]
 * ```
 * @param {String=} selected - Key of item that's selected (and therefore will have input disabled)
 * @param {String} type - Type of input to be used
 * @param {Object} model - Value to bind input to using ng-model
 * @param {String} fieldId - Used for label and input 'id' attribute
 * @param {Object} required - Value passed to input's 'ng-required' attribute
 * @param {String} emtpyMessage - Message to display if table is empty
 * @param {Function} disableFn - Callback function to determine if option should be disabled.
                                 Takes tableId, fieldId, and rowId as parameters.
                                 Example:
```
 disable-fn="disableOption(tableId, fieldId, rowId)"
```
 */
.directive('rxFormOptionTable', function ($interpolate) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormOptionTable.html',
        scope: {
            data: '=',
            columns: '=',
            selected: '@',
            type: '@',
            model: '=',
            fieldId: '@',
            required: '=',
            emptyMessage: '@',
            disableFn: '&?'
        },
        controller: function ($scope, $element) {
            var determineMatch = function (val1, val2) {
                if (_.isUndefined(val1) || _.isUndefined(val2)) {
                    return false;
                }

                return (val1 == val2);
            };

            $scope.checkDisabled = function (row) {
                return $scope.disableFn({ tableId: $element.attr('id'), fieldId: $scope.fieldId, rowId: row.id });
            };

            // Determines whether the row is the initial choice
            $scope.isCurrent = function (val) {
                return determineMatch(val, $scope.selected);
            };

            // Determines whether the row is selected
            $scope.isSelected = function (val, idx) {
                // row can only be 'selected' if it's not the 'current' value
                if (!$scope.isCurrent(val)) {
                    if ($scope.type == 'radio') {
                        return (val == $scope.model);
                    } else if ($scope.type == 'checkbox') {
                        if (!_.isUndefined(val)) {
                            // if 'val' is defined, run it through our custom matcher
                            return determineMatch(val, $scope.model[idx]);
                        } else {
                            // otherwise, just return the value of the model and angular can decide
                            return $scope.model[idx];
                        }
                    }
                }

                return false;
            };

            /*
             * checkRequired: Returns true/false to the ng-required attribute for checkboxes.
             * Returns a true value if required="true" and there is at least one checkbox
             * checked (based on $scope.values).
             */
            $scope.checkRequired = function () {
                if (_.isBoolean($scope.required)) {
                    return $scope.required && boxesChecked === 0;
                } else {
                    return false;
                }
            };

            // If we are using checkboxes and the required attribute is set, then we
            // need an array to store the indexes of checked boxes. ng-required is
            // specifically set if required is true and the array is empty.
            var boxesChecked = 0;
            _.forEach($scope.model, function (el, index) {
                if (!_.isEmpty($scope.data) && (el === true || $scope.data[index].value == el)) {
                    boxesChecked += 1;
                }
            });

            /*
             * Updates $scope.values when a checkbox is clicked.
             * @param {String|boolean} val - The checkbox value (Boolean, ng-true-value or ng-false-value per row)
             * @param {Integer} index - Array index of the checkbox element marked true
             */
            $scope.updateCheckboxes = function (val, index) {
                if ((val === true) || $scope.data[index].value == val) {
                    boxesChecked -= 1;
                } else {
                    boxesChecked += 1;
                }
            };

            /*
             * Get the value out of a key from the row, or parse an expression
             * @param {Object} column - Column whose `key` is an Angular Expression or HTML to be compiled
             * @param {Object} row - Data object with data to be used against the expression
             */
            $scope.getContent = function (column, row) {
                var expr = column.key;
                // If no expression exit out;
                if (!expr) {
                    return '';
                }

                // if the expr is a property of row, then we expect the value of the key.
                if (row.hasOwnProperty(expr)) {
                    return String(row[expr]);
                }

                // Compile expression & Run output template
                var outputHTML = $interpolate(expr)(row);
                return outputHTML;
            };
        }

    };
})
/**
 * @ngdoc service
 * @name encore.ui.rxModalForm:rxFormUtils
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
