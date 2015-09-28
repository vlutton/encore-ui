/**
 * @ngdoc overview
 * @name rxApp
 * @description
 * # rxApp Component
 *
 * This component is responsible for creating the HTML necessary for a common
 * Encore layout. It builds out the main navigation, plus breadcrumbs and page
 * titles.
 *
 * # Usage
 *
 * For apps that want to use the default Encore navigation, usage is pretty simple.
 * In your index.html file, add the `rx-app` directive inside your app:
 *
 * <pre>
 * <body ng-app="myApp">
 *     <rx-app>
 *         <ng-view></ng-view>
 *     </rx-app>
 * </body>
 * </pre>
 *
 * By including `ng-view`, your view content will be added inside the directive.
 * This makes setting up views for each page much simpler, since you don't have
 * to include `rx-app` in each view.
 *
 * Inside your view, you'll likely want to use `rx-page` to wrap your content.
 * See the `rx-page` docs for more information on this.
 *
 * # rxApp Navigation
 *
 * By default, the EncoreUI left-hand navigation is loaded at runtime from a
 * separate resource. This source can be changed, and there are many options to
 * control the navigation from an app level.
 *
 * ## Accessing route information
 *
 * Sometimes it's helpful to have the current route information available for
 * menu items. For example, re-using the current params for path building.
 *
 * To help with this, $route is exposed on the scope of all menu items.
 * [`$route` provides many details on the current view](http://goo.gl/IsIscD),
 * including the ability to access the current controller and scope for the view.
 *
 * To see this in action, check out the 'childVisibility' property for
 * Account-level Tool in `encoreNav`.
 *
 * ## Accessing properties on $rootScope
 *
 * If you have a property available on the `$rootScope` of your app that the
 * menu data needs to access,
 * [you can reference `$rootScope` via `$root`](http://goo.gl/8vHlsN).
 * See the demo for an example of this.
 *
 * ## Dynamically updating the menu
 *
 * By default, rxApp will create the navigation menu based on the routes defined
 * in the 'encoreNav' value. This menu is built using the rxAppRoutes service.
 *
 * To update a route, use the `setRouteByKey` function on the rxAppRoutes service:
 *
 * <pre>
 * rxAppRoutes.setRouteByKey('myKey', {
 *     linkText: 'myUpdatedRoute'
 * });
 * </pre>
 *
 * You would normally either set this in your app's `.run` function, or in a
 * specific controller.
 *
 * ## Custom Menus
 *
 * If you'd like to create an entirely custom menu, you can pass that data in to
 * the `rx-app` directive via the `menu` attribute. View the demo for an example
 * of this.
 *
 * # Common Styling
 *
 * The rxApp common.less file defines many base CSS rules and classes for app use.
 * Included in this is [normalize.css](http://necolas.github.io/normalize.css/).
 * This helps create a consistent starting point for styles across all browsers.
 *
 * ## Fonts
 *
 * The EncoreUI default font is Roboto. This is used for all text on the page
 * and is loaded via Google Fonts. Be sure your app includes the following line:
 *
 * <pre>
 * <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,700,700italic"
 *       rel="stylesheet" type="text/css" />
 * </pre>
 *
 * ## Directives
 * * {@link rxApp.directive:rxAccountSearch rxAccountSearch}
 * * {@link rxApp.directive:rxAccountUsers rxAccountUsers}
 * * {@link rxApp.directive:rxApp rxApp}
 * * {@link rxApp.directive:rxAppNav rxAppNav}
 * * {@link rxApp.directive:rxAppNavItem rxAppNavItem}
 * * {@link rxApp.directive:rxAppSearch rxAppSearch}
 * * {@link rxApp.directive:rxAtlasSearch rxAtlasSearch}
 * * {@link rxApp.directive:rxBillingSearch rxBillingSearch}
 * * {@link rxApp.directive:rxPage rxPage}
 * * {@link rxApp.directive:rxStatusTag rxStatusTag}
 * * {@link rxApp.directive:rxTicketSearch rxTicketSearch}
 *
 * ## Services
 * * {@link rxApp.service:encoreRoutes encoreRoutes}
 * * {@link rxApp.service:rxHideIfUkAccount rxHideIfUkAccount}
 * * {@link rxApp.service:rxVisibility rxVisibility}
 * * {@link rxApp.service:rxVisibilityPathParams rxVisibilityPathParams}
 * * {@link rxApp.service:rxStatusTags rxStatusTags}
 */
angular.module('encore.ui.rxApp', [
    'encore.ui.rxAppRoutes',
    'encore.ui.rxEnvironment',
    'ngSanitize',
    'ngRoute',
    'cfp.hotkeys',
    'encore.ui.rxSession',
    'encore.ui.rxLocalStorage',
    'encore.ui.rxPermission'
])
/**
 * @ngdoc service
 * @name rxApp.service:encoreRoutes
 * @description
 * Creates a shared instance of AppRoutes that is used for the Encore App nav.
 * This allows apps to make updates to the nav via `encoreRoutes`.
 *
 * @return {Object} Instance of rxAppRoutes with `fetchRoutes` method added
 */
