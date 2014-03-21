angular.module('encore.ui.rxForm', ['ngSanitize'])
// used to wrap input fields and select boxes in the proper HTML
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
 */
.directive('rxFormOptionTable', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormOptionTable.html',
        scope: {
            data: '=',
            columns: '=',
            selected: '@',
            type: '@',
            model: '=',
            fieldId: '@'
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
                // row can only be 'selected' if it's not the default 'selected' value
                if (!$scope.isCurrent(val)) {
                    if ($scope.type == 'radio') {
                        return (val == $scope.model);
                    } else if ($scope.type == 'checkbox') {
                        if (_.isUndefined(val)) {
                            val = 'true';
                        }
                        return determineMatch(val, $scope.model[idx]);
                    }
                }

                return false;
            };

            /*
             * Convenience method to set ng-true-value or ng-false-value with fallback
             * @param {String} val Value that's passed in from data
             * @param {Any} fallback Value to use if 'val' is undefiend
             */
            $scope.getCheckboxValue = function (val, fallback) {
                return _.isUndefined(val) ? fallback : val;
            };
        }
    };
});