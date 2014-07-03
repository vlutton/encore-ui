angular.module('encore.ui.rxForm', ['ngSanitize'])
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormItem
 * @restrict E
 * @description
 * This directive is used to wrap input fields and select boxes in the proper HTML
 * @scope
 * @param {String} label - Text to use for <label>
 * @param {String} prefix - Text to include to the left of content
 * @param {String} suffix - Text to include to the right of content
 * @param {String} description - Text to place below input
 */
.directive('rxFormItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormItem.html',
        transclude: true,
        scope: {
            label: '@',
            suffix: '@',
            prefix: '@',
            description: '@'
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
 * @param {String} required - Value passed to input's 'ng-required' attribute
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
            required: '@',
            emptyMessage: '@'
        },
        controller: function ($scope) {
            var determineMatch = function (val1, val2) {
                if (_.isUndefined(val1) || _.isUndefined(val2)) {
                    return false;
                }

                return (val1 == val2);
            };

            // Determines whether the row is the initial choice
            $scope.isCurrent = function (val) {
                return determineMatch(val, $scope.selected);
            };

            // Determines whether the row is selected
            $scope.isSelected = function (val, idx) {
                // row can only be 'selected' if it's not the 'current'' value
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

            // If we are using checkboxes and the required attribute is set, then we
            // need an array to store the indexes of checked boxes. ng-required is
            // specifically set if required is true and the array is empty. 
            $scope.values = [];
            _.forEach($scope.model, function (el, index) {
                if (el === true) {
                    $scope.values.push(index);
                } else {
                    if ($scope.data[index] == el) {
                        $scope.values.push(index);
                    }
                }
            });

            /*
             * @param {String|boolean} val - The checkbox value (Boolean, ng-true-value or ng-false-value per row)
             * @param {Integer} index - Array index of the checkbox element marked true
             */
            $scope.updateCheckboxes = function (val, index) {
                $scope.values = $scope.values || [];
                if ((val === true) || $scope.data[index].value == val) {
                    // Branch to uncheck the checkbox
                    $scope.values = _.without($scope.values, index);
                } else {
                    // Branch to check the checkbox
                    $scope.values.push(index);
                }
            };

            /*
             * Get the value out of a key from the row, or parse an expression
             * @param {String} expr - Key or Angular Expression (or static text) to be compiled
             * @param {Object} row - Data object with data to be used against the expression
             */
            $scope.getContent = function (column, row) {
                var expr = column.key;
                // If no expression exit out;
                if (!expr) {
                    return;
                }

                // if the expr is a property of row, then we expect the value of the key.
                if (row.hasOwnProperty(expr)) {
                    return row[expr];
                }

                // Compile expression & Run output template
                var outputHTML = $interpolate(expr)(row);
                return outputHTML;
            };
        }
    };
})

/**
 * Below are officially deprecated directives.
 */

/**
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormInput
 * @restrict E
 * @description
 * This directive is used to create an &lt;input&gt; tag.
 * @scope
 * @param {String} type - Value passed to input's 'type' attribute
 * @param {String} required - Value passed to input's 'ng-required' attribute
 * @param {String} fieldId - Used for label and input 'id' attribute
 * @param {Object} model - Value to bind input to using ng-model
 * @param {String} minLength - Value passed to input's 'minLength' attribute
 * @param {String} maxLength - Value passed to input's 'maxLength' attribute
 * @param {String} max - Value passed to input's 'max' attribute
 * @param {String} min - Value passed to input's 'min' attribute
 * @param {String} label - Text to use for <label>
 * @param {String} suffix - Text to use after <label>
 * @param {String} description - Text to place after input
 */
.directive('rxFormInput', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormInput.html',
        scope: {
            type: '@',
            required: '@',
            fieldId: '@',
            model: '=',
            minLength: '@',
            maxLength: '@',
            max: '@',
            min: '@',
            name: '@',
            value: '@',
            label: '@',
            suffix: '@',
            description: '@'
        }
    };
})
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormRadio
 * @restrict E
 * @description
 * This directive is used to create a set of &lt;input type="radio"&gt; tags.
 * @scope
 * @param {Array} options - An array of radio inputs to generate. Example format:
 *     ```
 *     [{
 *         label: 'Staging',
 *         value: 'STAGING'
 *     }, {
 *         label: 'ORD (Chicago)',
 *         value: 'ORD'
 *     }];
 *     ```
 * @param {String} fieldId - Used for label and input 'id' attribute
 * @param {Object} model - Value to bind input to using ng-model
 */
.directive('rxFormRadio', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormRadio.html',
        scope: {
            options: '=',
            fieldId: '@',
            model: '='
        }
    };
})
/**
 *
 * @ngdoc directive
 * @name encore.ui.rxForm:rxFormSelect
 * @restrict E
 * @description
 * This directive is used to create a &lt;select&gt; box w/options.
 * @scope
 * @param {Array} options - An array of options to generate. Example format:
 *     ```
 *     [{
 *         label: 'Staging',
 *         value: 'STAGING'
 *     }, {
 *         label: 'ORD (Chicago)',
 *         value: 'ORD'
 *     }];
 *     ```
 * @param {String} fieldId - Used for label and input 'id' attribute
 * @param {String} label - Text to use for &lt;label&gt;
 * @param {Object} model - Value to bind input to using ng-model
 * @param {String} required - Value passed to select's 'ng-required' attribute
 */
.directive('rxFormSelect', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormSelect.html',
        scope: {
            options: '=',
            fieldId: '@',
            label: '@',
            model: '=',
            required: '@'
        }
    };
});
