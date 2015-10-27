/**
 * @ngdoc overview
 * @name rxPaginate
 * @description
 * # rxPaginate Component
 *
 * The rxPaginate component adds pagination to a table.
 *
 * Two different forms of pagination are supported:
 *
 * 1. UI-based pagination, where all items are retrieved at once, and paginated in the UI
 * 2. Server-side pagination, where the pagination directive works with a paginated API
 *
 * # UI-Based Pagination
 * With UI-Based pagination, the entire set of data is looped over via an `ngRepeat` in the table's
 * `<tbody>`, with the data passed into the `Paginate` filter. This filter does the work of paginating
 * the set of data and communicating with the `<rx-paginate>` to draw the page selection buttons at the
 * bottom of the table.
 *
 * As shown in the first example below, the `ngRepeat` will usually look like this:
 *
 * <pre>
 * <tr ng-repeat="server in servers |
 *                orderBy: sorter.predicate:sorter.reverse |
 *                Paginate:pager ">
 * </pre>
 *
 * In this case,
 *
 * 1. `servers` is a variable bound to your page `$scope`, and contains the full set of servers.
 * 2. This is then passed to `orderBy`, to perform column sorting with `rxSortableColumn`.
 * 3. The sorted results are then passed to `Paginate:pager`, where `Paginate` is a filter from the
 * `rxPaginate` module, and `pager` is a variable on your scope created like
 * `$scope.pager = PageTracking.createInstance();`.
 *
 * This `pager` is responsible for tracking pagination state (i.e. "which page are we on", "how many
 * items per page", "total number of items tracked", etc.
 *
 * To add the pagination buttons to your table, do the following in your `<tfoot>`:
 * <pre>
 * <tfoot>
 *     <tr class="paginate-area">
 *         <td colspan="2">
 *             <rx-paginate page-tracking="pager"></rx-paginate>
 *         </td>
 *     </tr>
 * </tfoot>
 * </pre>
 *
 * Here we are using the `<rx-paginate>` directive to draw the buttons, passing it the same `pager`
 * instance described above.
 *
 * Because all of the `servers` get passed via `ng-repeat`, it means you don't need to take explicit
 * action if the set of data changes. You can change `$scope.servers` at any time, and `<rx-paginate>`
 * will automatically re-process it.
 *
 * ## Persistence
 *
 * The user's preference for the number of items to display per page will be persisted across applications
 * using {@link rxLocalStorage}. This preference is set whenever the user selects a new number to show.
 *
 * This applies to both UI-based pagination and API-based pagination.
 *
 * *NOTE*: If `itemsPerPage` is explicitly specified in the `opts` you pass to `PageTracking.createInstance()`,
 * then that pager instance will load using the `itemsPerPage` you specified, and _not_ the globally persisted value.
 *
 * *NOTE*: If you don't want a specific pager to have its `itemsPerPage` persisted to other pagers,
 * pass `persistItemsPerPage: false` with the `opts` to `createInstance()`.
 *
 * ## Hiding the pagination
 *
 * In some instances, the pagination should be hidden if there isn't enough data to require it. For example,
 * if you have `itemsPerPage` set to 10, but only have 7 items of data (so only one page). Hiding the
 * pagination is pretty simple:
 *
 * <pre>
 * <rx-paginate page-tracking="pager" ng-hide="pager.totalPages === 1"></rx-paginate>
 * </pre>
 *
 * You can use this code on any part of your view. For example, if you have pagination in your table
 * footer, it's a good idea to hide the entire footer:
 *
 * <pre>
 * <tfoot ng-hide="pager.totalPages === 1">
 *     <tr class="paginate-area">
 *         <td colspan="12">
 *             <rx-paginate page-tracking="pager"></rx-paginate>
 *         </td>
 *     </tr>
 * </tfoot>
 * </pre>
 *
 * See the rxPaginate compoent {@link /encore-ui/#/components/rxPaginate demo} for more examples of this.
 *
 * This applies to both UI-based pagination and API-based pagination.
 *
 * # API-Based Pagination
 * Many APIs support pagination on their own. Previously, we would have to grab _all_ the data at once,
 * and use the UI-Based Pagination described above. Now we have support for paginated APIs, such that we
 * only retrieve data for given pages when necessary.
 *
 * With API-based pagination, the `ngRepeat` for your table will instead look like this:
 * <pre>
 * <tr ng-repeat="server in pagedServers.items">
 * </pre>
 *
 * Note a few things here:
 *
 * 1. We now loop over a variable provided by the pager.
 * 2. We no longer pass the values through _any_ filters. Not a search text filter, not sorting filter,
 * and not the `Paginate` filter.
 *
 * ** BEGIN WARNING **
 *
 * You should _never_ access `pagedServers.items` from anywhere other than the `ng-repeat`. Do not touch
 * it in your controller. It is a dynamic value that can change at anytime. It is only intended for use
 * by `ng-repeat`.
 *
 * ** END WARNING **
 *
 * The `<tfoot>` will look like this:
 *
 * <pre>
 * <tfoot>
 *     <tr class="paginate-area">
 *         <td colspan="2">
 *             <rx-paginate
 *                 page-tracking="pagedServers"
 *                 server-interface="serverInterface"
 *                 filter-text="searchText"
 *                 selections="selectFilter.selected"
 *                 sort-column="sort.predicate"
 *                 sort-direction="sort.reverse">
 *             </rx-paginate>
 *         </td>
 *     </tr>
 * </tfoot>
 * </pre>
 *
 *  * `page-tracking` still receives the pager (`pagedServers` in this case) as an argument. What's
 *  new are the next four parameters.
 *  * `server-interface` _must_ be present. It has to be passed an object with a `getItems()` method
 *  on it. This method is what `<rx-paginate>` will use to request data from the paginated API.
 *  * `filter-text`, `selections`, `sort-column` and `sort-direction` are all optional. If present,
 *  `<rx-paginate>` will watch the variables for changes, and will call `getItems()` for updates whenever
 *  the values change.
 *
 * *Note:* If using `<rx-select-filter>` in the table, the `available` option passed to the `SelectFilter`
 * constructor **must** be provided and include every property.  This is because the filter cannot reliably
 * determine all available options from a paginated API.
 *
 * You will still create a `PageTracking` instance on your scope, just like in UI-based pagination:
 *
 * <pre>
 * $scope.pagedServers = PageTracking.createInstance();
 * </pre>
 *
 * ## getItems()
 * The `getItems()` method is one you write on your own, and lives as an interface between `<rx-paginate>`
 * and the server-side paginated API that you will be calling. The framework will make calls to `getItems()`
 * when appropriate. Rather than have to teach `<rx-paginate>` about how to call and parse a multitude of
 * different paginated APIs, it is your responsibility to implement this generic method.
 *
 * `getItems()` takes two required parameters, and one optional parameter object. When the framework calls it,
 * it looks like:
 *
 * <pre>
 * getItems(pageNumber, itemsPerPage, {
 *     filterText: some_filter_search_text,
 *     selections: selected_options_from_filters,
 *     sortColumn: the_selected_sort_column,
 *     sortDirection: the_direction_of_the_sort_column
 * });
 * </pre>
 *
 * where:
 *
 * * `pageNumber`: the 0-based page of data that the user has clicked on/requested
 * * `itemsPerPage`: the value the user currently has selected for how many items per page they wish to see
 * * `filterText`: the filter search string entered by the user, if any
 * * `selections`: an object containing the item properties and their selected options
 * * `sortColumn`: the name of the selected sort column, if any
 * * `sortDirection`: either `'ASCENDING'` or `'DESCENDING'`
 *
 * When the framework calls `getItems()`, you **_must_ return a promise**. When this promise resolves,
 * the resolved object must have the following properties on it:
 *
 * * `items`: An array containing the actual items/rows of the table returned for the request. This should at
 * least contain `itemsPerPage` items, if that many items exist on the given page
 * * `pageNumber`: The 0-based page number that these items belong to. Normally this should be the same as the
 * `pageNumber` value passed to `getItems()`
 * * `totalNumberOfItems`: The total number of items available, given the `filterText` parameter.
 *
 * Examples are below.
 *
 * ## `totalNumberOfItems`
 *
 * If you could get all items from the API in _one call_, `totalNumberOfItems` would reflect the number of items
 * returned (given necessary search parameters). For example, say the following request was made:
 *
 * <pre>
 * var pageNumber = 0;
 * var itemsPerPage = 50;
 *
 * getItems(pageNumber, itemsPerPage);
 * </pre>
 *
 * This is asking for all the items on page 0, with the user currently viewing 50 items per page. A valid response
 * would return 50 items. However, the _total_ number of items available might be 1000 (i.e. 20 pages of results).
 * Your response must then have `totalNumberOfItems: 1000`. This data is needed so we can display to the
 * user "Showing 1-50 of 1000 items" in the footer of the table.
 *
 * If `filterText` is present, then the total number of items might change. Say the request became:
 *
 * <pre>
 * var pageNumber = 0;
 * var itemsPerPage = 50;
 * var opts = {
 *         filterText: "Ubuntu"
 *     };
 *
 * getItems(pageNumber, itemsPerPage, opts);
 * </pre>
 *
 * This means "Filter all your items by the search term 'Ubuntu', then return page 0".
 * If the total number of items matching "Ubuntu" is 200, then your response would have
 * `totalNumberOfItems: 200`. You might only return 50 items in `.items`, but the framework
 * needs to know how many total items are available.
 *
 * ## Forcing a Refresh
 *
 * When using API-based pagination, there might be instances where you want to force a reload of
 * the current items. For example, if the user takes an action to delete an item. Normally, the
 * items in the view are only updated when the user clicks to change the page. To force a refresh, a
 * `refresh()` method is available on the `pagedServers`. Calling this will tell `<rx-paginate>` to
 * refresh itself. You can also pass it a `stayOnPage = true` to tell it to make a fresh request for
 * the current page, i.e.:
 * <pre>
 * var stayOnPage = true;
 * pagedServers.refresh(stayOnPage);
 * </pre>
 *
 * Internally, calling `refresh()` equates to `<rx-paginate>` doing a new `getItems()` call, with
 * the current filter/sort criteria. But the point is that you can't just call `getItems()` yourself
 * to cause an update. The framework has to call that method, so it knows to wait on the returned promise.
 *
 * This is shown in the rxPaginate component {@link /encore-ui/#/components/rxPaginate demo} with a "Refresh" button 
 * above the API-paginated example.
 *
 * ## Error Handling
 *
 *
 * `<rx-paginate>` includes a simple way to show error messages when `getItems()` rejects instead of
 * resolves. By passing `error-message="Some error text!"` to `<rx-paginate>`, the string entered
 * there will be shown in an rxNotification whenever `getItems()` fails. If `error-message` is
 * not specified, then nothing will be shown on errors. In either case, on a failure, the table will
 * stay on the page it was on before the request went out.
 *
 * If you wish to show more complicated error messages (and it is highly recommended that you do!),
 * then you'll have to do that yourself. Either put error handling code directly into your `getItems()`,
 * or have something else wait on the `getItems()` promise whenever it's called, and perform the handling there.
 *
 * One way to do this is as so:
 *
 * Let's say that you had defined your `getItems()` method on an object called `pageRequest`,
 *
 * <pre>
 * var pageRequest = {
 *         getItems: function (pageNumber, itemsPerPage, opts) {
 *             var defer = $q.deferred();
 *             ...
 *         }
 *     };
 * </pre>
 *
 * You want your `getItems()` to be unaware of the UI, i.e. you don't want to mix API and UI logic into one method.
 *
 * Instead, you could do something like this:
 *
 * <pre>
 * var pageRequest = {
 *         getItemsFromAPI: function (pageNumber, itemsPerPage, opts) {
 *             var defer = $q.deferred();
 *                ...
 *         }
 *
 *         getItems: function (pageNumber, itemsPerPage, opts) {
 *             var promise = this.getItemsFromAPI(pageNumber, itemsPerPage, opts);
 *
 *             rxPromiseNotifications.add(promise, {
 *                 error: 'Error loading page ' + pageNumber
 *             }
 *
 *             return promise;
 *         }
 *     };
 * </pre>
 *
 * Thus we've moved the API logic into `getItemsFromAPI`, and handled the UI logic separately.
 *
 * ## Extra Filtering Parameters
 *
 * By default, `<rx-paginate>` can automatically work with a search text field (using `search-text=`).
 * If you need to filter by additional criteria (maybe some dropdowns/radiobox, extra filter boxes, etc),
 * you'll need to do a bit more work on your own.
 *
 * To filter by some element X, set a `$watch` on X's model. Whenever it changes, call
 * `pagedServers.refresh()` to force `<rx-paginate>` to do a new `getItems()` call. Then, in your
 * `getItems()`, grab the current value of X and send it out along with the normal criteria that are passed
 * into `getItems()`. Something like:
 *
 * <pre>
 * $scope.watch('extraSearch', $scope.pagedServers.refresh);
 *
 * var serverInterface = {
 *         getItems: function (pageNumber, itemsPerPage, opts) {
 *             var extraSearch = $scope.extraSearch;
 *             return callServerApi(pageNumber, itemsPerPage, opts, extraSearch);
 *         }
 *     };
 *
 *    ...
 *
 * <rx-paginate server-interface="serverInterface" ... ></rx-paginate>
 * </pre>
 *
 * Remember that calling `refresh()` without arguments will tell `rx-paginate` to make a fresh request for
 * page 0. If you call it with `true` as the first argument, the request will be made with whatever the current
 * page is, i.e. `getItems(currentPage, ...)`. If you have your own search criteria, and they've changed since the
 * last time this was called, note that the page number might now be different. i.e. If the user was on page 10,
 * they entered some new filter text, and you call `refresh(true)`, there might not even be 10 pages of results
 * with that filter applied.
 *
 * In general, if you call `refresh(true)`, you should check if _any_ of the filter criteria have changed since
 * the last call. If they have, you should ask for page 0 from the server, not the page number passed in to
 * `getItems()`. If you call `refresh()` without arguments, then you don't have to worry about comparing to the
 * last-used filter criteria.
 *
 * ## Local Caching
 *
 * **If you are ok with a call to your API every time the user goes to a new page in the table, then you can ignore
 * this section. If you want to reduce the total number of calls to your API, please read on.**
 *
 * When a `getItems()` request is made, the framework passes in the user's `itemsPerPage` value. If it is 50, and
 * there are 50 results available for the requested page, then you should return _at least_ 50 results. However, you
 * may also return _more_ than 50 items.
 *
 * Initially, `<rx-paginate>` will call `getItems()`, wait for a response, and then update items in the table.  If
 * your `getItems()` returned exactly `itemsPerPage` results in its `items` array, and the user navigates to a
 * different page of data, `getItems()` will be called again to fetch new information from the API.  The user will
 * then need to wait before they see new data in the table. This remains true for every interaction with page data
 * navigation.
 *
 * For example, say the following request is made when the page first loads:
 *
 * <pre>
 * var pageNumber = 0;
 * var itemsPerPage = 50;
 *
 * getItems(pageNumber, itemsPerPage);
 * </pre>
 *
 * Because no data is available yet, `<rx-paginate>` will call `getItems()`, wait for the response, and then draw
 * the items in the table. If you returned exactly 50 items, and the user then clicks "Next" or 2 (to go to the
 * second page), then `getItems()` will have to be called again (`getItems(1, 50)`), and the user will have to wait
 * for the results to come in.
 *
 * However, if your `getItems()` were to pull more than `itemsPerPage` of data from the API, `<rx-paginate>` is
 * smart enough to navigate through the saved data without needing to make an API request every time the page is
 * changed.
 *
 * There are some caveats, though.
 *
 * 1. Your returned `items.length` must be a multiple of `itemsPerPage` (if `itemsPerPage = 50`, `items.length`
 * must be 50, 100, 150, etc.)
 * 2. You will need to calculate the page number sent to the API based on requested values in the UI.
 * 3. If the user enters any search text, and you've passed the search field to `<rx-paginate>` via `search-text`,
 * then the cache will be immediately flushed and a new request made.
 * 4. If you've turned on column-sorting, and passed `sort-column` to `<rx-paginate>`, then the cache will be
 * flushed whenever the user changes the sort, and a new request will be made to `getItems()`
 * 5. If you've passed `sort-direction` to `<rx-paginate>, and the user changes the sort
 * direction, then the cache will be flushed and a new request will be made to `getItems()`
 *
 * Details on this are below.
 *
 * ### Local Caching Formula
 *
 * You have to be careful with grabbing more items than `itemsPerPage`, as you'll need to modify the values
 * you send to your server. If you want to be careful, then **don't ever request more than `itemsPerPage`
 * from your API.**
 *
 * Let's say that `itemsPerPage` is 50, but you want to grab 200 items at a time from the server, to reduce
 * the round-trips to your API. We'll call this 200 the `serverItemsPerPage`. First, ensure that your
 * `serverItemsPerPage` meets this requirement:
 *
 * <pre>
 * (serverItemsPerPage >= itemsPerPage) && (serverItemsPerPage % itemsPerPage === 0)
 * </pre>
 *
 * If you're asking for 200 items at a time, the page number on the server won't match the page number
 * requested by the user. Before, a user call for `pageNumber = 4` and `itemsPerPage = 50` means
 * "Give me items 200-249". But if you're telling your API that each page is 200 items long, then
 * `pageNumber = 4` is not what you want to ask your API for (it would return items 800-999!). You'll need to
 * send a custom page number to the server. In this case, you'd need `serverPageNumber` to be `1`, i.e.
 * the second page of results from the server.
 *
 * We have written a utility function do these calculations for you, `rxPaginateUtils.calculateApiVals`. It
 * returns an object with `serverPageNumber` and `offset` properties. To use it, your `getItems()` might
 * look something like this.
 *
 * <pre>
 * var getItems = function (pageNumber, itemsPerPage) {
 *         var deferred = $q.defer();
 *         var serverItemsPerPage = 200;
 *         var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
 *
 *         yourRequestToAPI(vals.serverPageNumber, serverItemsPerPage)
 *         .then(function (items) {
 *             deferred.resolve({
 *                 items: items.slice(vals.offset),
 *                 pageNumber: pageNumber,
 *                 totalNumberOfItems: items.totalNumberOfItems
 *             });
 *
 *         });
 *
 *         return deferred.promise;
 *     };
 * </pre>
 *
 * The following tables should help illustrate what we mean with these conversions. In all three cases,
 * there are a total of 120 items available from the API.
 *
 *
 * | pageNumber | itemsPerPage | Items   | Action     | serverPageNumber | serverItemsPerPage | Items  |
 * |------------|--------------|---------|------------|------------------|--------------------|--------|
 * | 0          | 50           | 1-50    | getItems() | 0                | 50                 | 1-50   |
 * | 1          | 50           | 51-100  | getItems() | 1                | 50                 | 51-100 |
 * | 2          | 50           | 101-120 | getItems() | 2                | 50                 | 101-120|
 *
 *
 * This first table is where you don't want to do any local caching. You send the `pageNumber` and
 * `itemsPerPage` to your API, unchanged from what the user requested. Every time the user clicks to go to
 * a new page, an API request will take place.
 *
 * ***
 *
 *
 * |pageNumber   | itemsPerPage | Items   | Action     | serverPageNumber | serverItemsPerPage | Items |
 * |-------------|--------------|---------|------------|------------------|--------------------|-------|
 * | 0           | 50           | 1-50    | getItems() | 0                | 100                | 1-100 |
 * | 1           | 50           | 51-100  | use cached |                  |                    |       |
 * | 2           | 50           | 101-120 | getItems() | 1                | 100                |101-120|
 *
 *
 * This second example shows the case where the user is still looking at 50 `itemsPerPage`, but you want to
 * grab 100 items at a time from your API.
 *
 * When the table loads (i.e. the user wants to look at the first page of results), an "Action" of
 * `getItems(0, 50)` will take place. Using `calculateApiVals`, the `serverPageNumber` will be 0 when you
 * provide `serverItemsPerPage=100`. When you resolve the `getItems()` promise, you'll return items 1-100.
 *
 * When the user clicks on the second page (page 1), `getItems()` will not be called, `<rx-paginate>` will
 * instead use the values it has cached.
 *
 * When the user clicks on the third page (page 2), `getItems(2, 50)` will be called. You'll use
 * `rxPaginateutils.calculateApiVals` to calculate that `serverPageNumber` now needs to be `1`. Because
 * only 120 items in total are available, you'll eventually resolve the promise with `items` containing
 * items 101-120.
 *
 * ***
 *
 * | pageNumber | itemsPerPage | Items   | Action     | serverPageNumber | serverItemsPerPage | Items |
 * |------------|--------------|---------|------------|------------------|--------------------|-------|
 * | 0          | 50           | 1-50    | getItems() | 0                | 200                | 1-120 |
 * | 1          | 50           | 51-100  | use cached |                  |                    |  &nbsp;     |
 * | 2          | 50           | 101-120 | use cached |                  |                    |  &nbsp;     |
 *
 * In this final example, there are still only 120 items available, but you're asking your API for 200 items
 * at a time. This will cause an API request on the first page, but the next two pages will be cached, and
 * `<rx-paginate>` will use the cached values.
 *
 * ## Directives
 * * {@link rxPaginate.directive:rxLoadingOverlay rxLoadingOverlay}
 * * {@link rxPaginate.directive:rxPaginate rxPaginate}
 *
 * ## Filters
 * * {@link rxPaginate.filter:Page Page}
 * * {@link rxPaginate.filter:Paginate Paginate}
 *
 * ## Services
 * * {@link rxPaginate.service:PageTracking PageTracking}
 * * {@link rxPaginate.service:rxPaginateUtils rxPaginateUtils}
 */
