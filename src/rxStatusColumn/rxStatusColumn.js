/**
 * @ngdoc overview
 * @name rxStatusColumn
 * @description
 * # rxStatusColumn Component
 *
 * This component provides directives and styles for putting status columns
 * into tables.
 *
 * ## Directives
 * * {@link rxStatusColumn.directive:rxStatusColumn rxStatusColumn}
 * * {@link rxStatusColumn.directive:rxStatusHeader rxStatusHeader}
 *
 * ## Objects/Values
 * * {@link rxStatusColumn.object:rxStatusColumnIcons rxStatusColumnIcons}
 *
 * ## Services
 * * {@link rxStatusColumn.service:rxStatusMappings rxStatusMappings}
 */
angular.module('encore.ui.rxStatusColumn', [])
/**
 * @ngdoc directive
 * @name rxStatusColumn.directive:rxStatusColumn
 * @restrict A
 * @scope
 * @description
 *
 * A directive for drawing colored status columns in a table. This
 * takes the place of the <td></td> for the column it's in.
 *
 * For the corresponding `<td>`, you will need to add the `rx-status-column`
 * attribute, and set the `status` attribute appropriately. You can optionally
 * set `api` and `tooltip-content` attributes. `tooltip-content` sets the
 * tooltip that will be used. If not set, it will default to the value you
 * passed in for `status`. The `api` attribute will be explained below.
 *
 * We currently support six statuses, with corresponding CSS styles. Namely,
 * `"ACTIVE"`, `"DISABLED"`, `"WARNING"`, `"ERROR"`, `"INFO"` and `"PENDING"`.
 * If your code happens to already use those statuses, then you can simply pass
 * them to the `status` attribute as appropriate. However, it's likely that
 * internally you will be receiving a number of different statuses from your
 * APIs, and will need to map them to these six statuses.
 *
 * The example in the {@link /encore-ui/#/components/rxStatusColumn demo} shows a typical
 * use of this directive, such as:
 *
 * <pre>
 * <tbody>
 *     <tr ng-repeat="server in servers">
 *         <!-- Both `api` and `tooltip-content` are optional -->
 *         <td rx-status-column
 *             status="{{ server.status }}"
 *             api="{{ server.api }}"
 *             tooltip-content="{{ server.status }}"></td>
 *         <td>{{ server.title }}</td>
 *         <td>{{ server.value }}</td>
 *    </tr>
 * </tbody>
 * </pre>
 *
 * # A note about color usage for rxStatusColumn
 *
 * Encore uses the color red for destructive and "delete" actions, and the
 * color green for additive or "create" actions, and at first it may seem that
 * the styles of rxStatusColumn do not follow that same logic. However, the
 * distinction here is that when an action or status on an item is
 * "in progress" or "pending" (i.e. the user cannot take any additional action
 * on that item until a transition completes), it is given the yellow animated
 * `PENDING` treatment. This is true even for "create"/"add" actions or
 * "delete" actions. A general rule of thumb to follow is that if a status
 * ends in -`ING`, it should get the animated yellow stripes of `PENDING`.
 *
 * @param {String} status The status to draw
 * @param {String} [api] Optionally specify which API mapping to use for the status
 * @param {String} [tooltip] The string to use for the tooltip. If omitted,
 *                           it will default to using the passed in status
 */
.directive('rxStatusColumn', function (rxStatusMappings, rxStatusColumnIcons) {
    return {
        templateUrl: 'templates/rxStatusColumn.html',
        restrict: 'A',
        scope: {
            status: '@',
            api: '@',
            tooltipContent: '@'
        },
        link: function (scope, element) {

            var lastStatusClass = '';

            var updateTooltip = function () {
                scope.tooltipText = scope.tooltipContent || scope.status || '';
            };

            var setStatus = function (status) {
                scope.mappedStatus = rxStatusMappings.getInternalMapping(status, scope.api);
                updateTooltip();

                // We use `fa-exclamation-circle` when no icon should be visible. Our LESS file
                // makes it transparent
                scope.statusIcon = rxStatusColumnIcons[scope.mappedStatus] || 'fa-exclamation-circle';
                element.addClass('status');
                element.removeClass(lastStatusClass);
                lastStatusClass = 'status-' + scope.mappedStatus;
                element.addClass(lastStatusClass);
                element.addClass('rx-status-column');
            };

            scope.$watch('status', function (newStatus) {
                setStatus(newStatus);
            });

            scope.$watch('tooltipContent', function () {
                updateTooltip();
            });
        }
    };
})
/**
 * @ngdoc object
 * @name rxStatusColumn.object:rxStatusColumnIcons
 * @description
 *
 * Mapping of internal statuses to FontAwesome icons.
 * The keys map to the names defined in rxStatusColumn.less
 */