.factory('encoreRoutes', function (rxAppRoutes, routesCdnPath, rxNotify, $q, $http,
                                   rxVisibilityPathParams, rxVisibility, Environment,
                                   rxHideIfUkAccount, LocalStorage) {

    // We use rxVisibility in the nav menu at routesCdnPath, so ensure it's ready
    // before loading from the CDN
    rxVisibility.addVisibilityObj(rxVisibilityPathParams);
    rxVisibility.addVisibilityObj(rxHideIfUkAccount);

    var encoreRoutes = new rxAppRoutes();

    var setWarningMessage = function () {
        rxNotify.add('There was a problem loading the navigation, so a cached version has been loaded for display.', {
            type: 'warning'
        });
    };

    var setFailureMessage = function () {
        rxNotify.add('Error loading site navigation', {
            type: 'error'
        });
    };

    var url, suffix;
    switch (true) {
        case Environment.isUnifiedProd(): {
            url = routesCdnPath.production;
            suffix = 'prod';
            break;
        }
        case Environment.isPreProd(): {
            url = routesCdnPath.preprod;
            suffix = 'preprod';
            break;
        }
        case routesCdnPath.hasCustomURL: {
            url = routesCdnPath.staging;
            suffix = 'custom';
            break;
        }
        default: {
            url = routesCdnPath.staging;
            suffix = 'staging';
        }
    }

    encoreRoutes.fetchRoutes = function () {
        var routesKey = 'encoreRoutes-' + suffix;
        var cachedRoutes = LocalStorage.getObject(routesKey);

        $http.get(url)
            .success(function (routes) {
                encoreRoutes.setAll(routes);
                LocalStorage.setObject(routesKey, routes);
            })
            .error(function () {
                if (cachedRoutes) {
                    encoreRoutes.setAll(cachedRoutes);
                    setWarningMessage();
                } else {
                    setFailureMessage();
                }
            });

        return cachedRoutes || [];
    };

    return encoreRoutes;
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxApp
 * @restrict E
 * @scope
 * @description
 * Responsible for creating the HTML necessary for a common Encore layout.
 *
 * @param {string} [siteTitle] Title of site to use in upper right hand corner
 * @param {array} [menu] Menu items used for left-hand navigation
 * @param {string} [collapsibleNav] Set to 'true' if the navigation menu should be collapsible
 * @param {string} [collapsedNav] Binding for the collapsed state of the menu.
 * @param {boolean} [newInstance] Whether the menu items should be a new instance of rxAppRoutes
 * @param {boolean} [hideFeeback] Whether to hide the 'feedback' link or not (defaults to show it)
 * @param {string} [logoutUrl] URL to pass to rx-logout
 *
 * @example
 * <pre>
 * <rx-app site-title="Custom Title"></rx-app>
 * </pre>
 */
.directive('rxApp', function (encoreRoutes, rxAppRoutes, hotkeys,
                              Environment, routesCdnPath, Session) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxApp.html',
        scope: {
            siteTitle: '@?',
            menu: '=?',
            collapsibleNav: '@',
            collapsedNav: '=?',
            newInstance: '@?',
            hideFeedback: '@?',
            logoutUrl: '@?'
        },
        link: function (scope) {
            scope.userId = Session.getUserId();

            scope.isPreProd = Environment.isPreProd();

            scope.isLocalNav = routesCdnPath.hasCustomURL && (Environment.isLocal());

            scope.isWarning = scope.isPreProd || scope.isLocalNav;

            if (scope.isPreProd) {
                scope.warningMessage =
                    'You are using a pre-production environment that has real, live production data!';
            } else if (scope.isLocalNav) {
                scope.warningMessage =
                    'You are using a local nav file. Remove it from your config before committing!';
            }

            // default hideFeedback to false
            var appRoutes = scope.newInstance ? new rxAppRoutes() : encoreRoutes;

            // we only want to set new menu data if a new instance of rxAppRoutes was created
            // or if scope.menu was defined
            if (scope.newInstance || scope.menu) {
                appRoutes.setAll(scope.menu);
            } else {
                // if the default menu is needed, load it from the CDN
                // a cached copy is assigned if available
                scope.routes = appRoutes.fetchRoutes();
            }

            appRoutes.getAll().then(function (routes) {
                scope.routes = routes;
            });

            // default hideFeedback to false
            scope.hideFeedback = scope.hideFeedback ? true : false;

            if (scope.collapsibleNav) {
                hotkeys.add({
                    combo: 'h',
                    description: 'Show/hide the main menu',
                    callback: function () {
                        scope.collapsedNav = !scope.collapsedNav;
                    }
                });
            }
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxPage
 * @restrict E
 * @scope
 * @description
 *
 * Responsible for creating the HTML necessary for a page (including breadcrumbs and page title)
 * You can pass in a `title` attribute or an `unsafeHtmlTitle` attribute, but not both. Use the former
 * if your title is a plain string, use the latter if your title contains embedded HTML tags AND you
 * trust the source of this title. Arbitrary javascript can be executed, so ensure you trust your source.
 *
 * The document title will be set to either `title` or a stripped version of `unsafeHtmlTitle`, depending
 * on which you provide.
 *
 * You'll likely want to use the {@link rxApp.directive:rxPage rxPage} directive
 * inside your template view. For example, inside a 'myView.html' file:
 *
 * <pre>
 * <rx-page title="'Example Page'">
 *    Here is my content
 * </rx-page>
 * </pre>
 *
 * `rx-page` is used to create a common wrapper for specific page views. It
 * automatically adds the breadcrumbs and page title/subtitle (if specified),
 * along with the correct styling.
 *
 * Both the `title` and `subtitle` attributes accept an Angular expression,
 * which can be a string (shown in the previous example) or a scope property.
 * This string/property can accept other expressions, enabling you to build custom
 * titles. The demo has an example of this usage.
 *
 * If you wish to use arbitrary HTML in your title, you can use the
 * `unsafe-html-title` attribute instead of `title`. This is considered "unsafe"
 * because it is capable of executing arbitrary Javascript, so you must ensure
 * that you trust the source of the title. The "Customized Page Title" in the
 * demo shows the use of HTML tags.
 *
 * In either case (`title` or `unsafe-html-title`), the document title
 * (i.e. visible in the browser tab) will be set to your chosen title. If you use
 * `unsafe-html-title`, all HTML tags will be stripped before setting the document
 * title.
 *
 * ### Account Info below Breadcrumbs
 *
 * `rxPage` integrates with the {@link rxAccountInfo} component,
 * to draw the Account Info box directly underneath the `rxBreadcrumbs`.
 * This is opt-in. By default, it will not appear. To enable it, pass the
 * `account-number="..."` attribute to `<rx-page>` in your template, i.e
 *
 * <pre>
 * <rx-page account-number="{{ accountNumber }}">
 * </pre>
 *
 * As noted in {@link rxAccountInfo}, this
 * directive requires that `SupportAccount`, `Encore` and `Teams` services are
 * available to the Angular Dependency Injection system. These are *not* provided
 * by EncoreUI, but are available in an internal Rackspace repository.
 *
 *
 * ### Status tags
 *
 * A final attribute that `rx-page` accepts is `status`. This takes a string,
 * and has the effect of drawing a status "tag" beside the page title.
 * The "Customized rxApp" demo shows the use of this with the `"alpha"` tag.
 *
 * The framework currently provides `"alpha"` and `"beta"` tags, but any product
 * can specify their own custom tags using the `rxStatusTagsProvider`. It currently
 * has one method, `addStatus`, which takes an unique `key` for the new tag, the
 * `class` it should use in the HTML, and the `text` that will be drawn. All custom
 * tags are drawn inside of a `<span>`, essentially as:
 *
 * <pre>
 * <span class="status-tag {{ class }}">{{ text }}</span>
 * </pre>
 *
 * To use this, do the following in your application's `.config()` method:
 *
 * <pre>
 * rxStatusTagsProvider.addStatus({
 *     key: 'gamma',
 *     class: 'alpha-status',
 *     text: 'Hello World!'
 * });
 * </pre>
 *
 * This will create a new status tag called `"gamma"`, which you can pass to `rx-page` as:
 *
 * <pre>
 * <rx-page title="'Some Title'" status="gamma">
 * </pre>
 *
 * And the title will appear with a `Hello World!` tag beside it, styled the
 * same way as our `"alpha"` status tag is styled. You can also define your own
 * CSS style in your application and use those instead, passing it as the `class`
 * value to `addStatus()`.
 *
 * All the tags are accessible inside of {@link rxBreadcrumbs}
 * as well. Any breadcrumb that was created with `useStatusTag: true` will automatically
 * receive the same status tag as you passed to `<rx-page>`.
 *
 * ### .page-actions
 *
 * A `page-actions` class is provided by rx-app to easily add custom page actions
 * to the top right of a page. For example:
 *
 * <pre>
 * <rx-page title="'Servers Overview'">
 *    <div class="page-actions">
 *        <a href="/create" class="link-action msg-action">Create New Server</a>
 *    </div>
 *    <img src="http://cdn.memegenerator.net/instances/500x/48669250.jpg"
 *         alt="Look at all these servers there are so many" />
 * </rx-page>
 * </pre>
 *
 * @param {expression} [title] Title of page
 * @param {expression} [unsafeHtmlTitle] Title for the page, with embedded HTML tags
 * @param {expression} [subtitle] Subtitle of page
 *
 * @example
 * <pre>
 * <rx-page title="'Page Title'"></rx-page>
 * </pre>
 */
.directive('rxPage', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxPage.html',
        scope: {
            title: '=',
            unsafeHtmlTitle: '=',
            subtitle: '=',
            status: '@',
            accountNumber: '@',
            teamId: '@'
        },
        link: function (scope, element) {
            // Remove the title attribute, as it will cause a popup to appear when hovering over page content
            // @see https://github.com/rackerlabs/encore-ui/issues/251
            element.removeAttr('title');

            var pageDiv = element[0];
            var pageBodyDiv = pageDiv.querySelector('.page-content');

            // Move the specified attribute from rxPage div to page-body div
            function moveLayoutAttrib (attr) {

                // Only apply to attributes that start with 'layout'
                if (!_.isString(attr.name) || !attr.name.match(/^layout/)) {
                    return;
                }

                pageBodyDiv.setAttribute(attr.name, pageDiv.getAttribute(attr.name));
                pageDiv.removeAttribute(attr.name);
            }

            // Relocate all layout attributes
            var i = pageDiv.attributes.length;
            while (i--) {
                moveLayoutAttrib(pageDiv.attributes[i]);
            }
        },
        controller: function ($scope, rxPageTitle) {
            $scope.$watch('title', function () {
                rxPageTitle.setTitle($scope.title);
            });

            $scope.$watch('unsafeHtmlTitle', function () {
                if (!_.isEmpty($scope.unsafeHtmlTitle)) {
                    rxPageTitle.setTitleUnsafeStripHTML($scope.unsafeHtmlTitle);
                }
            });
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAppNav
 * @restrict E
 * @scope
 * @description
 * Creates a menu based on items passed in.
 *
 * # Navigation Menu JSON Structure
 * EncoreUI applications, by default, load the navigation menu from JSON defined
 * in the [encore-ui-nav project](https://github.com/rackerlabs/encore-ui-nav).
 * You can specify that a different JSON file be used (see the demo below), but
 * a certain structure is expected for the JSON.
 *
 * ## Outer structure/Sections
 * The JSON consists of an array of objects, with each object representing a
 * "section" in the nav. The two demos at the bottom of this page each only have
 * one section, `"All Tools"` and `"Example Menu"`, respectively. As such, the
 * JSON for each of them is an array with one object in it. The default EncoreUI
 * nav menu only has one section `"All Tools"`, and individual products should
 * not be expecting to add their own sections.
 *
 * The application that this documentation lives in has three sections, which you
 * can see if you look at the current left nav menu.
 * They are `EncoreUI`, `Design Styleguide` and `All Components`.
 *
 * ### `title` (required)
 *
 * Each section specified in this array is required to have a `title`
 * attribute, i.e.
 *
 * <pre>
 * navJSON = [
 *     {
 *         "title": "Section 1"
 *     }, {
 *         "title": "Section 2"
 *     }
 * ]
 * </pre>
 *
 * ### `type` (optional)
 * Each section can optionally have a `type` attribute. If present, a class with
 * the value `nav-section-TYPE` will be applied in the nav, otherwise
 * `nav-section-all` will be applied.
 *
 * <pre>
 * navJSON = [
 *     {
 *         "title": "Section 1",
 *         "type": "highlight"
 *     }, {
 *         "title": "Section 2"
 *     }
 * ]
 * </pre>
 *
 * In this example, `Section 1` will have a `nav-section-highlight` class applied
 * to it, while `Section 2` will receive the default `nav-section-all` class.
 *
 * The default Encore nav menu does not currently use the `type` property, and
 * products being added to Encore should avoid it. This attribute is reserved
 * for future use by the EncoreUI designers.
 *
 * ### `children` (optional)
 *
 * A section's `children` attribute details the first level of navigation items
 * that live within the section. This is defined as an array of objects, where
 * each object represents an "item" to be displayed in the nav (and the structure
 * of the objects/items themselves will be defined in the Navigation Items
 * section below). As an example, this could look like:
 *
 *<pre>
 * navJSON = [
 *     {
 *         "title": "Section 1",
 *         "type": "highlight",
 *         "children": [
 *             {
 *                 "href": "/overview",
 *                 "key": "overview",
 *                 "linkText": "Overview"
 *             }, {
 *                 "href": "/about",
 *                 "key": "about",
 *                 "linkText": "About"
 *             },
 *         ]
 *     }, {
 *         "title": "Section 2",
 *         "children": [
 *             {
 *                 "href": "/overview2",
 *                 "linkText": "Section 2 Overview"
 *             }
 *         ]
 *     }
 * ]
 * </pre>
 *
 * These `children` will be able to have further `children` nested inside them,
 * accessible via an expand/collapse chevron, but it is important to note that
 * the top level `children` in each section will _always_ be displayed.
 *
 * ## Navigation Items
 * A Navigation Item is an object that exists in a `children` array, and
 * represents a clickable item. These items have many optional attributes,
 * and can themselves contain `children` attributes.
 *
 * Their only required attribute is `linkText`. The object will also need _one_
 * of the `href` or `children` attributes, but these two should be mutually exclusive.
 *
 * ### `linkText` (required)
 *
 * The `linkText` attribute defines what text will be shown for the item in the
 * nav menu. This was shown in the example above,
 *
 * <pre>
 * {
 *        "title": "Section 1",
 *        "type": "highlight",
 *        "children": [
 *            {
 *                 "href": "/overview",
 *                 "key": "overview",
 *                 "linkText": "Overview"
 *           }, {
 *                 "href": "/about",
 *                 "key": "about",
 *                 "linkText": "About"
 *           },
 *       ]
 * }
 * </pre>
 *
 * These items will be displayed in the nav with `Overview` and `About` text.
 *
 * ### `key` (required for top-level items)
 * The `key` attribute is used to provide an unique identifier for individual
 * navigation items. If you are introducing a new top-level item into the nav
 * menu, then the `key` is required. It is optional for any nested items. There
 * are two possible reasons you would want to provide this for nested items:
 *
 * 1. A nav item with a `key` will have the class `rx-app-key-{{ item.key }}`
 * applied to it
 * 2. `rxAppRoutes` exposes a few methods for working with the key, including
 * `isActiveByKey()` and `setRouteByKey()`
 *
 * In general, you should not need to provide a `key` attribute for any nested
 * children. We try to avoid custom styling inside the nav, so the automatic
 * class application shouldn't be necessary. And the `rxAppRoutes` methods are
 * _generally_ only used internally by EncoreUI.
 *
 *
 * ### `href` (optional)
 *
 * The `href` attribute is used to assign a URL to the item, which will be
 * navigated to when clicked. If the item has a `children` attribute, you
 * normally would not include `href`, because you want the children to
 * expand/collapse when this item is clicked, rather than navigating away to
 * somewhere else.
 *
 * For Encore products within Rackspace, we keep the products on the same domain
 * (encore.rackspace.com), but give each product its own top-level path, i.e.
 * `encore.rackspace.com/foo`, `encore.rackspace.com/bar`. By doing this, the
 * `href` values can simply be entered as `/foo` and `/bar`. And more importantly,
 * `/foo` and `/bar` can be _completely separate Angular applications_. Both
 * applications are available in the nav, but clicking on `/foo` will load a new
 * Angular application, while clicking on `/bar` loads a brand new Angular
 * application.
 *
 * This allows applications to be developed and deployed independently from each
 * other. The nav is aware of all the applications, but they do not have to be
 * aware of each other.
 *
 * An extra feature of `href` is that you can put variables into it, that will be
 * interpolated with the current `$route.current.pathParams`. Thus, you can do
 * something like:
 *
 * <pre>
 * {
 *      "title": "Section 1",
 *     "type": "highlight",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about/{{foobar}}",
 *             "key": "about",
 *             "linkText": "About"
 *         },
 *         ]
 * }
 * </pre>
 *
 * If `foobar` is currently in `$route.current.pathParams`, then its value will
 * automatically be inserted into the final URL.
 *
 *
 * ### `children` (optional)
 * If an item doesn't have an `href` attribute, it's probably because it has
 * child items via the `children` attribute.
 *
 * <pre>
 * {
 *      "title": "Section 1",
 *     "type": "highlight",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about",
 *             "key": "about",
 *             "linkText": "About"
 *         }, {
 *             "linkText": "People",
 *             "children": [
 *                 {
 *                     "href": "/people/bob",
 *                     "linkText": "Bob",
 *                 }, {
 *                     "href": "/people/sue",
 *                     "linkText": "Sue"
 *                 }
 *
 *             ]
 *         }
 *     ]
 * }
 * </pre>
 *
 * This example shows a new item `People`, which has no `href` of its own, but
 * does have `children`, which contains two new items, each with their own unique `href`.
 *
 * By default, the `Bob` and `Sue` items will not be visible, and in the nav,
 * `People` will automatically have a chevron attached. When clicked, it will
 * expand to show the `children` items.
 *
 * As an aside, in this example, there will likely be one Angular application at
 * `/people`, which is resonsible for routing `/people/bob` and `/people/sue`,
 * while `/overview` and `/about` would probably be two different Angular
 * applications.
 *
 *
 * ### `visibility` and `childVisibility` (optional)
 * The `visibility` attribute is used to control whether or not an individual nav
 * item is visible to the user. If `visibility` is not specified, then by default
 * the item is always visible. The `childVisibility` attribute takes all the same
 * possible values as `visibility`, but is used to determine whether the items in
 * `children` should be visible.
 *
 * `visibility` can take a few types of values. The original form used in EncoreUI
 * was to pass an expression, filtering values with `rxEnvironmentMatch`, i.e.
 *
 * <pre>
 * "visibility": "('unified-preprod' | rxEnvironmentMatch) || ('local' | rxEnvironmentMatch)",
 * </pre>
 *
 * This expression would be evaluated, checking if the user is currently viewing
 * the app in the `unified-preprod` environment or the `local` environment, and
 * only display the item if one of those was true. (See {@link rxEnvironment}
 * for more details on environemnts). This was used to prevent items from being
 * displayed in a production environment if they were only currently available in
 * staging.
 *
 * *Note*: Using an expression for environment checking use has somewhat tailed off.
 * We now have different JSON files for each environment, so checking the current
 * environment is not necessary.
 *
 * Another technique for visibility is to use a predefined set of visibility
 * functions that exist in the framework. These include `rxPathParams` and
 * `rxHideIfUkAccount`.
 *
 * To use these, you pass an array to `visibility`, with the first argument being
 * the name of the function to use (as a string), and the second argument as an
 * optional object describing the parameters to pass to the function.
 *
 * For instance, `rxPathParams` is used to check if a particular parameter is
 * present in the current route. The syntax is as follows:
 *
 * <pre>
 * "visibility": ["rxPathParams", { "param": "accountNumber" }],
 * </pre>
 *
 * This means "only show this item if `accountNumber` is present in the current route.
 *
 * `rxPathParams` is typically used with `childVisibility`, not `visibility`. For
 * instance, the `Account` section in Encore will by default show a search directive
 * (discussed later), and none of its children are visible. After entering a search
 * term, an account number is found, and inserted into the route. At that point,
 * all of the children under `Account` will be visible, as they all require an
 * `accountNumber` to correctly operate.
 *
 * ### `childHeader` (optional)
 *
 * The `childHeader` attribute is used to specify an HTML header to be placed
 * above the `children` in an expanded area (and thus having a `childHeader`
 * attribute requires having a `children` attribute).
 *
 * `childHeader` receives HTML content as a string, and uses
 * {@link rxCompile} to compile and insert the content above
 * the `children` items. The compiled content will be linked against the current
 * scope, allowing you to do things like:
 *
 * <pre>
 * {
 *     "title": "Section 1",
 *     "type": "highlight",
 *     "childHeader": "<strong>Current Account:</strong>#{{route.current.pathParams.accountNumber}}",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about",
 *             "key": "about",
 *             "linkText": "About"
 *         }, {
 *            "linkText": "People",
 *            "children": [
 *                 {
 *                     "href": "/people/bob",
 *                     "linkText": "Bob"
 *                 }, {
 *                     "href": "/people/sue",
 *                     "linkText": "Sue"
 *                 }
 *             ]
 *         }
 *     ]
 * }
 * </pre>
 *
 * This example will pull the `accountNumber` from the `pathParams`, and insert
 * `Current Account: 1234` above the children.
 *
 *
 *
 * ### `roles` (optional)
 *
 * *Note*: Support for `roles` requires at least version 1.19.0 of EncoreUI.
 *
 * In addition to the `visibility` criteria described above, you can also restrict
 * which items are shown to a user based on the LDAP roles of that user. This is
 * done via the `roles` attribute, which takes a single object as its value. This
 * object can be used to specify that a user requires _all_ roles from a certain
 * set, or _any_ role from a certain set, to see an item. For example:
 *
 * <pre>
 * {
 *     "title": "Section 1",
 *     "type": "highlight",
 *     "childHeader": "<strong>Current Account:</strong>#{{route.current.pathParams.accountNumber}}",
 *     "children": [
 *         {
 *             "href": "/overview",
 *             "key": "overview",
 *             "linkText": "Overview"
 *         }, {
 *             "href": "/about",
 *             "key": "about",
 *             "linkText": "About"
 *         }, {
 *             "linkText": "People",
 *             "children": [
 *                 {
 *                     "href": "/people/bob",
 *                     "linkText": "Bob",
 *                     "roles": { "all": ["role1", "role2"] }
 *                 }, {
 *                     "href": "/people/sue",
 *                     "linkText": "Sue",
 *                     "roles": { "any": ["role1", "role2", "role3"] }
 *                 }
 *
 *             ]
 *         }
 *     ]
 * }
 * </pre>
 *
 * In this example, the `Bob` item can only be seen by users who have _both_ `role1`
 * and `role2` in their LDAP roles, while the `Sue` item can only be seen by users
 * who have _at least one_ of `role1`, `role2`, or `role3`. Please keep in mind that you
 * [can't do real security in front-end JavaScript](https://goo.gl/wzuhxO).
 * Do not rely on `roles` as a security feature. `roles` is purely to enhance user
 * experience, to prevent them from seeing items that they won't have permissions
 * to access anyway. All the data is still sent to the browser. A user who knows
 * how to use the dev tools will be able to see the full list. LDAP role-based
 * security must still happen on the server-side.
 *
 *
 * ### `directive` (optional)
 * The optional `directive` attribute receives the name of a directive in its
 * dash-delimited format (i.e. uses `"rx-account-search"` instead of `"rxAccountSearch"`).
 * If this directive is available, then the navigation menu will have that directive
 * inserted and rendered directly under the `linkText` for the nav item.
 *
 * The most important line in the previous paragraph is `If this directive is
 * available...`. Let's say we add a new `Support` item to the nav, where each
 * of its children are supposed to render its own custom search directive:
 *
 * <pre>
 * {
 *     "linkText": "Support",
 *     "children": [
 *         {
 *             "linkText": "People Support",
 *             "directive": "people-search"
 *         }, {
 *             "linkText": "Machine Support",
 *             "directive": "machine-search"
 *         }
 *     ]
 * }
 * </pre>
 *
 * The _intent_ is that when the user clicks on "Support", the menu will expand
 * to show "People Support" and "Machine Support" child items, and each will
 * contain a search box, defined by the `people-search` and `machine-search`
 * directives, respectively.
 *
 * But where do those directives come from? `rxApp` provides some legacy
 * directives that are available to the nav, including `rxAppSearch`,
 * `rxAccountUsers`, etc. But `people-search` does not come from `rxApp`. And
 * recall from the `href` section that the nav might be defining multiple
 * different Angular applications. What if "Support" is defined in your
 * application, ad that's where `people-search` comes from, but the user is
 * currently in a different application? That different application won't have
 * `people-search` defined anywhere, so when the user clicks on "Support", the
 * directives won't be available.
 *
 * The solution to this is to ensure that these elements with directives _also_
 * have an `href`, and those URLs belong to Angular applications that define those
 * directives. i.e.
 *
 * <pre>
 * {
 *     "linkText": "Support",
 *     "key": "support",
 *     "children": [
 *         {
 *             "linkText": "People Support",
 *             "directive": "people-search",
 *             "href": "/support/people-support",
 *         }, {
 *             "linkText": "Machine Support",
 *             "directive": "machine-search",
 *             "href": "/support/machine-support",
 *         }
 *     ]
 * }
 * </pre>
 *
 * In fact, recall that we said all items _must_ have one of `href` or `children`,
 * so the `href` is necessary anyway. But they key here is that by having an `href`,
 * the browser will navigate to `/support/people-support` / `/support/machine-support`,
 * which should be defined in Angular apps that have `people-search` and `machine-search`
 * available as directives.
 *
 * With this configuration, clicking on `Support` will expand the `children`,
 * and the user will see `People Support` and `Machine Support`, but they will
 * not see the directives. But if they then click on one of `People Support` or
 * `Machine Support`, then the `/support` Angular application will be loaded,
 * the and the directives will become available.
 *
 * @param {object} items Menu items to display. See encoreNav for object definition
 * @param {string} level Level in heirarchy in page. Higher number is deeper nested
 *
 * @example
 * <pre>
 * <rx-app-nav level="1" items="menuItems"></rx-app-nav>
 * </pre>
 */
.directive('rxAppNav', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppNav.html',
        scope: {
            items: '=',
            level: '='
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAppNavItem
 * @restrict E
 * @scope
 * @description
 * Creates a menu item. Recursively creates rx-app-nav if 'children' present.
 * 'Item' must be avialable via scope
 *
 * @example
 * <pre>
 * <rx-app-nav-item ng-repeat="item in items"></rx-app-nav-item>
 * </pre>
 */
.directive('rxAppNavItem', function ($compile, $location, $route) {
    var linker = function (scope, element) {
        var injectContent = function (selector, content) {
            var el = element[0].querySelector(selector);
            el = angular.element(el);

            $compile(content)(scope, function (compiledHtml) {
                el.append(compiledHtml);
            });
        };

        var directiveHtml = '<directive></directive>';
        // add navDirective if defined
        if (angular.isString(scope.item.directive)) {
            // convert directive string to HTML
            // e.g. my-directive -> <my-directive></my-directive>
            directiveHtml = directiveHtml.replace('directive', scope.item.directive);

            injectContent('.item-directive', directiveHtml);
        }

        // increment nesting level for child items
        var childLevel = scope.$parent.level + 1;
        // safety check that child level is a number
        if (isNaN(childLevel)) {
            childLevel = 2;
        }
        // add children if present
        // Note: this can't be added in the HTML due to angular recursion issues
        var rxNavTemplate = '<rx-app-nav items="item.children" level="' + childLevel + '">' +
            '</rx-app-nav>';
        if (angular.isArray(scope.item.children)) {
            injectContent('.item-children', rxNavTemplate);
        }
    };

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppNavItem.html',
        link: linker,
        scope: {
            item: '='
        },
        controller: function ($scope, $location, rxVisibility, Permission) {
            // provide `route` as a scope property so that links can tie into them
            $scope.route = $route;

            var roleCheck = function (roles) {
                if (_.isUndefined(roles)) {
                    return true;
                }

                if (!_.isUndefined(roles.any)) {
                    return Permission.hasRole(roles.any);
                }

                if (!_.isUndefined(roles.all)) {
                    return Permission.hasAllRoles(roles.all);
                }

                return false;
            };

            /*
             * @description Determines whether or not a nav item should be displayed, based on `visibility`
             * criteria and `roles` criteria
             * @param [visibility] - Can be an expression, a function, an array (using format below) to
             *                     determine visibility
             * @param {object} [roles] - An object with a format { 'any': ['role1', 'role2'] } or
             *                           { 'all': ['role1', 'role2'] }
             */
            $scope.isVisible = function (visibility, roles) {
                var locals = {
                    location: $location
                };
                if (_.isUndefined(visibility) && _.isUndefined(roles)) {
                    // no visibility or role criteria specified, so default to true
                    return true;
                }

                if (_.isArray(visibility)) {
                    // Expected format is
                    // ["someMethodName", { param1: "abc", param2: "def" }]
                    // The second element of the array is optional, used to pass extra
                    // info to "someMethodName"
                    var methodName = visibility[0];
                    var configObj = visibility[1]; //optional

                    _.merge(locals, configObj);

                    // The string 'false' will evaluate to the "real" false
                    // in $scope.$eval
                    visibility = rxVisibility.getMethod(methodName) || 'false';
                }

                // If `visibility` isn't defined, then default it to `true` (i.e. visible)
                var visible = _.isUndefined(visibility) ? true : $scope.$eval(visibility, locals),
                    hasRole = true;

                // Only do a roleCheck() if `visible` is true. If we failed the visibility test,
                // then we must ensure the nav item is not displayed, regardless of the roles
                if (visible && _.isObject(roles)) {
                    hasRole = roleCheck(roles);
                }

                return visible && hasRole;
            };

            $scope.toggleNav = function (ev, href) {
                // if no href present, simply toggle active state
                if (_.isEmpty(href)) {
                    ev.preventDefault();
                    $scope.item.active = !$scope.item.active;
                }
                // otherwise, let the default nav do it's thing
            };
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAppSearch
 * @restrict E
 * @scope
 * @description
 * Creates a search input form for navigation
 *
 * @param {string} [placeholder] Title of page
 * @param {*} [model] Model to tie input form to (via ng-model)
 * @param {function} [submit] Function to run on submit (model is passed as only argument to function)
 */
.directive('rxAppSearch', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxAppSearch.html',
        scope: {
            placeholder: '@?',
            model: '=?',
            submit: '=?',
            pattern: '@?'
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAccountUsers
 * @restrict E
 * @description
 * Provides the ability to switch between account users. This directive is specific to Rackspace
 */
.directive('rxAccountUsers', function ($location, $route, Encore, $rootScope, encoreRoutes) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxAccountUsers.html',
        link: function (scope, element) {
            scope.isCloudProduct = false;

            var checkCloud = function () {
                encoreRoutes.isActiveByKey('accountLvlTools').then(function (isAccounts) {
                    if (isAccounts) {
                        loadUsers();
                        encoreRoutes.isActiveByKey('cloud').then(function (isCloud) {
                            scope.isCloudProduct = isCloud;
                        });
                    } else {
                        scope.isCloudProduct = false;
                    }
                });
            };

            // We use $route.current.params instead of $routeParams because
            // the former is always available, while $routeParams only gets populated
            // after the route has successfully resolved. See the Angular docs on $routeParams
            // for more details.
            var loadUsers = function () {
                var success = function (account) {

                    // Sort the list so admins are at the top of the array
                    account.users = _.sortBy(account.users, 'admin');

                    scope.users = account.users;

                    scope.currentUser = $route.current.params.user;

                    if (!scope.currentUser) {
                        // We're not in Cloud, but instead in Billing, or Events, or
                        // one of the other Accounts menu items that doesn't use a username as
                        // part of the route params.
                        // But we need the URLs for the Cloud items to be valid, so grab a
                        // default username for this account, and rebuild the Cloud URLs with
                        // it

                        encoreRoutes.rebuildUrls({ user: account.users[0].username });
                    }
                };

                var accountNumber = parseInt($route.current.params.accountNumber, 10);
                if (accountNumber) {
                    Encore.getAccountUsers({ id: accountNumber }, success);
                }
            };

            checkCloud();

            scope.switchUser = function (user) {
                // TODO: Replace with updateParams in Angular 1.3
                //$route.updateParams({ user: user });

                // Update the :user route param
                var params = $route.current.originalPath.split('/');
                var userIndex = _.indexOf(params, ':user');

                if (userIndex !== -1) {
                    var path = $location.url().split('/');
                    path[userIndex] = user;
                    $location.url(path.join('/'));
                }
            };

            var unregisterCheckCloud = $rootScope.$on('$routeChangeSuccess', checkCloud);

            // We need to register a function to cleanup the watcher, this avoids multiple calls
            //Ecore.getAccountUsers every time we load a page in cloud.
            element.on('$destroy', function () {
                unregisterCheckCloud();
            });
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAtlasSearch
 * @restrict E
 * @description
 * Used to search accounts for Cloud Atlas
 */
.directive('rxAtlasSearch', function ($window) {
    return {
        template: '<rx-app-search placeholder="Search by username..." submit="searchAccounts"></rx-app-search>',
        restrict: 'E',
        link: function (scope) {
            scope.searchAccounts = function (searchValue) {
                if (!_.isEmpty(searchValue)) {
                    $window.location = '/cloud/' + searchValue + '/servers/';
                }
            };
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxAccountSearch
 * @restrict E
 * @description [TBD]
 */
.directive('rxAccountSearch', function ($window) {
    return {
        templateUrl: 'templates/rxAccountSearch.html',
        restrict: 'E',
        link: function (scope) {
            scope.fetchAccount = function (searchValue) {
                if (!_.isEmpty(searchValue)) {
                    $window.location = '/search?term=' + searchValue;
                }
            };
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxBillingSearch
 * @restrict E
 * @description [TBD]
 */
.directive('rxBillingSearch', function ($location, $window, encoreRoutes) {
    return {
        templateUrl: 'templates/rxBillingSearch.html',
        restrict: 'E',
        link: function (scope) {
            scope.searchType = 'bsl';
            scope.$watch('searchType', function () {
                scope.placeholder = scope.searchType === 'bsl' ? 'Transaction or Auth ID' : 'Account or Contact Info';
            });
            scope.fetchAccounts = function (searchValue) {
                if (!_.isEmpty(searchValue)) {
                    // Assuming we are already in /billing, we should use $location to prevent a page refresh
                    encoreRoutes.isActiveByKey('billing').then(function (isBilling) {
                        if (isBilling) {
                            $location.url('/search?q=' + searchValue + '&type=' + scope.searchType);
                        } else {
                            $window.location = '/billing/search?q=' + searchValue + '&type=' + scope.searchType;
                        }
                    });
                }
            };
        }
    };
})
/**
 * @ngdoc directive
 * @name rxApp.directive:rxTicketSearch
 * @restrict E
 * @description
 * Used to search tickets for Ticket Queues
 */
.directive('rxTicketSearch', function () {
    return {
        template: '<rx-app-search placeholder="Search for a Ticket..." submit="searchTickets"></rx-app-search>',
        restrict: 'E',
        link: function (scope) {
            // TQTicketSelection.loadTicket.bind(TQTicketSelection)
            scope.searchTickets = function () {
                // TODO do something here
            };
        }
    };
})
/**
 * @ngdoc service
 * @name rxApp.service:rxVisibility
 * @description
 * Provides an interface for adding new `visibility` methods for nav menus.
 * Methods added via `addMethod` should have a `function (scope, args)` interface
 * When you do `visibility: [ "someMethodName", { foo: 1, bar: 2} ]` in
 * a nav menu definition, the (optional) object will be passed to your method as the
 * second argument `args`, i.e. function (scope, args) {}
 */
.factory('rxVisibility', function () {
    var methods = {};

    var addMethod = function (methodName, method) {
        methods[methodName] = method;
    };

    var getMethod = function (methodName) {
        return methods[methodName];
    };

    var hasMethod = function (methodName) {
        return _.has(methods, methodName);
    };

    /* This is a convenience wrapper around `addMethod`, for
     * objects that define both `name` and `method` properties
     */
    var addVisibilityObj = function (obj) {
        addMethod(obj.name, obj.method);
    };

    return {
        addMethod: addMethod,
        getMethod: getMethod,
        hasMethod: hasMethod,
        addVisibilityObj: addVisibilityObj

    };
})
/**
 * @ngdoc service
 * @name rxApp.service:rxVisibilityPathParams
 * @description
 * Returns an object with `name` and `method` params that can
 * be passed to `rxVisibility.addMethod()`. We use register this by
 * default, as it's used by the nav menu we keep in routesCdnPath.
 * The method is used to check if {param: 'someParamName'} is present
 * in the current route
 * Use it as `visibility: [ 'rxPathParams', { param: 'userName' } ]`
 */
.factory('rxVisibilityPathParams', function ($routeParams) {
    var pathParams = {
        name:'rxPathParams',
        method: function (scope, args) {
            return !_.isUndefined($routeParams[args.param]);
        }
    };

    return pathParams;
})
/**
 * @ngdoc service
 * @name rxApp.service:rxHideIfUkAccount
 * @description
 * Check if account number in URL is of the UK origin
 *
 * @return {Boolean} false if account number matches UK pattern
 * Use it as `visibility: [ 'rxHideIfUkAccount' ]`
 */
.factory('rxHideIfUkAccount', function ($routeParams) {
    var isUkAccount = {
        name: 'rxHideIfUkAccount',
        method: function () {
            return $routeParams.accountNumber < 10000000;
        }
    };

    return isUkAccount;
})
/**
 * @ngdoc service
 * @name rxApp.service:rxStatusTags
 * @description
 * This provider is primarily used for applications to specify custom status
 * tags, for use with the `status` attributes of `rx-page` and of breadcrumb
 * objects.
 *
 * It also contains getTag and hasTag run time (vs. config time) methods, but
 * these should rarely, if ever, be needed outside of the framework.
 */
.provider('rxStatusTags', function () {
    var allTags = {
        alpha: {
            class: 'alpha-status',
            text: 'Alpha'
        },
        beta: {
            class: 'beta-status',
            text: 'Beta'
        },
    };
    // Takes an object with `key`, `text` and `class` attributes,
    // and adds it to to the existing set of status values
    this.addStatus = function (config) {
        allTags[config.key] = {
            text: config.text,
            'class': config['class']
        };
    };

    this.$get = function () {
        return {
            // Given a status tag key, return the `text` and `class` specified
            // for the tag
            getTag: function (key) {
                if (_.has(allTags, key)) {
                    return allTags[key];
                }
                return { class: '', text: '' };
            },

            hasTag: function (key) {
                return _.has(allTags, key);
            }
        };
    };
})
/**
* @ngdoc directive
* @name rxApp.directive:rxStatusTag
* @restrict E
* @scope
* @description
* This is used to draw the Alpha/Beta/etc tags in page titles and in breadcrumbs. It's not
* intended as a public directive.
*/
.directive('rxStatusTag', function (rxStatusTags) {
    return {
        template: '<span ng-if="status && validKey" class="status-tag {{ class }}">{{ text }}</span>',
        restrict: 'E',
        scope: {
            status: '@'
        },
        link: function (scope) {
            scope.validKey = rxStatusTags.hasTag(scope.status);
            if (scope.validKey) {
                var config = rxStatusTags.getTag(scope.status);
                scope.class = config.class;
                scope.text = config.text;
            }
        }
    };
});