angular.module('encore.ui.rxPaginate', ['encore.ui.rxLocalStorage', 'debounce'])
/**
 * @ngdoc directive
 * @name rxPaginate.directive:rxPaginate
 * @restrict E
 * @description
 * Directive that takes in the page tracking object and outputs a page
 * switching controller. It can be used in conjunction with the Paginate
 * filter for UI-based pagination, or can take an optional serverInterface
 * object if you instead intend to use a paginated server-side API
 *
 * @param {Object} pageTracking This is the page tracking service instance to
 * be used for this directive
 * @param {Number} numberOfPages This is the maximum number of pages that the
 * page object will display at a time.
 * @param {Object} [serverInterface] An object with a `getItems()` method. The requirements
 * of this method are described in the rxPaginate README
 * @param {Object} [filterText] The model for the table filter input, if any. This directive
 * will watch that model for changes, and request new results from the paginated API, on change
 * @param {Object} [selections] The `selected` property of a SelectFilter instance, if one is being used.
 * This directive will watch the filter's selections, and request new results from the paginated API, on change
 * @param {Object} [sortColumn] The model containing the current column the results should sort on.
 * This directive will watch that column for changes, and request new results from the paginated API, on change
 * @param {Object} [sortDirection] The model containing the current direction of the current sort column. This
 * directive will watch for changes, and request new results from the paginated API, on change
 * @param {String} [errorMessage] An error message that should be displayed if a call to the request fails
 */