.value('rxStatusColumnIcons', {
    'ERROR': 'fa-ban',
    'WARNING': 'fa-exclamation-triangle',
    'INFO': 'fa-info-circle',
})
/**
 * @ngdoc directive
 * @name rxStatusColumn.directive:rxStatusHeader
 * @description
 *
 * Place this attribute directive on the `<th>` for the status columns. It
 * ensures correct styling.
 *
 * For the `<th>` component representing the status column, add the
 * `rx-status-header` attribute, i.e.
 *
 * <pre>
 * <th rx-status-header></th>
 * </pre>
 * Note that status columns are sortable with
 * {@link /encore-ui/#/components/rxSortableColumn rxSortableColumn}, just like any
 * other column. The demo below shows an example of this.
 *
 * One few things to note about the
 * {@link /encore-ui/#/components/rxStatusColumn demo}: The `<th>` is defined as:
 *
 * <pre>
 * <th rx-status-header>
 *     <rx-sortable-column
 *         sort-method="sortcol(property)"
 *         sort-property="status"
 *         predicate="sort.predicate"
 *         reverse="sort.reverse">
 *     </rx-sortable-column>
 * </th>
 * </pre>
 *
 * Note that `sort-property="status"` is referring to the `server.status`
 * property on each row. Thus the sorting is done in this example by the status
 * text coming from the API.
 */
.directive('rxStatusHeader', function () {
    return {
        link: function (scope, element) {
            element.addClass('rx-status-header');
        }
    };
})
/**
 * @ngdoc service
 * @name rxStatusColumn.service:rxStatusMappings
 * @description
 *
 * A set of methods for creating mappings between a product's notion
 * of statuses, and the status identifiers used in EncoreUI
 *
 * To accommodate different statuses, the `rxStatusMappings` factory includes
 * methods for defining mappings from your own statuses to the six defined ones.
 * The basic methods for this are `rxStatusMappings.addGlobal()` and
 * `rxStatusMappings.addAPI()`.
 *
 * ## mapToActive()/mapToWarning()/mapToError()/mapToInfo()/mapToPending()
 *
 * While `.addGlobal()` and `.addAPI()` would be sufficient on their own,
 * they can be slightly cumbersome. If you have a list of statuses that all
 * need to get mapped to the same EncoreUI status, the mapping object will
 * be forced to have repetition, leaving room for errors. For example,
 * something like this:
 *
 * <pre>
 * rxStatusMappings.addGlobal({
 *     'BLOCKED': 'ERROR',
 *     'SHUTDOWN': 'ERROR',
 *     'FAILED': 'ERROR'
 * });
 * </pre>
 *
 * There is required repetition of `"ERROR"` in each pair, and there's always
 * the chance of misspelling `"ERROR"`. Instead, we provide a utility method
 * `mapToError` to help with this:
 *
 * <pre>
 * rxStatusMappings.mapToError(['BLOCKED', 'SHUTDOWN', 'FAILED']);
 * </pre>
 *
 * This has the advantage that it's shorter to type, eliminates the chance of
 * mistyping or misassigning `"ERROR"`, and keeps all `"ERROR"` mappings
 * physically grouped. With this, you could easily keep your mapping values
 * in an Angular `.value` or `.constant`, and just pass them to these methods
 * in your `.run()` method.
 *
 * There are equivalent `mapToWarning`, `mapToActive`, `mapToDisabled`,
 * `mapToPending` and `mapToInfo` methods.
 *
 * All six of these methods can take an array or a single string as the first
 * argument. The call above is equivalent to this group of individual calls:
 *
 * <pre>
 * rxStatusMappings.mapToError('BLOCKED');
 * rxStatusMappings.mapToError('SHUTDOWN');
 * rxStatusMappings.mapToError('FAILED');
 * </pre>
 *
 * All six can also take `api` as a second, optional parameter. Thus we could
 * define the `rxStatusMappings.addAPI({ 'FOO': 'ERROR' }, 'z')` example from
 * above as:
 *
 * <pre>
 * rxStatusMappings.mapToError('FOO', 'z');
 * </pre>
 *
 */
