[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

Service/Directive to add/update breadcrumbs on a page

By default, the first breadcrumb will always have an URL of `'/'` and a name of `'Home'`. This can be changed
with the `rxBreadcrumbsSvc.setHome()` method. It takes the new path as the first argument, and an optional name as the
second argument. If you don't pass the second argument, it will reuse whatever name is already there (i.e. `'Home'`).
The breadcrumb name can contain HTML (ie. `'<strong>Home</strong>'`).

The argument `status` is also an optional argument to breadcrumbs. This leverages the tags defined in [rxApp](./#/component/rxApp) to display status tags directly inside of breadcrumbs. The demo shows the use of the custom `"demo"` tag.