.directive('rxPaginate', function ($q, $compile, debounce, PageTracking, rxPromiseNotifications) {
    return {
        templateUrl: 'templates/rxPaginate.html',
        replace: true,
        restrict: 'E',
        require: '?^rxLoadingOverlay',
        scope: {
            pageTracking: '=',
            numberOfPages: '@',
            serverInterface: '=?',
            filterText: '=?',
            selections: '=?',
            sortColumn: '=?',
            sortDirection: '=?'
        },
        link: function (scope, element, attrs, rxLoadingOverlayCtrl) {

            var errorMessage = attrs.errorMessage;

            rxLoadingOverlayCtrl = rxLoadingOverlayCtrl || {
                show: _.noop,
                hide: _.noop,
                showAndHide: _.noop
            };
            // We need to find the `<table>` that contains
            // this `<rx-paginate>`
            var parentElement = element.parent();
            while (parentElement.length && parentElement[0].tagName !== 'TABLE') {
                parentElement = parentElement.parent();
            }

            var table = parentElement;

            scope.scrollToTop = function () {
                table[0].scrollIntoView(true);
            };

            // Everything here is restricted to using server-side pagination
            if (!_.isUndefined(scope.serverInterface)) {

                var params = function () {
                    var direction = scope.sortDirection ? 'DESCENDING' : 'ASCENDING';
                    return {
                        filterText: scope.filterText,
                        selections: scope.selections,
                        sortColumn: scope.sortColumn,
                        sortDirection: direction
                    };
                };

                var getItems = function (pageNumber, itemsPerPage) {
                    var response = scope.serverInterface.getItems(pageNumber,
                                                   itemsPerPage,
                                                   params());
                    rxLoadingOverlayCtrl.showAndHide(response);

                    if (errorMessage) {
                        rxPromiseNotifications.add(response, {
                            error: errorMessage
                        });
                    }
                    return response;
                };

                // Register the getItems function with the PageTracker
                scope.pageTracking.updateItemsFn(getItems);

                var notifyPageTracking = function () {
                    var pageNumber = 0;
                    scope.pageTracking.newItems(getItems(pageNumber, scope.pageTracking.itemsPerPage));
                };

                // When someone changes the sort column, it will go to the
                // default direction for that column. That could cause both
                // `sortColumn` and `sortDirection` to get changed, and
                // we don't want to cause two separate API requests to happen
                var columnOrDirectionChange = debounce(notifyPageTracking, 100);

                var textChange = debounce(notifyPageTracking, 500);

                var selectionChange = debounce(notifyPageTracking, 1000);

                var ifChanged = function (fn) {
                    return function (newVal,  oldVal) {
                        if (newVal !== oldVal) {
                            fn();
                        }
                    };
                };
                // Whenever the filter text changes (modulo a debounce), tell
                // the PageTracker that it should go grab new items
                if (!_.isUndefined(scope.filterText)) {
                    scope.$watch('filterText', ifChanged(textChange));
                }

                if (!_.isUndefined(scope.selections)) {
                    scope.$watch('selections', ifChanged(selectionChange), true);
                }

                if (!_.isUndefined(scope.sortColumn)) {
                    scope.$watch('sortColumn', ifChanged(columnOrDirectionChange));
                }
                if (!_.isUndefined(scope.sortDirection)) {
                    scope.$watch('sortDirection', ifChanged(columnOrDirectionChange));
                }

                notifyPageTracking();

            }

        }
    };
})
/**
 * @ngdoc directive
 * @name rxPaginate.directive:rxLoadingOverlay
 * @restrict A
 * @description
 * This directive can be used to show and hide a "loading" overlay on top
 * of any given element. Add this as an attribute to your element, and then
 * other sibling or child elements can require this as a controller.
 *
 * @method show - Shows the overlay
 * @method hide - Hides the overlay
 * @method showAndHide(promise) - Shows the overlay, and automatically
 * hides it when the given promise either resolves or rejects
 */
