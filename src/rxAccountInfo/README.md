[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This component is used to draw an account info box at the top of each page, directly underneath the breadcrumbs. `rxPage` (through `rxApp`) integrates it directly into its template, and you activate it by passing `account-number="..."` to `<rx-page>`.

While you could theoretically use this component elsewhere, its design and style were done with the intention of sitting underneath the breadcrumbs.

When placed on a page that has `:user` in its route parameters, this component will also draw a drop-down user selector, to allow the Racker to change which user they're looking at for the given account. At this time, this user-selection is *only* available for products under Cloud. If you need it for additional products, please let us know. 

This directive requires that `SupportAccount`, `Encore`, `AccountStatusGroup`, and `Teams` services are available. These are not provided by this project,
but are available in an internal Rackspace repository.
