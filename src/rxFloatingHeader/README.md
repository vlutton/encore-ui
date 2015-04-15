[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

An attribute directive which turns a tableheader into a floating persistent header so that names of columns are still visible, even as a user scrolls down the page. This is based off of the example at http://css-tricks.com/persistent-headers/

To use it, add an `rx-floating-header` attribute to a `table`, i.e.

    <table rx-floating-header>
        <thead>
        ...
        </thead>
        <tbody>
        </tbody>
    </table>

A common pattern in our products is to place an `<input>` filter at the top of the table, to restrict the items that are displayed. We support this as well, by placing the `<input>` directly inside of the `<thead>` in its own `<tr><th></th></tr>`. For example:

    <table rx-floating-header>
        <thead>
          <tr>
              <td colspan="2">
                  <rx-search-box
                      ng-model="searchText"
                      rx-placeholder="'Filter by any...'"></rx-search-box>
              </td>
          </tr>
          <tr>
             <th>Column One Header</th>
             <th>Column Two Header</th>
          </tr>
        </thead>
        <tbody>
            ...
        </tbody>
     </table>

Make sure you set the `colspan` attribute on the filter's `<th>`, to match the number of columns you have.

`rxFloatingHeader` is also fully compatible with `rxSortableColumn` and `rxPagination`.