.directive('rxLoadingOverlay', function ($compile) {
    var loadingBlockHTML = '<div ng-show="showLoadingOverlay" class="loading-overlay">' +
                                '<div class="loading-text-wrapper">' +
                                    '<i class="fa fa-fw fa-lg fa-spin fa-circle-o-notch"></i>' +
                                    '<div class="loading-text">Loading...</div>' +
                                '</div>' +
                            '</div>';

    return {
        restrict: 'A',
        scope: true,
        controller: function ($scope) {
            this.show = function () {
                $scope.showLoadingOverlay = true;
            };

            this.hide = function () {
                $scope.showLoadingOverlay = false;
            };

            this.showAndHide = function (promise) {
                this.show();
                promise.finally(this.hide);
            };
        },
        link: function (scope, element) {
            // This target element has to have `position: relative` otherwise the overlay
            // will not sit on top of it
            element.css({ position: 'relative' });
            scope.showLoadingOverlay = false;

            $compile(loadingBlockHTML)(scope, function (clone) {
                element.append(clone);
            });
        }
    };
})
/**
 * @ngdoc service
 * @name rxPaginate.service:PageTracking
 * @description
 * This is the data service that can be used in conjunction with the pagination
 * objects to store/control page display of data tables and other items.
 *
 * @example
 * <pre>
 * PageTracking.createInstance({showAll: true, itemsPerPage: 15});
 * </pre>
 */
