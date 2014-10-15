angular.module('demoApp')
.value('components', [
    {
        "name": "configs",
        "moduleName": "'encore.ui.configs'",
        "displayName": "Configs",
        "srcFiles": [
            "src/configs/configs.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Common configs used throughout Encore.</p>\n\n<p>Unit tests for this only need to check for the existence of the config data, just to confirm that they're being loaded correctly. Anything more is just overkill.</p>",
            "js": "",
            "html": ""
        }
    },
    {
        "name": "hotkeys",
        "moduleName": "'encore.ui.hotkeys'",
        "displayName": "Hotkeys",
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>This component is simply a reference guide to using <a href=\"http://chieffancypants.github.io/angular-hotkeys/\">the angular-hotkeys plugin</a> from within Encore-UI.</p>\n\n<p>Angular-hotkeys was chosen as the solution for hotkeys from within Encore-UI apps, due to its integration into Angular, it's use of the very good 'mousetrap' library, and because it allows multiple ways to define hotkeys (through a directive, controller, route config, etc).</p>\n\n<h2>Global Shortcuts</h2>\n\n<p>Currently there is only one global shortcut key defined (<code>h</code>). This will collapse/expand the main menu on any page. More keys can be added as need for them is identified (suggestions welcome!).</p>\n\n<h2>Shortcut Keys</h2>\n\n<p>Because browsers and operating systems have a long list of defined shortcut keys, it can be difficult to find a keybinding that isn't already taken. When choosing a shortcut key for your app, you can avoid most conflicts by simple leaving off the modifier key (e.g. <code>ctrl</code>).</p>\n\n<p>For Encore, the best practice is to use a single letter for your keystroke. For example, the global key to show/hide the rxApp menu is simply <code>h</code>.</p>\n\n<p>If you'll be defining multiple shortcuts related to a specific set of actions, consider a combination of two letters, where the first letter is the same for all keystrokes. For example, an account menu might have the following shortcuts:</p>\n\n<ul>\n<li><code>a</code> <code>n</code> Creates a new account</li>\n<li><code>a</code> <code>v</code> Views the selected account</li>\n<li><code>a</code> <code>d</code> Deletes the selected account</li>\n</ul>\n\n<h2>Identifying shortcut keys</h2>\n\n<p>If you provide a description, the shortcut will be defined in a helper list provided when the user presses the <code>?</code> key. Currently there is no official guidance on a design pattern to identify to end-users what particular shortcuts are outside of the standard help window.</p>",
            "js": "/*jshint unused:false*/\nfunction hotkeysCtrl ($scope, hotkeys) {\n    $scope.volume = 5;\n\n    hotkeys.add({\n        combo: 'ctrl+up',\n        description: 'Turn up the volume!',\n        callback: function () {\n            $scope.volume += 1;\n        }\n    });\n\n    hotkeys.add({\n        combo: 'ctrl+down',\n        description: 'Turn it down!',\n        callback: function () {\n            $scope.volume -= 1;\n        }\n    });\n\n    var showHFSHE = function () {\n        var videoSrc = '//www.youtube.com/embed/Dach1nPbsY8?autoplay=1';\n\n        var iframe = document.createElement('iframe');\n        iframe.src = videoSrc;\n\n        var container = document.getElementById('hfshe');\n        container.appendChild(iframe);\n        container.style.display = 'block';\n    };\n\n    hotkeys.add({\n        combo: 'up+up+down+down+left+right+left+right+a+b',\n        callback: showHFSHE\n    });\n}",
            "html": "<style type=\"text/css\">\n    #hfshe {\n        display: none;\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background: rgba(0, 0, 0, 0.9);\n    }\n    #hfshe iframe {\n        width: 560px;\n        height: 315px;\n        border: 0;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-top: -158px;\n        margin-left: -280px;\n    }\n</style>\n\n<div ng-controller=\"hotkeysCtrl\">\n    <p>Press `?` to see the shortcut cheat-sheet.</p>\n\n    <p>Current Volume: <span ng-bind=\"volume\"></span></p>\n\n    <div id=\"hfshe\"></div>\n</div>"
        }
    },
    {
        "name": "rxAccountInfo",
        "moduleName": "'encore.ui.rxAccountInfo'",
        "displayName": "Rx Account Info",
        "srcFiles": [
            "src/rxAccountInfo/rxAccountInfo.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxAccountInfo/templates/rxAccountInfo.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/experimental.svg\" alt=\"experimental\" title=\"\" /></a></p>\n\n<p>Functionality for populating an <code>rxInfoPanel</code> with a user's account details.</p>\n\n<p>This component is very specific to internal Rackspace needs, but also lives as a demonstration on how to make\nuse of the <code>rxInfoBox</code>.</p>\n\n<p>This directive requires that <code>SupportAccount</code> and <code>Encore</code> services are available. These are not provided by this project,\nbut are available in an internal Rackspace repository.</p>",
            "js": "// Note that these two factories are only present for the purposes of this demo. In a real application,\n// both SupportAccount and Encore will have to be provided from elsewhere, outside of encore-ui\n\nangular.module('encore.ui.rxAccountInfo')\n.value('Badges',\n    [\n        {\n            url: 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png',\n            description: 'CC'\n        }, {\n            url: 'http://mirrors.creativecommons.org/presskit/icons/by.large.png',\n            description: 'BY'\n        }, {\n            url: 'http://mirrors.creativecommons.org/presskit/icons/nc.large.png',\n            description: 'NC',\n        }, {\n            url: 'http://mirrors.creativecommons.org/presskit/icons/zero.large.png',\n            description: 'ZERO',\n        }\n    ]\n)\n.factory('SupportAccount', function ($q, Badges) {\n    return {\n        getBadges: function (config, success, failure) {\n            var deferred = $q.defer();\n\n            if (config.accountNumber === '6789') {\n                deferred.reject();\n            } else {\n                deferred.resolve(Badges);\n            }\n\n            deferred.promise.then(success, failure);\n\n            return deferred.promise;\n        }\n    };\n})\n.factory('Encore', function ($q) {\n    return {\n        getAccount: function (config, success, failure) {\n            var deferred = $q.defer();\n\n            if (config.id === '9876') {\n                deferred.reject();\n            } else {\n                deferred.resolve({ name: 'Mosso' });\n            }\n\n            deferred.promise.then(success, failure);\n\n            return deferred.promise;\n        }\n    };\n});\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n\n<h3>Working Account Info</h3>\n<div class=\"demo-working-account\">\n    <rx-account-info account-number=\"12345\"></rx-account-info>\n</div>\n\n<hr />\n\n<div>\n    <h3>Can't Load Badges</h3>\n    <rx-notifications stack=\"badgeError\"></rx-notifications>\n    <div class=\"demo-badge-error\">\n        <rx-account-info account-number=\"6789\" notify-stack=\"badgeError\"></rx-account-info>\n    </div>\n</div>\n\n<hr />\n\n<div>\n    <h3>Can't Load Account Name</h3>\n    <rx-notifications stack=\"nameError\"></rx-notifications>\n    <div class=\"demo-name-error\">\n        <rx-account-info account-number=\"9876\" notify-stack=\"nameError\"></rx-account-info>\n    </div>\n</div>\n"
        }
    },
    {
        "name": "rxActionMenu",
        "moduleName": "'encore.ui.rxActionMenu'",
        "displayName": "Rx Action Menu",
        "srcFiles": [
            "src/rxActionMenu/rxActionMenu.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxActionMenu/templates/rxActionMenu.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Directive to add a clickable cog which brings up a menu of configurable actions. </p>\n\n<p>Normally the menu is dismissable by clicking anywhere on the page, but this can be disabled by \npassing an optional <code>global-dismiss=\"false\"</code> attribute to the directive.</p>",
            "js": "/*jshint unused:false*/\nfunction rxActionMenuCtrl ($scope, rxNotify) {\n\n    $scope.add = function () {\n        rxNotify.add('Added!', {\n            type: 'success',\n            repeat: false,\n            timeout: 3\n        });\n    };\n\n    $scope.remove = function () {\n        rxNotify.add('Deleted!', {\n            type: 'error',\n            repeat: false,\n            timeout: 3\n        });\n    };\n\n}\n",
            "html": "<div>\n    <p>The cog in the first row is dismissable by clicking anywhere, but the second cog can only be dismissed\n    by clicking on the cog itself.\n    </p>\n\n    <h3 class=\"title\">Typical Usage</h3>\n    <table>\n        <thead>\n            <tr>\n                <th>\n                    Name\n                </th>\n                <th>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Globally dismissible</td>\n                <td>\n                    <rx-action-menu id=\"globalDismissal\">\n                        <ul class=\"actions-area\">\n                            <li>\n                                <rx-modal-action\n                                    template-url=\"addActionTemplate.html\"\n                                    classes=\"msg-action\">\n                                    <i class=\"fa fa-plus fa-lg\"></i> Add\n                                </rx-modal-action>\n                            </li>\n                            <li>\n                                <rx-modal-action\n                                    template-url=\"deleteActionTemplate.html\"\n                                    classes=\"msg-warn\">\n                                    <i class=\"fa fa-times fa-lg\"></i> Delete\n                                </rx-modal-action>\n                            </li>\n                        </ul>\n                    </rx-action-menu>\n                </td>\n            </tr>\n            <tr>\n                <td>Only dismissible by clicking on cog</td>\n                <td>\n                    <rx-action-menu global-dismiss=\"false\">\n                        <ul class=\"actions-area\">\n                            <li>\n                                <rx-modal-action\n                                    template-url=\"addActionTemplate.html\"\n                                    classes=\"msg-action\">\n                                    <i class=\"fa fa-plus fa-lg\"></i> Add\n                                </rx-modal-action>\n                            </li>\n                            <li>\n                                <rx-modal-action\n                                    template-url=\"deleteActionTemplate.html\"\n                                    classes=\"msg-warn\">\n                                    <i class=\"fa fa-times fa-lg\"></i> Delete\n                                </rx-modal-action>\n                            </li>\n                        </ul>\n                    </rx-action-menu>\n                </td>\n            </tr>\n                <td>Unorthodox Behaviors (no modals)</td>\n                <td ng-controller=\"rxActionMenuCtrl\">\n                    <rx-action-menu id=\"custom\">\n                        <ul class=\"actions-area\">\n                            <li>\n                              <button class=\"btn-link trigger\" ng-click=\"add()\">\n                                  <span class=\"msg-action\"><i class=\"fa fa-plus fa-lg\"></i> Add</span>\n                              </button>\n                            </li>\n                            <li>\n                              <button class=\"btn-link trigger\" ng-click=\"remove()\">\n                                  <span class=\"msg-warn\"><i class=\"fa fa-times fa-lg\"></i> Delete</span>\n                              </button>\n                            </li>\n                        </ul>\n                    </rx-action-menu>\n                </td>\n        </tbody>\n    </table>\n\n    <script type=\"text/ng-template\" id=\"deleteActionTemplate.html\">\n        <rx-modal-form title=\"Delete Action\" submit-text=\"Delete\">\n            <span>Do you want to delete something?</span>\n        </rx-modal-form>\n    </script>\n    <script type=\"text/ng-template\" id=\"addActionTemplate.html\">\n        <rx-modal-form title=\"Add Action\" submit-text=\"Add\">\n            <span>Do you want to add something?</span>\n        </rx-modal-form>\n    </script>\n</div>\n"
        }
    },
    {
        "name": "rxActiveUrl",
        "moduleName": "'encore.ui.rxActiveUrl'",
        "displayName": "Rx Active Url",
        "srcFiles": [
            "src/rxActiveUrl/rxActiveUrl.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxActiveUrl/templates/rxActiveUrl.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/hughsk/stability-badges\"><img src=\"http://hughsk.github.io/stability-badges/dist/deprecated.svg\" alt=\"deprecated\" title=\"\" /></a></p>\n\n<p>Adds a class name of 'selected' to an LI if the current url matches a pre-defined value</p>\n\n<p><strong>THIS COMPONENT IS MARKED TO BE REMOVED IN A FUTURE RELEASE.</strong></p>",
            "js": "",
            "html": "<ul>\n    <rx-active-url url=\"/servers\">\n        <a href=\"/servers\">Servers</a>\n    </rx-active-url>\n    <rx-active-url url=\"/cbs\">\n        <a href=\"/cbs\">Storage</a>\n        <ul>\n            <rx-active-url url=\"/cbs/volumes\">\n                <a href=\"/cbs/volumes/\">Volumes</a>\n            </rx-active-url>\n            <rx-active-url url=\"/cbs/snapshots\">\n                <a href=\"/cbs/snapshots/\">Snapshots</a>\n            </rx-active-url>\n        </ul>\n    </rx-active-url>\n</ul>"
        }
    },
    {
        "name": "rxAge",
        "moduleName": "'encore.ui.rxAge'",
        "displayName": "Rx Age",
        "srcFiles": [
            "src/rxAge/rxAge.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Filter to parse an age based on a date in the past.</p>\n\n<p><strong>Note: This component requires <a href=\"http://momentjs.com/\">moment.js</a> be loaded.</strong></p>\n\n<p>This function has several different ways you can use it:</p>\n\n<ol>\n<li>You can just have it use the default abbreviated method and it truncates it\nto the two largest units.</li>\n<li>You can also pass in a second value of <code>true</code> and have it expand the units\nfrom the first letter to their full word representation.</li>\n<li>Or you can pass in a number from <code>1</code> to <code>3</code> as the second value to allow for\ndifferent amounts of units.</li>\n<li><strong>OR</strong> you can pass in a number as the second argument and <code>true</code> as the\nthird argument to combine these two effects.</li>\n</ol>",
            "js": "/*jshint unused:false*/\n\n// This file is used to help build the 'demo' documentation page and should be updated with example code\nfunction rxAgeCtrl ($scope) {\n    var day = 1000 * 60 * 60 * 24;\n    $scope.ageHours = new Date((Date.now() - (day / 2.3))).toString();\n    $scope.ageDays = new Date((Date.now() - (day * 1.5))).toString();\n    $scope.ageMonths = new Date((Date.now() - (day * 40.2))).toString();\n    $scope.ageYears = new Date((Date.now() - (day * 380.1))).toString();\n}\n",
            "html": "<div ng-controller=\"rxAgeCtrl\">\n    <ul>\n        <li>{{ageHours}} &rarr; {{ageHours | rxAge}}</li>\n        <li>{{ageDays}} &rarr; {{ageDays | rxAge}}</li>\n        <li>{{ageMonths}} &rarr; {{ageMonths | rxAge}}</li>\n        <li>{{ageYears}} &rarr; {{ageYears | rxAge}}</li>\n        <li>{{ageHours}} &rarr; {{ageHours | rxAge:true}}</li>\n        <li>{{ageDays}} &rarr; {{ageDays | rxAge:true}}</li>\n        <li>{{ageMonths}} &rarr; {{ageMonths | rxAge:true}}</li>\n        <li>{{ageYears}} &rarr; {{ageYears | rxAge:true}}</li>\n        <li>{{ageHours}} &rarr; {{ageHours | rxAge:1:true}}</li>\n        <li>{{ageDays}} &rarr; {{ageDays | rxAge:2:true}}</li>\n        <li>{{ageMonths}} &rarr; {{ageMonths | rxAge:3:true}}</li>\n        <li>{{ageYears}} &rarr; {{ageYears | rxAge:3}}</li>\n    </ul>\n</div>\n"
        }
    },
    {
        "name": "rxApp",
        "moduleName": "'encore.ui.rxApp'",
        "displayName": "Rx App",
        "srcFiles": [
            "src/rxApp/rxApp.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxApp/templates/rxAccountSearch.html",
            "templates/rxApp/templates/rxApp.html",
            "templates/rxApp/templates/rxAppNav.html",
            "templates/rxApp/templates/rxAppNavItem.html",
            "templates/rxApp/templates/rxAppSearch.html",
            "templates/rxApp/templates/rxPage.html"
        ],
        "dependencies": [
            "rxAppRoutes",
            "rxEnvironment"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<h1>Description</h1>\n\n<p>This component is responsible for creating the HTML necessary for a common Encore layout. It builds out the main navigation, plus breadcrumbs and page titles.</p>\n\n<h1>Usage</h1>\n\n<p>For apps that want to use the default Encore navigation, usage is pretty simple. In your index.html file, add the <code>rx-app</code> directive inside your app:</p>\n\n<pre><code>&lt;body ng-app=\"myApp\"&gt;\n    &lt;rx-app&gt;\n        &lt;ng-view&gt;&lt;/ng-view&gt;\n    &lt;/rx-app&gt;\n&lt;/body&gt;\n</code></pre>\n\n<p>By including <code>ng-view</code>, your view content will be added inside the directive. This makes setting up views for each page much simpler, since you don't have to include <code>rx-app</code> in each view.</p>\n\n<p>Inside your view, you'll likely want to use <code>rx-page</code> to wrap your content. See the <code>rx-page</code> docs for more information on this.</p>\n\n<h1>rxApp Navigation</h1>\n\n<p>Left-hand navigation is included as part of the app template. There are many options to control the navigation from an app level, as outlined with the following.</p>\n\n<p>Note: With the current set up, some app-specific menu items are defined in Encore-UI. While it's preferred to keep app-specific details outside of Encore-UI, because some top-level navigation is accessible from any app, it's important to store that information in a common location inside Encore-UI.</p>\n\n<h2>Accessing route information</h2>\n\n<p>Sometimes it's helpful to have the current route information available for menu items. For example, re-using the current params for path building.</p>\n\n<p>To help with this, $route is exposed on the scope of all menu items. <a href=\"http://devdocs.io/angular/ngroute.$route\"><code>$route</code> provides many details on the current view</a>, including the ability to access the current controller and scope for the view.</p>\n\n<p>To see this in action, check out the 'childVisibility' property for Account-level Tool in <code>encoreNav</code>.</p>\n\n<h2>Accessing properties on $rootScope</h2>\n\n<p>If you have a property available on the <code>$rootScope</code> of your app that the menu data needs to access, <a href=\"http://stackoverflow.com/questions/22216441/what-is-the-difference-between-scope-root-and-rootscope-angular-js\">you can reference <code>$rootScope</code> via <code>$root</code></a>. See the demo for an example of this.</p>\n\n<h2>Dynamically updating the menu</h2>\n\n<p>By default, rxApp will create the navigation menu based on the routes defined in the 'encoreNav' value. This menu is built using the rxAppRoutes service.</p>\n\n<p>To update a route, use the <code>setRouteByKey</code> function on the rxAppRoutes service:</p>\n\n<pre><code>rxAppRoutes.setRouteByKey('myKey', {\n    linkText: 'myUpdatedRoute'\n})\n</code></pre>\n\n<p>You would normally either set this in your app's <code>.run</code> function, or in a specific controller.</p>\n\n<h2>Custom Menus</h2>\n\n<p>If you'd like to create an entirely custom menu, you can pass that data in to the <code>rx-app</code> directive via the <code>menu</code> attribute. View the demo for an example of this.</p>\n\n<h1>Sub-directives</h1>\n\n<h2>rx-page</h2>\n\n<p>You'll likely want to use <code>rx-page</code> inside your template view. For example, inside a 'myView.html' file:</p>\n\n<pre><code>&lt;rx-page title=\"'Example Page'\"&gt;\n    Here is my content\n&lt;/rx-page&gt;\n</code></pre>\n\n<p><code>rx-page</code> is used to create a common wrapper for specific page views. It automatically adds the breadcrumbs and page title/subtitle (if specified), along with the correct styling.</p>\n\n<p>Both the <code>title</code> and <code>subtitle</code> attributes accept an Angular expression, which can be a string (shown in the previous example) or a scope property. This string/property can accept other expressions, enabling you to build custom titles. The demo has an example of this usage.</p>\n\n<h3>.page-actions</h3>\n\n<p>A <code>page-actions</code> class is provided by rx-app to easily add custom page actions to the top right of a page. For example:</p>\n\n<pre><code>&lt;rx-page title=\"'Servers Overview'\"&gt;\n    &lt;div class=\"page-actions\"&gt;\n        &lt;a href=\"/create\" class=\"link-action msg-action\"&gt;Create New Server&lt;/a&gt;\n    &lt;/div&gt;\n    &lt;img src=\"http://cdn.memegenerator.net/instances/500x/48669250.jpg\" alt=\"Look at all these servers there are so many\"\n&lt;/rx-page&gt;\n</code></pre>\n\n<h2>rx-app-nav and rx-app-nav-item</h2>\n\n<p>These two directives are responsible for creating the menu in the left sidebar. They're not intended for use outside of the rx-app template code.</p>\n\n<h1>Common Styling</h1>\n\n<p>The rxApp common.less file defines many base CSS rules and classes for app use. Included in this is <a href=\"http://necolas.github.io/normalize.css/\">normalize.css</a>. This helps create a consistent starting point for styles across all browsers.</p>\n\n<p>As mentioned, several classes are included for utility use in common.less. The <a href=\"http://rackerlabs.github.io/encore-ui/styleguide/rxApp-common.html\">Encore-UI styleguide</a> is the best place to read documentation on these classes.</p>\n\n<h2>Fonts</h2>\n\n<p>The Encore-UI default font is Roboto. This is used for all text on the page and is loaded via Google Fonts. Be sure you app includes the following line:</p>\n\n<p><code>\n&lt;link href=\"https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,700,700italic\" rel=\"stylesheet\" type=\"text/css\" /&gt;\n</code></p>",
            "js": "/*jshint unused:false*/\nfunction rxAppCtrl ($scope, $location, $rootScope, $window, encoreRoutes, rxVisibility) {\n    $scope.subtitle = 'With a subtitle';\n\n    $scope.changeSubtitle = function () {\n        $scope.subtitle = 'With a new subtitle at ' + Date.now();\n    };\n\n    rxVisibility.addMethod(\n        'isUserDefined',\n        function (scope, locals) {\n            return !_.isEmpty($rootScope.user);\n        }\n    );\n\n    $scope.changeRoutes = function () {\n        var newRoute = {\n            linkText: 'Updated Route',\n            childVisibility: 'true',\n            children: [\n                {\n                    linkText: 'New child route'\n                }\n            ]\n        };\n\n        encoreRoutes.setRouteByKey('accountLvlTools', newRoute);\n    };\n\n    // Fake navigation\n    var customApp = document.getElementById('custom-rxApp');\n    customApp.addEventListener('click', function (ev) {\n        var target = ev.target;\n\n        if (target.className.indexOf('item-link') > -1) {\n            // prevent the default jump to top\n            ev.preventDefault();\n\n            var href = target.getAttribute('href');\n\n            // update angular location (if href has a value)\n            if (!_.isEmpty(href)) {\n                // we need to prevent the window from scrolling (the demo does this)\n                // so we get the current scrollTop position\n                // and set it after the demo page has run '$routeChangeSuccess'\n                var currentScollTop = document.body.scrollTop;\n\n                $location.hash(href);\n\n                $rootScope.$apply();\n\n                $window.scrollTo(0, currentScollTop);\n            }\n        }\n    });\n\n    var searchDirective = 'rx-app-search placeholder=\"Enter User\" model=\"$root.user\" pattern=\"/^([0-9a-zA-Z._ -]{2,})$/\"';\n\n    $scope.customMenu = [{\n        title: 'Example Menu',\n        children: [\n            {\n                href: 'Lvl1-1',\n                linkText: '1st Order Item'\n            },\n            {\n                linkText: '1st Order Item (w/o href) w/ Children',\n                childVisibility: [ 'isUserDefined' ],\n                childHeader: '<strong class=\"current-search\">Current User:</strong>' +\n                             '<span class=\"current-result\">{{$root.user}}</span>',\n                directive: searchDirective,\n                children: [\n                    {\n                        href: 'Lvl1-2-Lvl2-1',\n                        linkText: '2nd Order Item w/ Children',\n                        children: [{\n                            href: 'Lvl1-2-Lvl2-1-Lvl3-1',\n                            linkText: '3rd Order Item'\n                        }]\n                    },\n                    {\n                        href: 'Lvl1-2-Lvl2-2',\n                        linkText: '2nd Order Item w/ Children',\n                        children: [\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-1',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-2',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-3',\n                                linkText: '3rd Order Item'\n                            },\n                            {\n                                href: 'Lvl1-2-Lvl2-2-Lvl3-4',\n                                linkText: '3rd Order Item'\n                            }\n                        ]\n                    },\n                    {\n                        href: 'Lvl1-2-Lvl2-3',\n                        linkText: '2nd Order Item'\n                    }\n                ]\n            },\n            {\n                href: 'Lvl1-3',\n                linkText: '1st Order Item w/ Children',\n                children: [\n                    {\n                        href: 'Lvl1-3-Lvl2-1',\n                        linkText: '2nd Order Item'\n                    }\n                ]\n            }\n        ]\n    }];\n}\n",
            "html": "<div ng-controller=\"rxAppCtrl\">\n    <h1 class=\"title\">Standard rxApp</h1>\n    <rx-app id=\"standard-rxApp\">\n        <rx-page title=\"'Standard Page Title'\">\n            <p class=\"clear\">This is my page content</p>\n            <button ng-click=\"changeRoutes()\" class=\"button\">Change Routes</button>\n        </rx-page>\n    </rx-app>\n\n    <h1 class=\"title\">Customized rxApp (collapsible)</h1>\n    <rx-app collapsible-nav=\"true\" site-title=\"My App\" id=\"custom-rxApp\" menu=\"customMenu\" new-instance=\"true\" hide-feedback=\"true\">\n        <rx-page title=\"'Customized Page Title'\" subtitle=\"subtitle\">\n            <p class=\"clear\">Click a link in the menu to see the active state change</p>\n            <p>Click the toggle to hide the menu</p>\n            <button ng-click=\"changeSubtitle()\" class=\"changeSubtitle button\">Change Subtitle</button>\n        </rx-page>\n    </rx-app>\n</div>\n\n<!--\nYou'll likely want to implement your HTML in your index.html file as:\n<div ng-app=\"sampleApp\">\n    <rx-app ng-view></rx-app>\n</div>\n\nAnd the template for each view/page will be something like:\n<rx-page title=\"'Example Page'\">\n    Example content\n</rx-page>\n-->\n"
        }
    },
    {
        "name": "rxAppRoutes",
        "moduleName": "'encore.ui.rxAppRoutes'",
        "displayName": "Rx App Routes",
        "srcFiles": [
            "src/rxAppRoutes/rxAppRoutes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxEnvironment"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Service to manage app routes and states of routes</p>",
            "js": "",
            "html": ""
        }
    },
    {
        "name": "rxAttributes",
        "moduleName": "'encore.ui.rxAttributes'",
        "displayName": "Rx Attributes",
        "srcFiles": [
            "src/rxAttributes/rxAttributes.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>This component allows you to add attributes based on a value in scope being defined or not.</p>\n\n<h2>Example</h2>\n\n<pre><code>&lt;div rx-attributes=\"{'my-custom-attr': customAttrVal, 'ng-click': noFunc}\" ng-controller=\"myCtrl\"&gt;&lt;/div&gt;\n\n&lt;script&gt;\nfunction myCtrl (scope) {\n    scope.customAttrVal = 'some value';\n}\n&lt;/script&gt;\n</code></pre>\n\n<p>Given this code, if the scope only had <code>scope.customAttrVal</code> set, only <code>my-custom-attr</code> would be added to the component. Since noFunc was never defined, <code>ng-click</code> isn't added.</p>\n\n<p>The output of the above code is:</p>\n\n<pre><code>&lt;div my-custom-attr=\"some value\" ng-controller=\"myCtrl\"&gt;&lt;/div&gt;\n</code></pre>\n\n<h2>Value Format</h2>\n\n<p>The value of <code>rx-attributes</code> follows the same object convention as <code>ng-class</code>, in that it takes in an object to parse through. The object follows this pattern:</p>\n\n<pre><code>{\n    'attribute-name': scopeValue,\n    'another-attribute-name': anotherScopeValue,\n}\n</code></pre>",
            "js": "/*jshint unused:false*/\nfunction rxAttributesCtrl ($scope) {\n    $scope.customStyles = 'color: red; font-weight: bold;';\n    $scope.customContent = '\"Custom Content\"';\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxAttributesCtrl\">\n    <p><strong>The following content gets replaced by the value of ng-bind. It also gets some styles applied to it:</strong></p>\n    <p rx-attributes=\"{'ng-bind': customContent, 'style': customStyles}\">Content that's replaced</p>\n\n    <p><strong>The following content doesn't get replaced, since 'nothing' isn't a property on the scope:</strong></p>\n    <p rx-attributes=\"{'ng-bind': nothing}\">Non-replaced content</p>\n\n    <p><strong>The following content (you can't see it) does get replaced, but by nothing, since 'nothing' isn't a property on the scope. This is what rx-attributes avoids</strong></p>\n    <p ng-bind=\"nothing\">Content that's unintentionally replaced</p>\n</div>"
        }
    },
    {
        "name": "rxAuth",
        "moduleName": "'encore.ui.rxAuth'",
        "displayName": "Rx Auth",
        "srcFiles": [
            "src/rxAuth/rxAuth.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxIdentity",
            "rxSession",
            "rxLocalStorage",
            "rxPermission",
            "rxSession",
            "rxLocalStorage"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Auth service which provides a common mechanism authenticating, validating permissions and managing sessions.</p>",
            "js": "function rxAuthCtrl ($scope, Auth) {\n    $scope.hasRole = function () {\n        alert('Has \"superhero\" Role? : ' + Auth.hasRole('superhero'));\n    };\n\n    $scope.isAuthenticated = function () {\n        alert('Is Authenticated? : ' + Auth.isAuthenticated());\n    };\n}\n",
            "html": "<div ng-controller=\"rxAuthCtrl\">\n    <button ng-click=\"hasRole()\" class=\"button\">Is a Superhero?</button>\n    <button ng-click=\"isAuthenticated()\" class=\"button\">Is Authenticated?</button>\n</div>\n"
        }
    },
    {
        "name": "rxBreadcrumbs",
        "moduleName": "'encore.ui.rxBreadcrumbs'",
        "displayName": "Rx Breadcrumbs",
        "srcFiles": [
            "src/rxBreadcrumbs/rxBreadcrumbs.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxBreadcrumbs/templates/rxBreadcrumbs.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Service/Directive to add/update breadcrumbs on a page</p>\n\n<p>By default, the first breadcrumb will always have an URL of <code>'/'</code> and a name of <code>'Home'</code>. This can be changed\nwith the <code>rxBreadcrumbsSvc.setHome()</code> method. It takes the new path as the first argument, and an optional name as the second argument. If you don't pass the second argument, it will reuse whatever name is already there (i.e. <code>'Home'</code>)</p>",
            "js": "/*jshint unused:false*/\nfunction rxBreadcrumbsCtrl ($scope, rxBreadcrumbsSvc) {\n    rxBreadcrumbsSvc.set([{\n        path: '/',\n        name: 'Components'\n    }, {\n        name: 'All Components'\n    }]);\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxBreadcrumbsCtrl\">\n    <nav class=\"site-breadcrumbs\">\n        <rx-breadcrumbs></rx-breadcrumbs>\n    </nav>\n</div>"
        }
    },
    {
        "name": "rxButton",
        "moduleName": "'encore.ui.rxButton'",
        "displayName": "Rx Button",
        "srcFiles": [
            "src/rxButton/rxButton.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxButton/templates/rxButton.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Provides styling for various types of buttons. See styleguide for examples.</p>\n\n<h2>rxButton directive</h2>\n\n<p>This directive is used to allow dynamic showing/hiding of a spinner/loading indicator.</p>",
            "js": "/*jshint unused:false*/\nfunction rxButtonCtrl ($scope, $timeout) {\n    $scope.status = {\n        loading: false,\n        disable: true\n    };\n\n    $scope.login = function () {\n        $scope.status.loading = true;\n\n        $timeout(function () {\n            $scope.status.loading = false;\n        }, 4000);\n    };\n}\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<h3 class=\"title\">Typical Usage</h3>\n<div ng-controller=\"rxButtonCtrl\">\n    <rx-button toggle-msg=\"Authenticating\" default-msg=\"Login\"\n        toggle=\"status.loading\" ng-click=\"login()\">\n    </rx-button>\n</div>\n\n<h3 class=\"title\">Using the <code>disable</code> attribute<h3>\n<p>\nNormally the <code>ng-disabled</code> property of an <code>rxButton</code> is controlled by <code>toggle</code>. You can use the optional <code>disable</code> attribute to pass an expression that <code>rxButton</code> should use for <code>ng-disabled</code>\n</p>\n<div ng-controller=\"rxButtonCtrl\">\n    <rx-button default-msg=\"Toggle enabled/disabled of 'Login'\"\n        rx-toggle=\"status.disable\">\n    </rx-button>\n    <rx-button toggle-msg=\"Authenticating\" default-msg=\"Login\"\n        toggle=\"status.loading\" disable=\"status.disable\" ng-click=\"login()\">\n    </rx-button>\n</div>\n"
        }
    },
    {
        "name": "rxCapitalize",
        "moduleName": "'encore.ui.rxCapitalize'",
        "displayName": "Rx Capitalize",
        "srcFiles": [
            "src/rxCapitalize/rxCapitalize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Capitalizes the first word in a string.</p>",
            "js": "/*jshint unused:false*/\n\nfunction rxCapitalizeCtrl ($scope) {\n    $scope.hello = 'hello world. this is my text';\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxCapitalizeCtrl\">\n    {{hello | rxCapitalize}}\n</div>"
        }
    },
    {
        "name": "rxCompile",
        "moduleName": "'encore.ui.rxCompile'",
        "displayName": "Rx Compile",
        "srcFiles": [
            "src/rxCompile/rxCompile.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Allows compilation of expressions inside of other expressions.</p>",
            "js": "/*jshint unused:false*/\n\n// This file is used to help build the 'demo' documentation page and should be updated with example code\nfunction rxCompileCtrl ($scope) {\n    $scope.world = 'wrrrld';\n    $scope.myExpression = 'Hello {{world}}';\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxCompileCtrl\">\n    <input type=\"text\" ng-model=\"world\">\n    <div rx-compile=\"myExpression\"></div>\n    <div>{{myExpression}}</div>\n</div>"
        }
    },
    {
        "name": "rxDiskSize",
        "moduleName": "'encore.ui.rxDiskSize'",
        "displayName": "Rx Disk Size",
        "srcFiles": [
            "src/rxDiskSize/rxDiskSize.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Converts GB disk size into a more readable format (e.g. GBs, TBs)</p>",
            "js": "/*jshint unused:false*/\n\n// This file is used to help build the 'demo' documentation page and should be updated with example code\nfunction rxDiskSizeCtrl ($scope) {\n    $scope.sizeGB = 420;\n    $scope.sizeTB = 125000;\n    $scope.sizePB = 171337000;\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxDiskSizeCtrl\">\n    <ul>\n        <li>{{sizeGB}} &rarr; {{sizeGB | rxDiskSize}}</li>\n        <li>{{sizeTB}} &rarr; {{sizeTB | rxDiskSize}}</li>\n        <li>{{sizePB}} &rarr; {{sizePB | rxDiskSize}}</li>\n    </ul>\n    <ul>\n        <li>{{sizeGB}} GB &rarr; {{sizeGB | rxDiskSize:'GB'}}</li>\n        <li>{{sizeTB}} GB &rarr; {{sizeTB | rxDiskSize:'TB'}}</li>\n        <li>{{sizePB}} GB &rarr; {{sizePB | rxDiskSize:'PB'}}</li>\n    </ul>\n</div>\n"
        }
    },
    {
        "name": "rxEnvironment",
        "moduleName": "'encore.ui.rxEnvironment'",
        "displayName": "Rx Environment",
        "srcFiles": [
            "src/rxEnvironment/rxEnvironment.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Component built to detect and provide the current environment (e.g. dev, staging, prod)</p>",
            "js": "/*jshint unused:false*/\nfunction rxEnvironmentCtrl ($scope, Environment) {\n    $scope.Environment = Environment;\n}",
            "html": "<div ng-controller=\"rxEnvironmentCtrl\">\n    <p>Current Environment: {{Environment.get().name}}</p>\n\n    <p>Url built from Environment data: {{ { tld: 'cloudatlas', path: 'some/path' } | rxEnvironmentUrl }}</p>\n\n    <p>Content shows if on GitHub demo page:\n        <span rx-if-environment=\"ghPages\">\n            You're on the GitHub demo page\n        </span>\n    </p>\n\n    <p>Content shows if not on GitHub demo page:\n        <span rx-if-environment=\"!ghPages\">\n            You're not on the GitHub demo page\n        </span>\n    </p>\n</div>"
        }
    },
    {
        "name": "rxFavicon",
        "moduleName": "'encore.ui.rxFavicon'",
        "displayName": "Rx Favicon",
        "srcFiles": [
            "src/rxFavicon/rxFavicon.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxEnvironment"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Allows custom favicons between local, staging and production environments.</p>\n\n<h2>Usage</h2>\n\n<p>rxFavicon is an attribute based directive. It accepts an object with the following optional parameters defined:</p>\n\n<ul>\n<li><strong>staging</strong>: Path to favicon to use for staging environments (falls back to 'production' icon)</li>\n<li><strong>local</strong>: Path to favicon to use for staging environments (falls back to 'staging' icon)</li>\n</ul>\n\n<p>See the demo examples for code examples.</p>",
            "js": "/*jshint unused:false*/\nfunction rxFaviconCtrl ($scope, Environment) {\n    $scope.setEnvironment = function (environment) {\n        // TODO allow overriding the current environment to show how the favicon changes\n    };\n}",
            "html": "<div ng-controller=\"rxFaviconCtrl\">\n    <p>See favicon of this site for an example of this. On <a href=\"http://rackerlabs.github.io/encore-ui/\">the live site</a>, the favicon will be a dark blue book. On <a href=\"http://localhost:9001\">the local site</a>, it will be a light blue book.</p>\n\n    <link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" rx-favicon=\"{ staging: 'staging-favicon.png', local: 'local-favicon.png' }\" />\n    <link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" rx-favicon=\"{ local: 'local-favicon.png' }\" />\n    <link rel=\"icon\" type=\"image/png\" href=\"favicon.png\" rx-favicon=\"{ staging: 'staging-favicon.png' }\" />\n</div>"
        }
    },
    {
        "name": "rxFeedback",
        "moduleName": "'encore.ui.rxFeedback'",
        "displayName": "Rx Feedback",
        "srcFiles": [
            "src/rxFeedback/rxFeedback.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxFeedback/templates/feedbackForm.html",
            "templates/rxFeedback/templates/rxFeedback.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Component built to gather and send user feedback</p>",
            "js": "/*jshint unused:false*/\nfunction rxFeedbackCtrl ($scope, rxNotify) {\n    $scope.alwaysSucceed = function () {\n        rxNotify.add('Thanks for your feedback!', {\n            type: 'success',\n            timeout: 3\n        });\n    };\n\n    $scope.alwaysFail = function () {\n        rxNotify.add('Feedback not received!', {\n            type: 'error',\n            timeout: 3\n        });\n    };\n}\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxFeedbackCtrl\">\n\n    <rx-feedback id=\"rxFeedback\"></rx-feedback>\n    <span class=\"subdued\">(Will fallback to default email client)</span>\n\n    <hr/>\n\n    <rx-feedback on-submit=\"alwaysSucceed\" id=\"rxFeedbackSucceeds\"></rx-feedback>\n    <span class=\"subdued\">(Will Succeed)</span>\n\n    <rx-feedback on-submit=\"alwaysFail\" id=\"rxFeedbackFails\"></rx-feedback>\n    <span class=\"subdued\">(Will Fail)</span>\n\n</div>\n"
        }
    },
    {
        "name": "rxForm",
        "moduleName": "'encore.ui.rxForm'",
        "displayName": "Rx Form",
        "srcFiles": [
            "src/rxForm/rxForm.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxForm/templates/rxFormFieldset.html",
            "templates/rxForm/templates/rxFormItem.html",
            "templates/rxForm/templates/rxFormOptionTable.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>The rxForm component is a set of directives used to create forms throughout Encore. These directives provide a common HTML layout and style for all form elements, which helps ensure form accessibility and makes creating new forms easier.</p>\n\n<h1>Directives</h1>\n\n<h2>rxFormItem</h2>\n\n<p>Creates a field row wrapped in a label. Used for fields which include a single input/field.</p>\n\n<h2>rxFormFieldset</h2>\n\n<p>Creates a field row wrapped in a fieldset. Used for fields which include multiple inputs (e.g. rxFormOptionTable).</p>\n\n<h2>rxFormOptionTable</h2>\n\n<p>Given an data object and an additional optional object for column labels, rxFormOptionTable creates a series of radio or checkbox buttons. </p>\n\n<h3>Attributes</h3>\n\n<ul>\n<li><code>type</code>: Values <code>radio</code> or <code>checkbox</code> are required.</li>\n<li><code>required</code>: For checkboxes, a <code>true</code> value means there must be at least one checkbox checked.</li>\n<li><code>columns</code>: A data object listing column copy, include labels and keys. Expressions are allowed; see the samples.</li>\n<li><code>data</code>: A data object to prefill the radio/checkbox collection. For checkboxes, checked values default to true unless <code>value</code> and <code>falseValue</code> attributes are given. See the samples.</li>\n<li><code>model</code>: The AngularJS model to tie all radios/checkboxes together.</li>\n<li><code>field-id</code>: The ID of the elements.</li>\n<li><code>empty-message</code>: (string) A default message if the data attribute is empty. </li>\n</ul>",
            "js": "function rxFormDemoCtrl ($scope) {\n    $scope.types = [\n        {\n            'value': 'SATA',\n            'label': 'SATA'\n        },\n        {\n            'value': 'SSD',\n            'label': 'SSD'\n        }\n    ];\n\n    $scope.volume = {\n        isNameRequired: true,\n        type: _.first($scope.types).value, // select the first type by default\n        checked: [true, 'unchecked'] //example with first checkbox automatically checked\n    };\n\n    $scope.yesOptionDescription = '<b>This</b> is HTML that included in the JS';\n\n    $scope.optionTableData = [\n        {\n            'name': 'Option #1',\n            'value': 0,\n            'obj': {\n                'name': 'Nested Name 1'\n            }\n        }, {\n            'name': 'Option #2',\n            'value': 1,\n            'obj': {\n                'name': 'Nested Name 2'\n            }\n        }, {\n            'name': 'Option #3',\n            'value': 2,\n            'obj': {\n                'name': 'Nested Name 3'\n            }\n        }\n    ];\n\n    $scope.optionTableColumns = [{\n        'label': 'Name',\n        'key': 'name',\n        'selectedLabel': '(Already saved data)'\n    }, {\n        'label': 'Static Content',\n        'key': 'Some <strong>Text &</strong> HTML'\n    }, {\n        'label': 'Expression 2',\n        'key': '{{ value * 100 | number:2 }}'\n    }, {\n        'label': 'Expression 3',\n        'key': '{{ obj.name | uppercase }}'\n    }, {\n        'label': 'Expression 4',\n        'key': '{{ value | currency }}'\n    }];\n\n    $scope.optionTableCheckboxData = [{\n        'name': 'Item 1'\n    }, {\n        'name': 'Item 2',\n        'value': 'checked',\n        'falseValue': 'unchecked'\n    }];\n\n    $scope.optionTableEmptyData = [];\n\n    $scope.compressedLayout = { value: false };\n}\n",
            "html": "<div class=\"forms rx-form\" ng-controller=\"rxFormDemoCtrl\" ng-class=\"{'layout-compressed': compressedLayout.value}\">\n    <rx-form-item label=\"Switch to Compressed Layout\">\n        <input type=\"checkbox\" ng-model=\"compressedLayout.value\" />\n    </rx-form-item>\n    <h3 class=\"title\">Text inputs</h3>\n\n    <rx-form-item label=\"Plain textbox\">\n        <input type=\"text\" />\n    </rx-form-item>\n\n    <h4 class=\"title sm\">Example of required text input w/ validation pattern</h4>\n    <rx-form-item label=\"Volume Name\" description=\"Must be 2-5 letter palindrome (e.g. 'dewed')\">\n        <input type=\"text\" ng-model=\"volume.name\" ng-required=\"volume.isNameRequired\" ng-pattern=\"/^\\b(\\w)?(\\w)\\w?\\2\\1$/\" />\n    </rx-form-item>\n\n    <rx-form-item label=\"Require Name?\" description=\"Check and uncheck with empty volume name to see border\">\n        <input type=\"checkbox\" ng-model=\"volume.isNameRequired\" />\n    </rx-form-item>\n\n    <p class=\"clear\">Bound Value: {{volume.name}}</p>\n\n    <h4 class=\"title sm\">Example with prefix/suffix</h4>\n    <rx-form-item label=\"Monthly Cost\" prefix=\"$\" suffix=\"million\">\n        <input type=\"number\" ng-model=\"volume.cost\" />\n    </rx-form-item>\n\n    <hr>\n\n    <h3 class=\"title\">Select Boxes</h3>\n    <rx-form-item label=\"Type\" description=\"Bound Value: {{volume.type}}\">\n        <span class=\"field-select\">\n            <select ng-model=\"volume.type\" ng-required=\"true\">\n                <option\n                    ng-repeat=\"type in types\"\n                    value=\"{{type.value}}\"\n                    ng-selected=\"{{type.value == model}}\"\n                    >{{type.label}}</option>\n            </select>\n        </span>\n    </rx-form-item>\n\n    <hr>\n\n    <h3 class=\"title\">rxFormOptionTable</h3>\n\n    <rx-form-fieldset legend=\"Option Table (radio w/full-width class)\">\n        <rx-form-option-table\n            data=\"optionTableData\"\n            columns=\"optionTableColumns\"\n            type=\"radio\"\n            model=\"volume.data\"\n            field-id=\"optionTable\"\n            selected=\"0\"\n            class=\"full-width\"\n            ></rx-form-option-table>\n    </rx-form-fieldset>\n\n    <p>Bound Value: {{volume.data}}</p>\n\n    <rx-form-fieldset legend=\"Option Table (checkboxes)\">\n        <rx-form-option-table\n            columns=\"optionTableColumns\"\n            type=\"checkbox\"\n            model=\"volume.checked\"\n            field-id=\"optionCheckboxTable\"\n            data=\"optionTableCheckboxData\"\n            required=\"true\"\n            ></rx-form-option-table>\n    </rx-form-fieldset>\n\n    <p>Item 1 Value: {{volume.checked[0]}}</p>\n    <p>Item 2 Value: {{volume.checked[1]}}</p>\n\n    <rx-form-fieldset legend=\"Option Table (empty)\">\n        <rx-form-option-table\n            columns=\"optionTableColumns\"\n            type=\"checkbox\"\n            model=\"volume.checked\"\n            field-id=\"optionCheckboxTable\"\n            data=\"optionTableEmptyData\"\n            empty-message=\"You don't have any data!\"\n            ></rx-form-option-table>\n    </rx-form-fieldset>\n</div>\n"
        }
    },
    {
        "name": "rxIdentity",
        "moduleName": "'encore.ui.rxIdentity'",
        "displayName": "Rx Identity",
        "srcFiles": [
            "src/rxIdentity/rxIdentity.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Service for authenticating with Rackspaces' Identity service</p>",
            "js": "/*jshint unused:false*/\nfunction rxIdentityCtrl ($scope, Identity) {\n    $scope.user = {};\n    $scope.login = function () {\n        $scope.toggle = true;\n        Identity.login($scope.user,\n            function (authToken) {\n                $scope.toggle = false;\n                alert('Congrats! Logged In');\n            },\n            function (error) {\n                $scope.toggle = false;\n                alert('Login attempt failed.');\n            });\n    };\n}\n",
            "html": "<!-- Example only works when running locally since rxIdentity requires a proxy -->\n<div ng-controller=\"rxIdentityCtrl\">\n    <form>\n        <label>Username:</label>\n        <input type=\"text\" name=\"username\" ng-model=\"user.username\" />\n        <label>Password:</label>\n        <input type=\"password\" name=\"password\" ng-model=\"user.password\" />\n        <rx-button toggle-msg=\"Authenticating\" default-msg=\"Login\"\n            toggle=\"toggle\" ng-click=\"login()\"></rx-button>\n    </form>\n</div>\n"
        }
    },
    {
        "name": "rxInfoPanel",
        "moduleName": "'encore.ui.rxInfoPanel'",
        "displayName": "Rx Info Panel",
        "srcFiles": [
            "src/rxInfoPanel/rxInfoPanel.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxInfoPanel/templates/rxInfoPanel.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/experimental.svg\" alt=\"experimental\" title=\"\" /></a></p>\n\n<p>A generic info panel intended for use at the top of pages. For example:</p>\n\n<pre><code>&lt;rx-info-panel panel-title=\"My title!\"&gt;\n    You can put whatever you like in here.\n&lt;/rx-info-panel&gt;\n</code></pre>",
            "js": "",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<rx-info-panel panel-title=\"A Custom Title\">\n    You can put whatever content you want to inside here\n</rx-info-panel>\n"
        }
    },
    {
        "name": "rxLocalStorage",
        "moduleName": "'encore.ui.rxLocalStorage'",
        "displayName": "Rx Local Storage",
        "srcFiles": [
            "src/rxLocalStorage/rxLocalStorage.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Simple wrapper of the global session localStorage object for interacting with local storage.</p>",
            "js": "function rxLocalStorageCtrl ($scope, LocalStorage) {\n    $scope.setSideKick = function () {\n        LocalStorage.setObject('joker', { name: 'Harley Quinn' });\n    };\n\n    $scope.getSideKick = function () {\n        var sidekick = LocalStorage.getObject('joker');\n        alert(sidekick.name);\n    };\n}\n",
            "html": "<div ng-controller=\"rxLocalStorageCtrl\">\n    <label>Who is the Joker's side kick?</label>\n    <button ng-click=\"setSideKick()\" class=\"button button-positive\">Store Answer</button>\n    <button ng-click=\"getSideKick()\" class=\"button\">Answer?</button>\n</div>\n"
        }
    },
    {
        "name": "rxLogout",
        "moduleName": "'encore.ui.rxLogout'",
        "displayName": "Rx Logout",
        "srcFiles": [
            "src/rxLogout/rxLogout.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxAuth",
            "rxIdentity",
            "rxSession",
            "rxLocalStorage",
            "rxPermission",
            "rxSession",
            "rxLocalStorage"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Allows adding logout functionality to an element</p>",
            "js": "",
            "html": "<div>\n    <button rx-logout id=\"rxLogout\">Logout</button>\n    <button rx-logout=\"/overview\">Logout (with custom redirect)</button>\n</div>"
        }
    },
    {
        "name": "rxModalAction",
        "moduleName": "'encore.ui.rxModalAction'",
        "displayName": "Rx Modal Action",
        "srcFiles": [
            "src/rxModalAction/rxModalAction.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxModalAction/templates/rxModalAction.html",
            "templates/rxModalAction/templates/rxModalActionForm.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>This provides a hook into Angular-UI Bootstrap's modal directive. It's used as a link to open a modal window.The content inside the window is blank, however you can tie this with <code>&lt;rx-modal-form&gt;</code> to build a modal form window (including the modal title and submit/cancel buttons).</p>\n\n<p>This module has a dependency on <a href=\"http://angular-ui.github.io/bootstrap/\">Angular-UI Bootstrap</a>, so if it's going to be used, Bootstrap needs to be included in your webpage.</p>\n\n<h2>Template URL</h2>\n\n<p>Due to the complex nature of the information passed into modal windows, HTML is handled via a template (versus transcluding the content).</p>\n\n<p>One benefit is that this allows for multiple actions to re-use the same template. It also allows modal content to live in a separate file, which can be helpful for maintainability if the modal HTML is complex. While this can be done via <code>ng-include</code>, it would be a little extra work for a common scenario.</p>\n\n<h2>Pre/Post Hooks</h2>\n\n<p><code>rxModalAction</code> allows you to take actions before and after the modal window is shown. They are optional, and the modal window is fully functional without either being defined. Both are passed in as functions that are called on open and close of the modal window.</p>\n\n<h3>Pre-hook</h3>\n\n<p>Use a <code>pre-hook</code> to populate field information inside of the modal. This is useful when you have information you don't want loaded when the page is first opened, but do need for the modal. It's also useful for dynamic information that's based on actions taken</p>\n\n<h3>Post-hook</h3>\n\n<p>A <code>post-hook</code> is useful to take actions based upon input in the modal. For example, you can use the user input that gets entered to send API requests with specific JSON data. Or you can simply run a pre-defined API call (assuming the modal is a simple confirmation dialog).</p>\n\n<h2>rxModalForm</h2>\n\n<p>The <code>&lt;rx-modal-form&gt;</code> directive is helpful for providing a common format to forms inside modals (hence the name). It allows the following configurations:</p>\n\n<ul>\n<li>Title</li>\n<li>Subtitle</li>\n<li>isLoading\n<ul><li>whether the modal form should have a 'loading' message by default. This is usually tied in with a <code>pre-hook</code> to load data</li></ul></li>\n<li>submitText\n<ul><li>Override of the 'submit' button text</li></ul></li>\n<li><p>cancelText</p>\n\n<ul><li>Override of the 'cancel' button text</li></ul>\n\n<p>This directive also provides an 'autofocus' mechanism, which will move the keyboard focus cursor to the first 'tabbable' input available in the form.</p></li>\n</ul>",
            "js": "/*jshint unused:false*/\nfunction rxModalActionCtrl ($scope) {\n    $scope.password = 'guest';\n\n    $scope.populate = function (modalScope) {\n        modalScope.user = 'hey_dude';\n    };\n\n    $scope.changePass = function (fields) {\n        $scope.password = fields.password;\n    };\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxModalActionCtrl\">\n    <p>Password: {{password}}</p>\n    <rx-modal-action\n        pre-hook=\"populate(this)\"\n        post-hook=\"changePass(fields)\"\n        template-url=\"changePassword.html\">\n        Change Password\n    </rx-modal-action>\n    <script type=\"text/ng-template\" id=\"changePassword.html\">\n        <rx-modal-form title=\"Change {{user}} Admin Password\" \n        submit-text=\"Submit Password\" \n        cancel-text=\"Cancel Request\"\n        subtitle=\"Please read instructions below\">\n            <h1>Password must:</h1>\n            <ul class=\"list\">\n                <li>have at least one uppercase letter</li>\n                <li>have at least one number</li>\n                <li>be inspirational</li>\n                <li>be in haiku form</li>\n                <li>reference Star Wars</li>\n            </ul>\n\n            <rx-form-item label=\"New Password\">\n                <input type=\"text\" ng-model=\"fields.password\" required=\"true\">\n            </rx-form-item>\n        </rx-modal-form>\n    </script>\n</div>\n"
        }
    },
    {
        "name": "rxNotify",
        "moduleName": "'encore.ui.rxNotify'",
        "displayName": "Rx Notify",
        "srcFiles": [
            "src/rxNotify/rxNotify.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxNotify/templates/rxNotification.html",
            "templates/rxNotify/templates/rxNotifications.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Service (rxNotify) and Directives (rxNotification and rxNotifications) for displaying status messages on a page.</p>\n\n<h2>Using rxNotification as a State Message</h2>\n\n<p>There may be situations where you will need to use the styling/markup of rxNotify's messaging queue in status messages of your own - for example, a modal window which asks if you want to delete an object, with the appropriate warning or error flags. If this is the case, we recommend using the <code>rx-notification</code> directive in your views (note difference of <code>rx-notifications</code>.</p>\n\n<blockquote>\n  <p><code>&lt;rx-notification type=\"warn\"&gt;This is warning message!&lt;/rx-notification&gt;</code></p>\n</blockquote>\n\n<p>For all values of warn, please look below under Message options, under <code>type</code>.</p>\n\n<h2>Adding a New Message Queue via rxNotify</h2>\n\n<p>To add a new message to a stack, inject 'rxNotify' into your function and run:</p>\n\n<blockquote>\n  <p><code>rxNotify.add('My Message Text');</code></p>\n</blockquote>\n\n<p>This will add a new message to the default stack ('page') with all default options set. To customize options, pass in an object as the second argument with you specific options set:</p>\n\n<blockquote>\n  <p><code>rxNotify.add('My Message Text', {</code></p>\n  \n  <blockquote>\n    <p><code>stack: 'custom',</code></p>\n    \n    <p><code>type: 'warning'</code></p>\n  </blockquote>\n  \n  <p><code>});</code></p>\n</blockquote>\n\n<h2>Message options</h2>\n\n<hr />\n\n<ul>\n<li><p><strong><code>type</code></strong>: <em>Message type.</em></p>\n\n<blockquote>\n  <p>Default: <code>'info'</code></p>\n</blockquote>\n\n<p><em>Other values</em>: <code>'warn'</code>, <code>'error'</code>, <code>'success'</code></p></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>timeout</code></strong>: <em>Time (in seconds) for message to appear.</em></p>\n\n<blockquote>\n  <p>Default: <code>-1</code> (Message displays indefinitely)</p>\n</blockquote>\n\n<p><em>Other values</em>: Any positive integer</p></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>dismissable</code></strong>: <em>Whether a user can dismiss the message via an 'x' icon.</em></p>\n\n<blockquote>\n  <p>Default: <code>true</code></p>\n</blockquote>\n\n<p><em>Other values</em>: <code>false</code></p></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>repeat</code></strong>: <em>Whether the message should be allowed to appear more than once in the stack.</em></p>\n\n<blockquote>\n  <p>Default: <code>true</code></p>\n</blockquote>\n\n<p><em>Other values</em>: <code>false</code></p></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>loading</code></strong> <em>Replaces type icon with spinner. Removes option for use to dismiss message.</em></p>\n\n<blockquote>\n  <p>Default: <code>false</code></p>\n</blockquote>\n\n<p><em>Other values</em>: <code>true</code></p>\n\n<p>You usually want to associate this with a 'dismiss' property.</p>\n\n<p><strong>Example</strong>:</p>\n\n<blockquote>\n  <p><code>rxNotify.add('Loading', {</code></p>\n  \n  <blockquote>\n    <p><code>loading: true,</code></p>\n    \n    <p><code>dismiss: [$scope, 'loaded']</code></p>\n  </blockquote>\n  \n  <p><code>});</code></p>\n  \n  <p><code>var apiCallback = function (data) {</code></p>\n  \n  <blockquote>\n    <p><code>$scope.loaded = true;</code></p>\n    \n    <p><code>// do something with the data</code></p>\n  </blockquote>\n  \n  <p><code>}</code></p>\n  \n  <p><code>myApiCall(apiCallback);</code></p>\n</blockquote></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>show</code></strong>: <em>When to have the message appear.</em></p>\n\n<blockquote>\n  <p>Default: <code>'immediate'</code></p>\n</blockquote>\n\n<p><em>Other values:</em></p>\n\n<blockquote>\n  <p><code>'next'</code>: Show message after the next route change</p>\n  \n  <p><code>[scope, 'property']</code>:</p>\n  \n  <blockquote>\n    <p>Pass in a property on a scope to watch for a change. When the property value equals true, the message is shown.</p>\n  </blockquote>\n</blockquote>\n\n<p><strong>Example</strong>:</p>\n\n<blockquote>\n  <p><code>$scope.loaded = false;</code></p>\n  \n  <p><code>rxNotify.add('Content loaded!', {</code></p>\n  \n  <blockquote>\n    <p><code>show: [$scope, 'loaded']</code></p>\n  </blockquote>\n  \n  <p><code>});</code></p>\n  \n  <p><code>$timeout(function () {</code></p>\n  \n  <blockquote>\n    <p><code>$scope.loaded = true;</code></p>\n  </blockquote>\n  \n  <p><code>}, 1500);</code></p>\n</blockquote></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>dismiss</code></strong>: <em>When to have the message disappear.</em></p>\n\n<blockquote>\n  <p>Default: <code>'next'</code> (Dismiss message after the next route change)</p>\n</blockquote>\n\n<p><em>Other values:</em></p>\n\n<blockquote>\n  <p><code>[scope, 'property']</code>:</p>\n  \n  <blockquote>\n    <p>Pass in a property on a scope to watch for a change. When the property value equals true, the message is dismissed.</p>\n  </blockquote>\n</blockquote>\n\n<p><strong>Example</strong>:</p>\n\n<blockquote>\n  <p><code>$scope.loaded = false;</code></p>\n  \n  <p><code>rxNotify.add('Loading Content', {</code></p>\n  \n  <blockquote>\n    <p><code>dismiss: [$scope, 'loaded']</code></p>\n  </blockquote>\n  \n  <p><code>});</code></p>\n  \n  <p><code>$timeout(function () {</code></p>\n  \n  <blockquote>\n    <p><code>$scope.loaded = true;</code></p>\n  </blockquote>\n  \n  <p><code>}, 1500);</code></p>\n</blockquote></li>\n</ul>\n\n<hr />\n\n<ul>\n<li><p><strong><code>stack</code></strong>: <em>Which message stack the message gets added to.</em></p>\n\n<blockquote>\n  <p>Default: <code>'page'</code></p>\n  \n  <p><em>Other values:</em> Any string</p>\n</blockquote>\n\n<p><strong>Example</strong>:</p>\n\n<blockquote>\n  <p><code>rxNotify.add('Username required', {</code></p>\n  \n  <blockquote>\n    <p><code>type: 'error',</code></p>\n    \n    <p><code>stack: 'loginForm'</code></p>\n  </blockquote>\n  \n  <p><code>});</code></p>\n  \n  <p><code>&lt;rx-notifications stack=\"loginForm\"&gt;&lt;/rx-notifications&gt;</code></p>\n</blockquote></li>\n</ul>\n\n<hr />\n\n<h2>Dismissing a message programatically</h2>\n\n<p>Most messages are dismissed either by the user, a route change or using the custom 'dismiss' property.</p>\n\n<p>If you need to dismiss a message programmaticaly, you can run <strong><code>rxNotify.dismiss(message)</code></strong>, where message is the message object to dismiss.</p>\n\n<p>If you don't have the full message object, passing in the Message ID (which is returned from <strong><code>rxNotify.add</code></strong>) and the stack the message is in: <strong><code>rxNotify.dismiss('42', 'page')</code></strong>.</p>\n\n<h2>Stacks</h2>\n\n<p>Stacks are just separate notification areas. Normally, all messages created will go to the 'page' stack, which should be displayed at the top of the page. It's used for page-level messages.</p>\n\n<p>You can also create custom stacks for speficic notification areas. Say you have a form on your page that you want to add error messages to. You can create a custom stack for this form and send form-specific messages to it.</p>\n\n<h2>Using the Page Stack</h2>\n\n<p>The default notification stack is added by default to the page template, so it should be ready to use without any work (unless the app uses a custom template). The HTML to add the default stack to the page is:</p>\n\n<blockquote>\n  <p><code>&lt;rx-notifications&gt;&lt;/rx-notifications&gt;</code></p>\n</blockquote>\n\n<p>Note that a 'stack' attribute does not need to be defined.</p>\n\n<h2>Creating a Custom Stack</h2>\n\n<p>See 'stack' under 'Message options'</p>\n\n<h2>Clearing all messages in a stack</h2>\n\n<p>You can clear all messages in a specific stack programmatically via the <strong><code>rxNotify.clear</code></strong> function. Simply pass in the name of the stack to clear: <strong><code>rxNotify.clear('page')</code></strong>.</p>\n\n<h2>rxPromiseNotifications</h2>\n\n<p>It's a common pattern with API requests that you'll show a loading message, followed by either a success or failure message depending on the result of the call. rxPromiseNotifications is the service created for this pattern. See the API docs for more information on how to call/use rxPromiseNotifications.</p>",
            "js": "/*jshint unused:false*/\n\nfunction rxNotifyCtrl ($rootScope, $scope, rxNotify, rxPromiseNotifications, $q) {\n    $scope.message = 'My message';\n\n    $scope.options = {\n        type: 'info',\n        timeout: -1,\n        dismissable: true,\n        show: 'immediate',\n        repeat: true\n    };\n\n    $scope.routeChange = function (stack) {\n        $rootScope.$broadcast('$routeChangeStart', {});\n        $rootScope.$broadcast('$routeChangeSuccess', {});\n    };\n\n    $scope.add = function (stack) {\n        var messageOptions = _.clone($scope.options);\n        messageOptions.stack = stack;\n\n        rxNotify.add($scope.message, messageOptions);\n    };\n\n    // add a default messages (to custom stack so they don't show on the main page)\n    rxNotify.add('Helpful Information', {\n        stack: 'demo'\n    });\n    rxNotify.add('Loading', {\n        loading: true,\n        stack: 'demo'\n    });\n    rxNotify.add('You did it!', {\n        type: 'success',\n        stack: 'demo'\n    });\n    rxNotify.add('Careful now...', {\n        type: 'warning',\n        stack: 'demo'\n    });\n    rxNotify.add('Under Attack by Aliens', {\n        type: 'error',\n        stack: 'custom'\n    });\n\n    // stuff for rxPromiseNotifications\n    $scope.addPromise = function () {\n        $scope.deferred = $q.defer();\n\n        var promiseScope = rxPromiseNotifications.add($scope.deferred.promise, {\n            loading: 'Loading Message',\n            success: 'Success Message',\n            error: 'Error Message'\n        }, 'demo');\n    };\n}\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxNotifyCtrl\">\n    <div class=\"form-item\">\n        <label>Message text: <input type=\"text\" ng-model=\"message\" /></label>\n    </div>\n\n    <div class=\"form-item\">\n        <label>Timeout (in seconds): <input type=\"text\" ng-model=\"options.timeout\" /></label>\n    </div>\n\n    <div class=\"form-item\">\n        <fieldset>\n            <legend>Type:</legend>\n            <label><input type=\"radio\" name=\"notify-type\" ng-model=\"options.type\" value=\"info\" /> Info</label>\n            <label><input type=\"radio\" name=\"notify-type\" ng-model=\"options.type\" value=\"success\" /> Success</label>\n            <label><input type=\"radio\" name=\"notify-type\" ng-model=\"options.type\" value=\"warning\" /> Warning</label>\n            <label><input type=\"radio\" name=\"notify-type\" ng-model=\"options.type\" value=\"error\" /> Error</label>\n        </fieldset>\n    </div>\n\n    <div class=\"form-item\">\n        <fieldset>\n            <legend>Show:</legend>\n            <label><input type=\"radio\" name=\"notify-show\" ng-model=\"options.show\" value=\"immediate\" /> Immediately</label>\n            <label><input type=\"radio\" name=\"notify-show\" ng-model=\"options.show\" value=\"next\" /> Next</label>\n        </fieldset>\n    </div>\n\n    <div class=\"form-item\">\n        <label>Repeat: <input type=\"checkbox\" ng-model=\"options.repeat\" /></label>\n    </div>\n\n    <div class=\"form-item\">\n        <label>Dismissable (by user): <input type=\"checkbox\" ng-model=\"options.dismissable\" /></label>\n    </div>\n\n    <div class=\"form-item\">\n        <label>Loading? (shows spinner): <input type=\"checkbox\" ng-model=\"options.loading\" /></label>\n    </div>\n\n    <div>\n        <button class=\"button\" ng-click=\"add('demo')\">Add to Demo Stack</button>\n        <button class=\"button\" ng-click=\"add('custom')\">Add to Custom Stack</button>\n    </div>\n\n    <div>\n        <h3>rxPromiseNotifications</h3>\n        <button class=\"button\" ng-click=\"addPromise()\">Create messages</button>\n        <button class=\"button button-positive\" ng-click=\"deferred.resolve();\">Resolve Promise</button>\n        <button class=\"button button-negative\" ng-click=\"deferred.reject();\">Reject Promise</button>\n    </div>\n\n    <div>\n        <button class=\"button\" ng-click=\"routeChange()\">Simulate Route Change</button>\n    </div>\n\n    <div class=\"pure-g\">\n        <div class=\"pure-u-1-2\">\n            <h2>Demo Stack</h2>\n            <rx-notifications stack=\"demo\"></rx-notifications>\n        </div>\n\n        <div class=\"pure-u-1-2\">\n            <h2>Custom Stack</h2>\n            <rx-notifications stack=\"custom\"></rx-notifications>\n        </div>\n    </div>\n\n    <p>Using rx-notification</p>\n\n    <rx-notification type=\"error\">Hello, world!</rx-notification>\n    <rx-notification type=\"warning\">Hello, world!</rx-notification>\n    <rx-notification type=\"info\">Hello, world!</rx-notification>\n</div>\n"
        }
    },
    {
        "name": "rxPageTitle",
        "moduleName": "'encore.ui.rxPageTitle'",
        "displayName": "Rx Page Title",
        "srcFiles": [
            "src/rxPageTitle/rxPageTitle.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Service for managing the page titles.</p>",
            "js": "/*jshint unused:false*/\n\n// This file is used to help build the 'demo' documentation page and should be updated with example code\nfunction rxPageTitleCtrl ($scope, rxPageTitle) {\n    $scope.changeTitle = function () {\n        rxPageTitle.setTitle($scope.newTitle);\n    };\n\n    $scope.refreshTitle = function () {\n        $scope.pageTitle = rxPageTitle.getTitle();\n    };\n\n    $scope.refreshTitle();\n}",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxPageTitleCtrl\">\n    Current Title: {{pageTitle}} <button ng-click=\"refreshTitle()\" class=\"button\">Get Updated Title</button><br />\n\n    <input type=\"text\" ng-change=\"changeTitle()\" ng-model=\"newTitle\" placeholder=\"New Title\" />\n</div>"
        }
    },
    {
        "name": "rxPaginate",
        "moduleName": "'encore.ui.rxPaginate'",
        "displayName": "Rx Paginate",
        "srcFiles": [
            "src/rxPaginate/rxPaginate.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxPaginate/templates/rxItemsPerPage.html",
            "templates/rxPaginate/templates/rxPaginate.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Used for adding pagination around a data object.</p>\n\n<h1>Hiding the pagination</h1>\n\n<p>In some instances, the pagination should be hidden if there isn't enough data to require it. For example, if you have <code>itemsPerPage</code> set to 10, but only have 7 items of data (so only one page). Hiding the pagination is pretty simple:</p>\n\n<pre><code>&lt;rx-paginate page-tracking=\"pager\" ng-hide=\"pager.totalPages === 1\"&gt;&lt;/rx-paginate&gt;\n</code></pre>\n\n<p>You can use this code on any part of your view. For example, if you have pagination in your table footer, it's a good idea to hide the entire footer:</p>\n\n<pre><code>&lt;tfoot ng-hide=\"pager.totalPages === 1\"&gt;\n    &lt;tr class=\"paginate-area\"&gt;\n        &lt;td colspan=\"12\"&gt;\n            &lt;rx-paginate page-tracking=\"pager\"&gt;&lt;/rx-paginate&gt;\n        &lt;/td&gt;\n    &lt;/tr&gt;\n&lt;/tfoot&gt;\n</code></pre>\n\n<p>See the demo page for more examples of this.</p>",
            "js": "/*jshint unused:false*/\n\n// This file is used to help build the 'demo' documentation page and should be updated with example code\nfunction rxPaginateCtrl ($scope, PageTracking) {\n    $scope.sorter = {\n        predicate: 'id',\n        reverse: false\n    };\n    $scope.pager = PageTracking.createInstance();\n    $scope.pager.itemsPerPage = 3;\n\n    var makeServers = function (serverCount) {\n        var servers = [];\n        var os = ['Ubuntu 12.04', 'Red Hat Enterprise Linux 6.4', 'CentOS 6.4', 'Ubuntu 13.04'];\n        for (var i = 1; i < serverCount + 1; i++) {\n            var server = {\n                id: i,\n                name: 'Server ' + i,\n                os: os[i % os.length]\n            };\n            servers.push(server);\n        }\n        return servers;\n    };\n\n    $scope.servers = makeServers(21);\n\n    $scope.removeServers = function () {\n        if ($scope.servers.length > 2) {\n            $scope.servers = $scope.servers.splice(2);\n        }\n    };\n\n    $scope.addServers = function () {\n        $scope.servers = $scope.servers.concat(makeServers(2));\n    };\n}",
            "html": "<div ng-controller=\"rxPaginateCtrl\">\n    <table class=\"table-striped\">\n        <thead>\n            <tr>\n                <th class=\"column-title\" style=\"width:10em;\">Name</th>\n                <th class=\"column-title\">OS</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"server in servers | orderBy: sorter.predicate:sorter.reverse | Paginate:pager \">\n                <td>\n                    {{server.name}}\n                </td>\n                <td>{{server.os}}</td>\n            </tr>\n        </tbody>\n        <tfoot ng-hide=\"pager.totalPages === 1\">\n            <tr class=\"paginate-area\">\n                <td colspan=\"12\">\n                    <rx-paginate page-tracking=\"pager\"></rx-paginate>\n                </td>\n            </tr>\n        </tfoot>\n    </table>\n\n    <p>Use these buttons to adjust the number of pages displayed. The pagination will hide when there is only one page available.</p>\n    <p>\n        <button ng-click=\"removeServers()\" class=\"button sm negative\">Remove first 2 servers</button>\n        <button ng-click=\"addServers()\" class=\"button sm positive\">Add 2 servers</button>\n    </p>\n</div>\n"
        }
    },
    {
        "name": "rxPermission",
        "moduleName": "'encore.ui.rxPermission'",
        "displayName": "Rx Permission",
        "srcFiles": [
            "src/rxPermission/rxPermission.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxPermission/templates/rxPermission.html"
        ],
        "dependencies": [
            "rxSession",
            "rxLocalStorage"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Service and directive for mananging permissions in EncoreUI</p>",
            "js": "function rxPermissionCtrl ($scope, Session, rxNotify) {\n    rxNotify.add('Respect My Authority!!', {\n        stack: 'permission',\n        type: 'warning'\n    });\n\n    $scope.storeToken = function () {\n        Session.storeToken({ access: { user: { roles: [{ name: 'test' } ] }}});\n    }\n\n    $scope.clearToken = function () {\n        Session.logout();\n    };\n}\n",
            "html": "<!-- Sample HTML goes here as a live example of how to the component can be used -->\n<div ng-controller=\"rxPermissionCtrl\">\n    <button class=\"storeToken button\" name=\"button\" ng-click=\"storeToken()\">Store Token</button>\n    <button class=\"clearToken button button-negative\" name=\"button\" ng-click=\"clearToken()\">Clear Token</button>\n\n    <rx-permission role=\"test\">\n        <rx-notifications stack=\"permission\"></rx-notifications>\n    </rx-permission>\n</div>\n"
        }
    },
    {
        "name": "rxSession",
        "moduleName": "'encore.ui.rxSession'",
        "displayName": "Rx Session",
        "srcFiles": [
            "src/rxSession/rxSession.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxLocalStorage"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Service for managing user session in encore-ui.</p>",
            "js": "function rxSessionCtrl ($scope, Session) {\n    $scope.isAuthenticated = function () {\n        alert(Session.isAuthenticated());\n    };\n}\n",
            "html": "<div ng-controller=\"rxSessionCtrl\">\n    <button ng-click=\"isAuthenticated()\" class=\"button\">Is Authenticated</button>\n</div>\n"
        }
    },
    {
        "name": "rxSessionStorage",
        "moduleName": "'encore.ui.rxSessionStorage'",
        "displayName": "Rx Session Storage",
        "srcFiles": [
            "src/rxSessionStorage/rxSessionStorage.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>A simple wrapper of the global sessionStorage object for interacting with session storage.\nThis service is similar to angular's $window and $document services.  The API is exactly the\nsame as the W3C's specification provided at: http://dev.w3.org/html5/webstorage/#storage-0</p>",
            "js": "function rxSessionStorageCtrl ($scope, SessionStorage) {\n    $scope.setSideKick = function () {\n        SessionStorage.setItem('Batman', 'Robin');\n    };\n\n    $scope.getSideKick = function () {\n        alert(SessionStorage.getItem('Batman'));\n    };\n}\n",
            "html": "<div ng-controller=\"rxSessionStorageCtrl\">\n    <label>Who is Batman's side kick?</label>\n    <button ng-click=\"setSideKick()\" class=\"button button-positive\">Store Answer</button>\n    <button ng-click=\"getSideKick()\" class=\"button\">Answer?</button>\n</div>\n"
        }
    },
    {
        "name": "rxSortableColumn",
        "moduleName": "'encore.ui.rxSortableColumn'",
        "displayName": "Rx Sortable Column",
        "srcFiles": [
            "src/rxSortableColumn/rxSortableColumn.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [
            "templates/rxSortableColumn/templates/rxSortableColumn.html"
        ],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>A clickable link in a table heading which will sort the table by the referenced property in ascending or descending order.</p>",
            "js": "/*jshint unused:false*/\n\n// This file is used to help build the 'demo' documentation page and should be updated with example code\nfunction rxSortableColumnCtrl ($scope, PageTracking, rxSortUtil) {\n    $scope.sort = rxSortUtil.getDefault();\n    $scope.pager = PageTracking.createInstance();\n\n    $scope.sortCol = function (predicate) {\n        return rxSortUtil.sortCol($scope, predicate);\n    };\n\n    $scope.talentPool = [\n        {\n            name: 'Andrew Yurisich',\n            jobTitle: 'Mailroom Associate IV'\n        },\n        {\n            name: 'Patrick Deuley',\n            jobTitle: 'Design Chaplain'\n        },\n        {\n            name: 'Hussam Dawood',\n            jobTitle: 'Evangelist of Roger Enriquez'\n        },\n        {\n            name: 'Kerry Bowley',\n            jobTitle: 'Dev Mom'\n        },\n    ];\n}",
            "html": "<div ng-controller=\"rxSortableColumnCtrl\">\n    <table>\n        <thead>\n            <tr>\n                <th scope=\"col\">\n                    <rx-sortable-column\n                        sort-method=\"sortCol(property)\"\n                        sort-property=\"name\"\n                        predicate=\"sort.predicate\"\n                        reverse=\"sort.reverse\">\n                        Name\n                    </rx-sortable-column>\n                </th>\n                <th scope=\"col\">\n                    <rx-sortable-column\n                        sort-method=\"sortCol(property)\"\n                        sort-property=\"jobTitle\"\n                        predicate=\"sort.predicate\"\n                        reverse=\"sort.reverse\">\n                        Occupation\n                    </rx-sortable-column>\n                </th>\n            </tr>\n        </thead>\n        <tbody id=\"talentPoolData\">\n            <tr ng-repeat=\"resource in talentPool | orderBy:sort.predicate:sort.reverse\">\n                <th scope=\"row\" class=\"talent-name\">\n                    {{resource.name}}\n                </th>\n                <td class=\"talent-job\">\n                    {{resource.jobTitle}}\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n"
        }
    },
    {
        "name": "rxSpinner",
        "moduleName": "'encore.ui.rxSpinner'",
        "displayName": "Rx Spinner",
        "srcFiles": [
            "src/rxSpinner/rxSpinner.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>Add a spinner icon to any element</p>",
            "js": "/*jshint unused:false*/\nfunction rxSpinnerCtrl ($scope) {\n    $scope.loading = true;\n}",
            "html": "<div ng-controller=\"rxSpinnerCtrl\">\n    <button rx-toggle=\"loading\" class=\"button\">Toggle Loading</button>\n    <div rx-spinner toggle=\"loading\" class=\"rxSpinnerExample\">Spinning = {{loading}}</div>\n</div>\n<style type=\"text/css\">\n.rxSpinnerExample {\n    background: #00ac31;\n    padding: 20px;\n    color: white;\n    line-height: 20px;\n}\n</style>\n"
        }
    },
    {
        "name": "rxStatus",
        "moduleName": "'encore.ui.rxStatus'",
        "displayName": "Rx Status",
        "srcFiles": [
            "src/rxStatus/rxStatus.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxNotify"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<h1>Description</h1>\n\n<p>This service is provided as a compliment to <a href=\"http://rackerlabs.github.io/encore-ui/#/component/rxNotify\"><code>rxNotify</code> rxNotify service</a>.  It abstracts out some of the raw functionality provided by rxNotify to make the addition and removal of single messages easier.</p>\n\n<h1>Usage</h1>\n\n<h2>Preparation</h2>\n\n<p>In order to use the <code>Status</code> service, one has to instantiate it with a proper <code>$scope</code> object to keep track of a running state.  <code>rxNotify</code> indirectly makes use of the <code>$scope</code> variable when a message can be auto-dismissed.  In order to keep the interface for the wrapper functions coherent, the <code>$scope</code> variable must be provided before use.  This can be accomplished as follows:</p>\n\n<pre><code>    Status.setupScope($scope);\n</code></pre>\n\n<h2>Success cases</h2>\n\n<p>The <code>Status</code> service is provided as a wrapper to rxNotify.  As such, the status types supported by <code>rxNotify</code> are still used and have been wrapped into utility functions.  For example, on page load it is usually necessary to inform the user of pending data retrieval.  This can be accomplished by:</p>\n\n<pre><code>    Status.setLoading('Retrieving users');\n</code></pre>\n\n<p>This will call rxNotify in the following manner:</p>\n\n<pre><code>    rxNotify.add('Retrieving users', {\n        stack: 'page',\n        dismiss: [scope, 'loaded'],\n        loading: true\n    });\n</code></pre>\n\n<p>Similarly, the following call using the Status service:</p>\n\n<pre><code>    Status.setSuccess('Successfully deleted questionable ' +\n        'browsing history');\n</code></pre>\n\n<p>results in a call to rxNotify as such:</p>\n\n<pre><code>    rxNotify.add('Successfully deleted questionable ' +\n        'browsing history',\n        {\n            stack: 'page',\n            show: 'next'\n        }\n    );\n</code></pre>\n\n<p>Note: For <code>success</code> and <code>error</code> messages, the <code>repeat</code> attribute is set to false. Messages of <code>success</code> will also automatically timeout after 5 seconds. Both of these defaults were design decisions made at this level for usability and consistency across all Encore products. </p>\n\n<p>Each of the wrapper functions to the different rxNotify message types support receiving an <code>options:{}</code> parameter that can override defaults for the respective wrapper. For example, instead of showing a success message on next route change, it can be shown immediately:</p>\n\n<pre><code>    Status.setSuccess('Please show immediately', {\n        show: 'immediate'\n    });\n</code></pre>\n\n<p>Please note that the <code>options</code> are of the same type as one would provide to rxNotify.  This should allow for maximum flexibility when necessary.  However, as a bonus, some common behaviours expected to be overriden have been provided as their own wrapper functions.  For example:</p>\n\n<pre><code>    Status.setSuccessImmediate('Please show immediately')\n</code></pre>\n\n<p>is the equivalent of calling <code>Status.setSuccess()</code> with the <code>{ show: 'immediate' }</code> parameter.  Please note, there isn't much fault checking in place, so the following behaviour although permitted, is not advised:</p>\n\n<pre><code>    Status.setSuccessImmediate('Please show immediately', {\n        show: 'next'\n    });\n</code></pre>\n\n<h2>Error cases</h2>\n\n<p>The <code>{ type: 'error' }</code> wrapper is a unique one.  It allows for a string to be passed as an error message, just like the wrappers before.  For example:</p>\n\n<pre><code>    Status.setError('This is an error!');\n</code></pre>\n\n<p>It also allows for a specialized template to be specified as the error string with an <code>object:{}</code> as the second parameter containing the replacements for the template in the error string.  If in a proper format, the object can be automatically parsed using an <code>ErrorFormatter</code> and displayed to the user.  For example:</p>\n\n<pre><code>    Status.setError(\n        'Failed loading browsing history: ${message}',\n        { message: 'User has previously cleared their history!' }\n    );\n</code></pre>\n\n<p>Please note that the replacement variable <code>${message}</code> in the error string maps one-to-one to the keys provided in the the error object.  One can specify any number of template variables to replace.  Not providing a balanced list of variables and their replacements will result in a <code>ReferenceError: &lt;replacement&gt; is not defined</code>.</p>\n\n<p>The following wrapper functions are available today.  Their names should be self explanatory:</p>\n\n<ul>\n<li>setLoading</li>\n<li>setSuccess</li>\n<li>setSuccessNext</li>\n<li>setSuccessImmediate</li>\n<li>setWarning</li>\n<li>setInfo</li>\n<li>setError</li>\n<li>complete &rarr; setSuccessImmediate</li>\n</ul>\n\n<p>The following are used to programmatically remove notifications from the screen:</p>\n\n<ul>\n<li>dismiss</li>\n<li>clear</li>\n</ul>\n\n<h1>Utilities</h1>\n\n<p>The <code>Status</code> service requires that one provide a <code>$scope</code> object to keep tracking of state before any of the wrapper functions can be utilized.  Since it is expected that almost all pages will make use of notifications, one can place the repeated setup of the <code>Status</code> service in a page load event handler.  This will allow all pages to gain an already setup <code>Status</code> service for immediate use.  For example:</p>\n\n<pre><code>    .run(function ($rootScope, StatusUtil) {\n        $rootScope.$on('$routeChangeSuccess', function () {\n            Status.setupScope($rootScope);\n        });\n    });\n</code></pre>\n\n<p>Although hidden away in the app's bootstrap code, the above makes for a less repetitive call to <code>Status.setScope()</code> at the beginning of each use.</p>",
            "js": "function rxStatusCtrl ($scope, $rootScope, Status) {\n    Status.setScope($scope);\n\n    $scope.triggerRouteChangeSuccess = function () {\n        $rootScope.$broadcast('$routeChangeSuccess');\n    };\n\n    $scope.clear = function () {\n        Status.clear();\n        $scope.notify = undefined;\n    };\n\n    $scope.setLoading = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setLoading(msg);\n    };\n\n    $scope.setSuccess = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setSuccess(msg);\n    };\n\n    $scope.setSuccessNext = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setSuccessNext(msg);\n    };\n\n    $scope.setSuccessImmediate = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setSuccessImmediate(msg);\n    };\n\n    $scope.setWarning = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setWarning(msg);\n    };\n\n    $scope.setInfo = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setInfo(msg);\n    };\n\n    $scope.setError = function (msg) {\n        Status.clear();\n        $scope.notify = Status.setError(msg);\n    };\n\n    $scope.dismiss = function () {\n        $scope.notify && Status.dismiss($scope.notify);\n        $scope.notify = undefined;\n    };\n}\n",
            "html": "<div ng-controller=\"rxStatusCtrl\">\n    <div style=\"clear: left;\">\n        <ol>\n            <li>\n                <input type=\"button\" value=\"setLoading\"\n                    ng-click=\"setLoading('This should set a spinner')\"/>\n                        should set a spinner</li>\n            <li>&nbsp;</li>\n            <li>\n                <input type=\"button\" value=\"setSuccess\"\n                    ng-click=\"setSuccess('This should show a success on $routeChangeSuccess')\"/>\n                        should show a success on <strong>$routeChangeSuccess</strong> -\n                        <input type=\"button\" ng-click=\"triggerRouteChangeSuccess()\" value=\"Trigger it!\" /></li>\n            <li>&nbsp;</li>\n            <li>\n                <input type=\"button\" value=\"setSuccessNext\"\n                    ng-click=\"setSuccessNext('This should show a success on $routeChangeSuccess')\"/>\n                        should show a success on <strong>$routeChangeSuccess</strong> -\n                        <input type=\"button\" ng-click=\"triggerRouteChangeSuccess()\" value=\"Trigger it!\"/></li>\n            <li>&nbsp;</li>\n            <li>\n                <input type=\"button\" value=\"setSuccessImmediate\"\n                    ng-click=\"setSuccessImmediate('This should show a success immediately')\"/>\n                        should show a <strong>success immediately</strong></li>\n            <li>&nbsp;</li>\n            <li>\n                <input type=\"button\" value=\"setWarning\"\n                    ng-click=\"setWarning('This should set a warning')\"/>\n                        should set a <strong>warning</strong></li>\n            <li>&nbsp;</li>\n            <li>\n                <input type=\"button\" value=\"setInfo\"\n                    ng-click=\"setInfo('This should set an informational')\"/>\n                        should set an <strong>informational</strong></li>\n            <li>&nbsp;</li>\n            <li>\n                <input type=\"button\" value=\"setError\"\n                    ng-click=\"setError('This should set an error')\"/>\n                        should set an <strong>error</strong></li>\n        </ol>\n\n        <hr ng-show=\"!!notify\" />\n        <p ng-show=\"!!notify\">\n            <input type=\"button\" value=\"Dismiss\" ng-click=\"dismiss()\" /> the message shown </p>\n\n        <p ng-show=\"notify\">\n            <input type=\"button\" value=\"Clear\" ng-click=\"clear()\" /> all shown messages </p>\n    </div>\n</div>\n"
        }
    },
    {
        "name": "rxToggle",
        "moduleName": "'encore.ui.rxToggle'",
        "displayName": "Rx Toggle",
        "srcFiles": [
            "src/rxToggle/rxToggle.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/stable.svg\" alt=\"stable\" title=\"\" /></a></p>\n\n<p>This component provides and attribute to handle toggling a boolean scope property for hide/show purposes. Normally used in conjunction with ng-show to toggle hidden content. See the collapse functionality in 'rxApp' for a real-world use.</p>\n\n<h2>Future plans</h2>\n\n<p>In conjunction with rxToggle, it would be helpful to have an attribute that binds the visibility state of an element with an event, so that when an event is fired from a component of the same type, it hides all other components of that time. For example, if a pop-up menu appears on click of a 'gear' component, it should hide any other existing pop-up menus currently showing.</p>",
            "js": "",
            "html": "<div>\n    <button rx-toggle=\"visible\" id=\"vacillator\" class=\"button\">Toggle Div</button>\n\n    <p>Current state: {{visible}}</p>\n\n    <div ng-show=\"visible\" id=\"vacillated\">Shows when $scope.visibile == true</div>\n</div>"
        }
    },
    {
        "name": "rxTokenInterceptor",
        "moduleName": "'encore.ui.rxTokenInterceptor'",
        "displayName": "Rx Token Interceptor",
        "srcFiles": [
            "src/rxTokenInterceptor/rxTokenInterceptor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxSession",
            "rxLocalStorage"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Simple $http interceptor which adds auth token id to http requests.</p>",
            "js": "",
            "html": "<pre>\n    <code>\n        angular.module('encoreApp', ['encore.ui'])\n            .config(function ($httpProvider) {\n                $httpProvider.interceptors.push('TokenInterceptor');\n            });\n    </code>\n</pre>\n"
        }
    },
    {
        "name": "rxUnauthorizedInterceptor",
        "moduleName": "'encore.ui.rxUnauthorizedInterceptor'",
        "displayName": "Rx Unauthorized Interceptor",
        "srcFiles": [
            "src/rxUnauthorizedInterceptor/rxUnauthorizedInterceptor.js"
        ],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [
            "rxSession",
            "rxLocalStorage"
        ],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>Simple $http interceptor which will redirect users back to login on 401.</p>",
            "js": "",
            "html": "<pre>\n    <code>\n        angular.module('encoreApp', ['encore.ui'])\n            .config(function ($httpProvider) {\n                $httpProvider.interceptors.push('UnauthorizedInterceptor');\n            });\n    </code>\n</pre>\n"
        }
    },
    {
        "name": "tabs",
        "moduleName": "'encore.ui.tabs'",
        "displayName": "Tabs",
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>This component provides styles and a demo for the <a href=\"https://github.com/angular-ui/bootstrap/tree/master/src/tabs\">the Angular-UI Bootstrap Tabs plugin</a>, which is included as a dependency for Encore-UI.</p>\n\n<h2>Usage</h2>\n\n<p>Usage is the exact same as demoed on the Angular-UI Bootstrap site. See <a href=\"http://angular-ui.github.io/bootstrap/\">the Angular-UI Bootstrap Docs</a> for further guidance on usage and configuration of this component.</p>\n\n<h2>Disclaimer</h2>\n\n<p>Only the default horizontal tabs are supported by these styles. <code>Vertical</code>, <code>Pills</code> and <code>Justified</code> tabs are currently unsupported. Support can be added if needed.</p>",
            "js": "",
            "html": "<div>\n    <h1 class=\"title lg\">Alternative Lorem Ipsums</h1>\n    <tabset id=\"tabs\">\n        <tab heading=\"Bacon Ipsum\">\n            <p>Bacon ipsum dolor sit amet salami jowl corned beef, andouille flank tongue ball tip kielbasa pastrami tri-tip meatloaf short loin beef biltong. Cow bresaola ground round strip steak fatback meatball shoulder leberkas pastrami sausage corned beef t-bone pork belly drumstick.</p>\n        </tab>\n        <tab heading=\"Veggie Ipsum\">\n            <p>Veggies sunt bona vobis, proinde vos postulo esse magis grape pea sprouts horseradish courgette maize spinach prairie turnip jícama coriander quandong gourd broccoli seakale gumbo. Parsley corn lentil zucchini radicchio maize burdock avocado sea lettuce. Garbanzo tigernut earthnut pea fennel.</p>\n        </tab>\n        <tab>\n            <tab-heading>Cat Ipsum <span class=\"subdued\">(meow)</span></tab-heading>\n            <p>Cat ipsum dolor sit amet, hunt anything that moves or hopped up on goofballs hide when guests come over. Hide when guests come over intrigued by the shower, or stare at ceiling climb leg for stretch and use lap as chair. Hunt anything that moves flop over, leave dead animals as gifts for chase imaginary bugs, chase mice for stare at ceiling yet hopped up on goofballs.</p>\n        </tab>\n        <tab>\n            <tab-heading>Tupac Ipsum</tab-heading>\n            <p>I give a holla to my sisters on welfare 2Pac cares, if don't nobody else care And, I know they like to beat you down a lot When you come around the block, brothers clown a lot But please don't cry, dry your eyes, never let up Forgive but don't forget, girl, keep your head up And when he tells you you ain't nothin', don't believe him And if he can't learn to love you, you should leave him Cause sister, you don't need him And I ain't tryin' to gas ya up, I just call 'em how I see 'em</p>\n        </tab>\n    </tabset>\n</div>"
        }
    },
    {
        "name": "tooltips",
        "moduleName": "'encore.ui.tooltips'",
        "displayName": "Tooltips",
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>This component provides styles and a demo for the <a href=\"https://github.com/angular-ui/bootstrap/tree/master/src/tabs\">the Angular-UI Bootstrap Tooltip plugin</a>, which is included as a dependency for Encore-UI.</p>\n\n<p>Note that the <code>tooltip</code> directive and its optional attributes can <em>only</em> be applied to raw HTML elements. They can't be applied to directives like this: <code>&lt;rx-button tooltip=\"...\"&gt;</code></p>\n\n<p>If you're creating your own custom directive, it's fine to use the <code>tooltip</code> directive inside of your directive's template.</p>\n\n<h2>Usage</h2>\n\n<p>Usage is the exact same as demoed on the Angular-UI Bootstrap site. See <a href=\"http://angular-ui.github.io/bootstrap/\">the Angular-UI Bootstrap Docs</a> for further guidance on usage and configuration of this component.</p>",
            "js": "/* jshint unused:false */\nfunction tooltipsCtrl ($scope) {\n    $scope.dynamicTooltip = 'I was defined in the controller!';\n}\n",
            "html": "<div ng-controller=\"tooltipsCtrl\">\n    <ul>\n        <li><span tooltip=\"Right tooltip\" tooltip-placement=\"right\">Hover over me for a right-side tooltip</span></li>\n        <li><span tooltip=\"A top tooltip\" tooltip-placement=\"top\"><rx-button default-msg=\"Top tooltip\"></rx-button></span></li>\n        <li><span tooltip=\"A bottom tooltip\" tooltip-placement=\"bottom\"><rx-button default-msg=\"Bottom tooltip\"></rx-button></span></li>\n        <li><span tooltip=\"{{dynamicTooltip}}\"><rx-button default-msg=\"Hover to see text coming from the controller\"></rx-button></span></li>\n        <li><span tooltip-html-unsafe=\"<span class='tooltip-header'>A Tooltip Title</span><p>You can use HTML</p>\"><span>Hover over this text to see HTML in a tooltip</span></li>\n    </ul>\n</div>\n"
        }
    },
    {
        "name": "typeahead",
        "moduleName": "'encore.ui.typeahead'",
        "displayName": "Typeahead",
        "srcFiles": [],
        "tplFiles": [],
        "tplJsFiles": [],
        "dependencies": [],
        "docs": {
            "md": "<p><a href=\"http://github.com/badges/stability-badges\"><img src=\"http://badges.github.io/stability-badges/dist/unstable.svg\" alt=\"unstable\" title=\"\" /></a></p>\n\n<p>This component provides styles and a demo for the <a href=\"https://github.com/angular-ui/bootstrap/tree/master/src/typeahead\">the Angular-UI Bootstrap Typeahead plugin</a>, which is included as a dependency for Encore-UI.</p>\n\n<h2>Usage</h2>\n\n<p>Usage is the exact same as demoed on the Angular-UI Bootstrap site. See <a href=\"http://angular-ui.github.io/bootstrap/\">the Angular-UI Bootstrap Docs</a> for further guidance on usage and configuration of this component.</p>",
            "js": "/*jshint unused:false*/\nfunction typeaheadCtrl ($scope) {\n    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',\n        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',\n        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',\n        'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',\n        'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Republic of Dawood',\n        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',\n        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];\n}\n",
            "html": "<div ng-controller=\"typeaheadCtrl\">\n    <rx-form-item label=\"States\">\n        <input type=\"text\" ng-model=\"selected\" typeahead=\"state for state in states | filter:$viewValue | limitTo:8\" class=\"form-input\" id=\"typeahead\">\n    </rx-form-item>\n</div>"
        }
    }
]);