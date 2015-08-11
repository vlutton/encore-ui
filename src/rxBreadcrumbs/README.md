[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Service/Directive to add/update breadcrumbs on a page

By default, the first breadcrumb will always have an URL of `'/'` and a name of `'Home'`. This can be changed
with the `rxBreadcrumbsSvc.setHome()` method. It takes the new path as the first argument, and an optional name as the
second argument. If you don't pass the second argument, it will reuse whatever name is already there (i.e. `'Home'`).
The breadcrumb name can contain HTML (ie. `'<strong>Home</strong>'`).

The argument `status` is also an optional argument to breadcrumbs. This leverages the tags defined in [rxApp](#/components/rxApp) to display status tags directly inside of breadcrumbs. The demo shows the use of the custom `"demo"` tag.

A final optional argument is the boolean `usePageStatusTag`, which defaults to `false`. If you set it to `true`, then the breadcrumb will use whatever
status tag was passed to page, i.e.:

    <rx-page status="alpha">

This will cause any breadcrumb marked with `usePageStatusTag` on this page to receive the `"alpha"` status tag.

For a given breadcrumb, `status` will take precedence over `usePageStatusTag`, i.e. it will use a tag defined in `status` instead of checking
for and using tag for the page.
