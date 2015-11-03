angular.module('encore.ui.rxBulkSelect')
/**
 * @ngdoc service
 * @name rxBulkSelect.service:rxBulkSelectUtils
 * @description [TBD]
 */
.factory('rxBulkSelectUtils', function () {
    var rxBulkSelectUtils = {};

    var allVisibleRows = function (tableElement) {
        return _.map(tableElement[0].querySelectorAll('td .rx-bulk-select-row'), angular.element);
    };

    // state is true or false, indicating whether the rows should be selected or deselected
    rxBulkSelectUtils.setAllVisibleRows = function (state, tableElement, rowKey) {
        _.each(allVisibleRows(tableElement), function (row) {
            row.scope().row[rowKey] = state;
        });
    };

    return rxBulkSelectUtils;
});
