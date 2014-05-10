[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Used for adding pagination around a data object.

# Hiding the pagination

In some instances, the pagination should be hidden if there isn't enough data to require it. For example, if you have `itemsPerPage` set to 10, but only have 7 items of data (so only one page). Hiding the pagination is pretty simple:

    <rx-paginate page-tracking="pager" ng-hide="pager.totalPages === 1"></rx-paginate>

You can use this code on any part of your view. For example, if you have pagination in your table footer, it's a good idea to hide the entire footer:

    <tfoot ng-hide="pager.totalPages === 1">
        <tr class="paginate-area">
            <td colspan="12">
                <rx-paginate page-tracking="pager"></rx-paginate>
            </td>
        </tr>
    </tfoot>

See the demo page for more examples of this.