.factory('PageTracking', function ($q, LocalStorage, rxPaginateUtils) {
    function PageTrackingObject (opts) {
        var pager = _.defaults(_.cloneDeep(opts), {
            itemsPerPage: 200,
            persistItemsPerPage: true,
            pagesToShow: 5,
            pageNumber: 0,
            pageInit: false,
            total: 0,
            showAll: false,
            itemSizeList: [50, 200, 350, 500]
        });

        // This holds all the items we've received. For UI pagination,
        // this will be the entire set. For API pagination, this will be
        // whatever chunk of data the API decided to send us
        pager.localItems = [];

        var itemsPerPage = pager.itemsPerPage;
        var itemSizeList = pager.itemSizeList;

        // If itemSizeList doesn't contain the desired itemsPerPage,
        // then find the right spot in itemSizeList and insert the
        // itemsPerPage value
        if (!_.contains(itemSizeList, itemsPerPage)) {
            var index = _.sortedIndex(itemSizeList, itemsPerPage);
            itemSizeList.splice(index, 0, itemsPerPage);
        }

        var selectedItemsPerPage = parseInt(LocalStorage.getItem('rxItemsPerPage'));

        // If the user has chosen a desired itemsPerPage, make sure we're respecting that
        // However, a value specified in the options will take precedence
        if (!opts.itemsPerPage && !_.isNaN(selectedItemsPerPage) && _.contains(itemSizeList, selectedItemsPerPage)) {
            pager.itemsPerPage = selectedItemsPerPage;
        }

        Object.defineProperties(pager, {
            'items': {
                // This returns the slice of data for whatever current page the user is on.
                // It is used for server-side pagination.
                get: function () {
                    var info = rxPaginateUtils.firstAndLast(pager.pageNumber, pager.itemsPerPage, pager.total);
                    return pager.localItems.slice(info.first - pager.cacheOffset, info.last - pager.cacheOffset);
                }
            },

            'totalPages': {
                get: function () { return Math.ceil(pager.total / pager.itemsPerPage); }
            }
        });

        function updateCache (pager, pageNumber, localItems) {
            var numberOfPages = Math.floor(localItems.length / pager.itemsPerPage);
            var cachedPages = numberOfPages ? _.range(pageNumber, pageNumber + numberOfPages) : [pageNumber];
            pager.cachedPages = !_.isEmpty(cachedPages) ? cachedPages : [pageNumber];
            pager.cacheOffset = pager.cachedPages[0] * pager.itemsPerPage;
        }

        updateCache(pager, 0, pager.localItems);

        var updateItems = function (pageNumber) {
            // This is the function that gets used when doing UI pagination,
            // thus we're not waiting for the pageNumber to come back from a service,
            // so we should set it right away. We can also return an empty items list,
            // because for UI pagination, the items themselves come in through the Pagination
            // filter
            pager.pageNumber = pageNumber;
            var data = {
                items: [],
                pageNumber: pageNumber,
                totalNumberOfItems: pager.total
            };
            return $q.when(data);
        };
        pager.updateItemsFn = function (fn) {
            updateItems = fn;
        };

        // Used by rxPaginate to tell the pager that it should grab
        // new items from itemsPromise, where itemsPromise is the promise
        // returned by a product's getItems() method.
        // Set shouldUpdateCache to false if the pager should not update its cache with these values
        pager.newItems = function (itemsPromise, shouldUpdateCache) {
            if (_.isUndefined(shouldUpdateCache)) {
                shouldUpdateCache = true;
            }
            return itemsPromise.then(function (data) {
                pager.pageNumber = data.pageNumber;
                pager.localItems = data.items;
                pager.total = data.totalNumberOfItems;
                if (shouldUpdateCache) {
                    updateCache(pager, pager.pageNumber, data.items);
                }
                return data;
            });
        };

        // 0-based page number
        // opts: An object containing:
        //  forceCacheUpdate: true/false, whether or not to flush the cache
        //  itemsPerPage: If specificed, request this many items for the page, instead of
        //                using pager.itemsPerPage
        pager.goToPage = function (n, opts) {
            opts = opts || {};
            var shouldUpdateCache = true;

            // If the desired page number is currently cached, then just reuse
            // our `localItems` cache, rather than going back to the API.
            // By setting `updateCache` to false, it ensures that the current
            // pager.cacheOffset and pager.cachedPages values stay the
            // same
            if (!opts.forceCacheUpdate && _.contains(pager.cachedPages, n)) {
                shouldUpdateCache = false;
                return pager.newItems($q.when({
                    pageNumber: n,
                    items: pager.localItems,
                    totalNumberOfItems: pager.total
                }), shouldUpdateCache);
            }

            var itemsPerPage = opts.itemsPerPage || pager.itemsPerPage;
            return pager.newItems(updateItems(n, itemsPerPage), shouldUpdateCache);
        };

        // This tells the pager to go to the current page, but ensure no cached
        // values are used. Can be used by page controllers when they want
        // to force an update
        pager.refresh = function (stayOnCurrentPage) {
            var pageNumber = stayOnCurrentPage ? pager.currentPage() : 0;
            return pager.goToPage(pageNumber, { forceCacheUpdate: true });
        };

        pager.isFirstPage = function () {
            return pager.isPage(0);
        };

        pager.isLastPage = function () {
            return pager.isPage(_.max([0, pager.totalPages - 1]));
        };

        pager.isPage = function (n) {
            return pager.pageNumber === n;
        };

        pager.isPageNTheLastPage = function (n) {
            return pager.totalPages - 1 === n;
        };

        pager.currentPage = function () {
            return pager.pageNumber;
        };

        pager.goToFirstPage = function () {
            pager.goToPage(0);
        };

        pager.goToLastPage = function () {
            pager.goToPage(_.max([0, pager.totalPages - 1]));
        };

        pager.goToPrevPage = function () {
            pager.goToPage(pager.currentPage() - 1);
        };

        pager.goToNextPage = function () {
            pager.goToPage(pager.currentPage() + 1);
        };

        pager.isEmpty = function () {
            return pager.total === 0;
        };

        pager.setItemsPerPage = function (numItems) {
            var opts = {
                forceCacheUpdate: true,
                itemsPerPage: numItems
            };
            return pager.goToPage(0, opts).then(function (data) {
                // Wait until we get the data back from the API before we
                // update itemsPerPage. This ensures that we don't show
                // a "weird" number of items in a table
                pager.itemsPerPage = numItems;
                // Now that we've "officially" changed the itemsPerPage,
                // we have to update all the cache values
                updateCache(pager, data.pageNumber, data.items);

                // Persist this itemsPerPage as the new global value
                if (pager.persistItemsPerPage) {
                    PageTracking.userSelectedItemsPerPage(numItems);
                }
            });
        };

        pager.isItemsPerPage = function (numItems) {
            return pager.itemsPerPage === numItems;
        };

        this.pager = pager;

        pager.goToPage(pager.pageNumber);

    }

    var PageTracking = {
        /**
        * @property {number} itemsPerPage This is the current setting for the number
        * of items to display per page.
        * @property {boolean} [persistItemsPerPage=true] Whether or not a change to this pager's itemsPerPage
        * should be persisted globally to all other pagers
        * @property {number} pagesToShow This is the number of pages to show
        * in the pagination controls
        * @property {number} pageNumber This is where the current page number is
        * stored.
        * @property {boolean} pageInit This is used to determine if the page has been
        * initialzed before.
        * @property {number} total This is the total number of items that are in the
        * data set
        * @property {boolean} showAll This is used to determine whether or not to use
        * the pagination or not.
        *
        * @method createInstance This is used to generate the instance of the
        * PageTracking object. Enables the ability to override default pager.
        * If you choose to override the default `itemsPerPage`, and it isn't
        * a value in itemSizeList, then it will automatically be added to itemSizeList
        * at the right spot.
        */
        createInstance: function (options) {
            options = options ? options : {};
            var tracking = new PageTrackingObject(options);
            return tracking.pager;
        },

        /*
        * @method userSelectedItemsPerPage This method sets a new global itemsPerPage value
        */
        userSelectedItemsPerPage: function (itemsPerPage) {
            LocalStorage.setItem('rxItemsPerPage', itemsPerPage);
        }
    };

    return PageTracking;
})
/**
 * @ngdoc filter
 * @name rxPaginate.filter:Paginate
 * @description
 * This is the pagination filter that is used to calculate the division in the
 * items list for the paging.
 *
 * @param {Object} items The list of items that are to be sliced into pages
 * @param {Object} pager The instance of the PageTracking service. If not
 * specified, a new one will be created.
 *
 * @returns {Object} The list of items for the current page in the PageTracking object
 */