.factory('rxStatusMappings', function () {
    var globalMappings = {};
    var apiMappings = {};
    var rxStatusMappings = {};

    var upperCaseCallback = function (objectValue, sourceValue) {
        return sourceValue.toUpperCase();
    };
    /**
     * @ngdoc function
     * @name rxStatusMappings.addGlobal
     * @methodOf rxStatusColumn.service:rxStatusMappings
     * @description
     *
     * Takes a full set of mappings to be used globally
     *
     * `rxStatusMappings.addGlobal()` takes an object as an argument, with the
     * keys being your own product's statuses, and the values being one of the six
     * internal statuses that it should map to. For example:
     *
     * <pre>
     * rxStatusMappings.addGlobal({
     *     'RUNNING': 'ACTIVE',
     *     'STANDBY': 'INFO',
     *     'SUSPENDED': 'WARNING',
     *     'FAILURE': 'ERROR'
     * });
     * </pre>
     *
     * These mappings will be used throughout all instances of `rx-status-column`
     * in your code.
     *
     * @param {String} mapping This is mapping with keys and values
     */
    rxStatusMappings.addGlobal = function (mapping) {
        _.assign(globalMappings, mapping, upperCaseCallback);
    };

    /**
     * @ngdoc function
     * @name rxStatusMappings.addAPI
     * @methodOf rxStatusColumn.service:rxStatusMappings
     * @description
     *
     * Create a mapping specific to a particular API. This will
     * only be used when the directive receives the `api="..."`
     * attribute
     *
     * Say that you are using three APIs in your product, `X`, `Y` and `Z`. Both
     * `X` and `Y` define a status `"FOO"`, which you want to map to EncoreUI's
     * `"WARNING"`. You can declare this  mapping with
     * `rxStatusMappings.addGlobal({ 'FOO': 'WARNING' })`. But your API `Z` also
     * returns a `"FOO"` status, which you need mapped to EncoreUI's
     * `"ERROR"` status.
     *
     * You _could_ do a transformation in your product to convert the `"FOO"`
     * from `Z` into something else, or you can make use of
     * `rxStatusMappings.addAPI()`, as follows:
     *
     * <pre>
     * rxStatusMappings.addAPI('z', { 'FOO': 'ERROR' });
     * </pre>
     *
     * Then in your template code, you would use `rx-status-column` as:
     *
     * <pre>
     * <td rx-status-column status="{{ status }}" api="z"></td>
     * </pre>
     *
     * This will tell EncoreUI that it should first check if the passed in
     * `status` was defined separately for an api `"z"`, and if so, to use that
     * mapping. If `status` can't be found in the mappings defined for `"z"`,
     * then it will fall back to the mappings you defined in your `.addGlobal()`
     * call.
     *
     * @param {String} apiName This is api name of the mapping
     * @param {String} mapping This is mapping with keys and values
     */
    rxStatusMappings.addAPI = function (apiName, mapping) {
        var api = apiMappings[apiName] || {};
        _.assign(api, mapping, upperCaseCallback);
        apiMappings[apiName] = api;
    };

    var buildMapFunc = function (mapToString) {
        return function (statusString, api) {
            var obj = {};
            if (_.isString(statusString)) {
                obj[statusString] = mapToString;
            } else if (_.isArray(statusString)) {
                _.each(statusString, function (str) {
                    obj[str] = mapToString;
                });
            }

            if (api) {
                rxStatusMappings.addAPI(api, obj);
            } else {
                rxStatusMappings.addGlobal(obj);
            }
        };
    };

    // All four of these map a string, or an array of strings,
    // to the corresponding internal status (Active/Warning/Error/Info)
    // Each can optionally take a string as the second parameter, indictating
    // which api the mapping belongs to
    rxStatusMappings.mapToActive = buildMapFunc('ACTIVE');
    rxStatusMappings.mapToWarning = buildMapFunc('WARNING');
    rxStatusMappings.mapToError = buildMapFunc('ERROR');
    rxStatusMappings.mapToInfo = buildMapFunc('INFO');
    rxStatusMappings.mapToPending = buildMapFunc('PENDING');
    rxStatusMappings.mapToDisabled = buildMapFunc('DISABLED');

    /**
     * @ngdoc function
     * @name rxStatusMappings.getInternalMapping
     * @methodOf rxStatusColumn.service:rxStatusMappings
     * @description
     *
     * `rxStatusMappings` defines a `getInternalMapping(statusString, api)` method,
     * which the framework uses to map a provided `status` string based on the
     * mapping rules from all the methods above. It's intended for internal use,
     * but there's nothing stopping you from using it if you find a need.
     *
     * If you ask it to map a string that is not registered for a mapping, it will
     * return back that same string.
     *
     * @param {String} statusString This is status string based on mapping rules
     * @param {String} api This is an api based on mapping rules
     */
    rxStatusMappings.getInternalMapping = function (statusString, api) {
        if (_.has(apiMappings, api) && _.has(apiMappings[api], statusString)) {
            return apiMappings[api][statusString];
        }

        var mapped = globalMappings[statusString];

        return mapped ? mapped : statusString;
    };

    return rxStatusMappings;
});
