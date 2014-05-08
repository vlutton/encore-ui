[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Responsible for creating the HTML necessary for a common Encore layout.

# Usage

For apps that want to use the default Encore navigation, usage is pretty simple. In your index.html file, add the `rx-app` directive inside your app:

    <body ng-app="myApp">
        <rx-app>
            <ng-view></ng-view>
        </rx-app>
    </body>

By including `ng-view`, your view content will be added inside the directive. This makes setting up views for each page much simpler, since you don't have to include `rx-app` in each view.

## Dynamically updating the menu

By default, rxApp will create the navigation menu based on the routes defined in the 'encoreNav' value. This menu is built using the rxAppRoutes service.

To update a route, use the `setRouteByKey` function on the rxAppRoutes service:

    rxAppRoutes.setRouteByKey('myKey', {
        linkText: 'myUpdatedRoute'
    })

## Custom Menus

If you'd like to create an entirely custom menu, you can pass that data in to the `rx-app` directive via the `menu` attribute. View the demo for an example of this.

# rx-page

You'll likely want to use `rx-page` inside your template view. For example, inside a 'myView.html' file:

    <rx-page title="'Example Page'">
        Here is my content
    </rx-page>

`rx-page` is used to create a common wrapper for specific page views. It automatically adds the breadcrumbs and page title/subtitle (if specified), along with the correct styling.

Both the `title` and `subtitle` attributes accept an Angular expression, which can be a string (shown in the previous example) or a scope property. This string/property can accept other expressions, enabling you to build custom titles. The demo has an example of this usage.

## .page-actions

A `page-actions` class is provided by rx-app to easily add custom page actions to the top right of a page. For example:

    <rx-page title="'Servers Overview'">
        <div class="page-actions">
            <a href="/create" class="link-action msg-action">Create New Server</a>
        </div>
        <img src="http://cdn.memegenerator.net/instances/500x/48669250.jpg" alt="Look at all these servers there are so many"
    </rx-page>

# rx-app-nav and rx-app-nav-item

These two directives are responsible for creating the menu in the left sidebar. They're not intended for use outside of the rx-app template code.