.filter('Paginate', function (PageTracking, rxPaginateUtils) {
    return function (items, pager) {
        if (!pager) {
            pager = PageTracking.createInstance();
        }
        if (pager.showAll) {
            pager.total = items.length;
            return items;
        }
        if (items) {

            pager.total = items.length;
            // We were previously on the last page, but enough items were deleted
            // to reduce the total number of pages. We should now jump to whatever the
            // new last page is
            // When loading items over the network, our first few times through here
            // will have totalPages===0. We do the _.max to ensure that
            // we never set pageNumber to -1
            if (pager.pageNumber + 1 > pager.totalPages) {
                if (!pager.isLastPage()) {
                    pager.goToLastPage();
                }
            }
            var firstLast = rxPaginateUtils.firstAndLast(pager.currentPage(), pager.itemsPerPage, items.length);
            return items.slice(firstLast.first, firstLast.last);
        }
    };
})
/**
 * @ngdoc service
 * @name rxPaginate.service:rxPaginateUtils
 * @description
 * A few utilities to calculate first, last, and number of items.
 */
.factory('rxPaginateUtils', function () {
    var rxPaginateUtils = {};

    rxPaginateUtils.firstAndLast = function (pageNumber, itemsPerPage, totalNumItems) {
        var first = pageNumber * itemsPerPage;
        var added = first + itemsPerPage;
        var last = (added > totalNumItems) ? totalNumItems : added;

        return {
            first: first,
            last: last,
        };

    };

    // Given the user requested pageNumber and itemsPerPage, and the number of items we'll
    // ask a paginated API for (serverItemsPerPage), calculate what page number the API
    // should be asked for, how and far of an offset to use to slice into the returned items.
    // It is expected that authors of getItems() functions will use this, and do the slice themselves
    // before resolving getItems()
    rxPaginateUtils.calculateApiVals = function (pageNumber, itemsPerPage, serverItemsPerPage) {
        var serverPageNumber = Math.floor(pageNumber * itemsPerPage / serverItemsPerPage);
        var offset = pageNumber * itemsPerPage - serverItemsPerPage * serverPageNumber;

        return {
            serverPageNumber: serverPageNumber,
            offset: offset
        };
    };

    return rxPaginateUtils;
})
/**
 * @ngdoc filter
 * @name rxPaginate.filter:PaginatedItemsSummary
 * @description
 * Given an active pager (i.e. the result of PageTracking.createInstance()),
 * return a string like "26-50 of 500", when on the second page of a list of
 * 500 items, where we are displaying 25 items per page
 *
 * @param {Object} pager The instance of the PageTracking service. If not
 *
 * @returns {String} The list of page numbers that will be displayed.
 */
.filter('PaginatedItemsSummary', function (rxPaginateUtils) {
    return function (pager) {
        var template = '<%= first %>-<%= last %> of <%= total %>';
        if (pager.showAll || pager.itemsPerPage > pager.total) {
            template = '<%= total %>';
        }
        var firstAndLast = rxPaginateUtils.firstAndLast(pager.currentPage(), pager.itemsPerPage, pager.total);
        return _.template(template, {
            first: firstAndLast.first + 1,
            last: firstAndLast.last,
            total: pager.total
        });
    };
})
/**
 * @ngdoc filter
 * @name rxPaginate.filter:Page
 * @description
 * This is the pagination filter that is used to limit the number of pages
 * shown
 *
 * @param {Object} pager The instance of the PageTracking service. If not
 * specified, a new one will be created.
 *
 * @returns {Array} The list of page numbers that will be displayed.
 */
.filter('Page', function (PageTracking) {
    return function (pager) {
        if (!pager) {
            pager = PageTracking.createInstance();
        }

        var displayPages = [],
            // the next four variables determine the number of pages to show ahead of and behind the current page
            pagesToShow = pager.pagesToShow || 5,
            pageDelta = (pagesToShow - 1) / 2,
            pagesAhead = Math.ceil(pageDelta),
            pagesBehind = Math.floor(pageDelta);

        if (pager && pager.length !== 0) {
                // determine starting page based on (current page - (1/2 of pagesToShow))
            var pageStart = Math.max(Math.min(pager.pageNumber - pagesBehind, pager.totalPages - pagesToShow), 0),

                // determine ending page based on (current page + (1/2 of pagesToShow))
                pageEnd = Math.min(Math.max(pager.pageNumber + pagesAhead, pagesToShow - 1), pager.totalPages - 1);

            for (pageStart; pageStart <= pageEnd; pageStart++) {
                // create array of page indexes
                displayPages.push(pageStart);
            }
        }

        return displayPages;
    };
});
