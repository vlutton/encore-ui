<a name="0.10.5"></a>
### 0.10.5 (2014-05-23)


#### Bug Fixes

* **rxModalAction:** Moved template inside test, rephrased test msg ([f1aa9297](git@github.com:rackerlabs/encore-ui/commit/f1aa92978bace7fcec95e08c54785df6711f7bbb))
* **rxUnauthorizedInterceptor:** Logout users on 401 ([84ea1ba9](git@github.com:rackerlabs/encore-ui/commit/84ea1ba9097e48c696624d1fd28854e50dc5780b))


#### Features

* **rxModalAction:**
  * Unit Test for overriding controller ([13eff992](git@github.com:rackerlabs/encore-ui/commit/13eff992ce3795d3d05c642b09eb0635a784ceab))
  * Ability to override ui.bootstrap modal config ([57d05261](git@github.com:rackerlabs/encore-ui/commit/57d05261244ed4bae83efa45997ebe2b34310907))
* **rxToggle:** closes #160; component for property toggling ([5a3bf5aa](git@github.com:rackerlabs/encore-ui/commit/5a3bf5aa9726db87a7db703b3a71779457e8b258))


<a name="0.10.4"></a>
### 0.10.4 (2014-05-20)


#### Bug Fixes

* **test:** simplified rxApp isCollapsible ([979049c2](git@github.com:rackerlabs/encore-ui/commit/979049c29822e67f96e6630518e48987718dc560))


#### Features

* **rxNotify:** resolves #259; allow loading msg to be optional ([6eb25c1c](git@github.com:rackerlabs/encore-ui/commit/6eb25c1c80e2e8f136e79806b21b647c36f65ea7))
* **rxTypeahead:** new component based on angular-ui ([b0d23592](git@github.com:rackerlabs/encore-ui/commit/b0d23592c061f371f4cfd3a999b36554020153da))


<a name="0.10.3"></a>
### 0.10.3 (2014-05-19)


<a name="0.10.2"></a>
### 0.10.2 (2014-05-16)


#### Features

* **rxApp:** Updated account search to include names and ids ([0e0bdfe0](git@github.com:rackerlabs/encore-ui/commit/0e0bdfe09fde181e8e34e8f677956018d98ccf19))


<a name="0.10.1"></a>
### 0.10.1 (2014-05-16)


#### Bug Fixes

* **rxApp:**
  * set nav in run function ([1611dbf2](git@github.com:rackerlabs/encore-ui/commit/1611dbf2c94005dbe5892191304ec1904991e6b9))
  * set nav in run function ([3f23bb0c](git@github.com:rackerlabs/encore-ui/commit/3f23bb0c1c5dfaa7b894d67cc609b5b8d8009c1a))


#### Features

* **rxModalAction:** added close `x` to top right ([762ec945](git@github.com:rackerlabs/encore-ui/commit/762ec9454e879519a15becfcfe1f25fffe1408a4))
* **styles:** added modal transition; style cleanup; ([3e24c655](git@github.com:rackerlabs/encore-ui/commit/3e24c6550e7e696fa2762e90767e25e1be7ff46f))


<a name="0.10.0"></a>
## 0.10.0 (2014-05-14)


#### Bug Fixes

* **rxApp:**
  * #251 page title popup ([4709f81e](git@github.com:rackerlabs/encore-ui/commit/4709f81e31f0a9ea3e8086870a3339c9bdf36f16))
  * use replace so that title attribute is removed (#251) ([159de394](git@github.com:rackerlabs/encore-ui/commit/159de39401a4de193df4e72f0c51aed1196bdb40))
* **rxModalForm:** #256 prevent title popup ([6208f339](git@github.com:rackerlabs/encore-ui/commit/6208f339112673beb570708fab21a7b817096266))
* **rxSortableColumn:** user proper ID to pass function to scope ([894805c9](git@github.com:rackerlabs/encore-ui/commit/894805c9ec9be3af24e5d55399dede92aba111e8))


#### Features

* **addNetworks:** Add Networks item to Cloud menu ([62ce8a19](git@github.com:rackerlabs/encore-ui/commit/62ce8a19e34d0d085b557c70dc5b74a7464babea))
* **rxApp:** updated design of collapse button ([99d4909f](git@github.com:rackerlabs/encore-ui/commit/99d4909fc0729a717ab109bef898183c630b39fc))
* **rxForm:** added new rx-form-fieldset directive ([d87880be](git@github.com:rackerlabs/encore-ui/commit/d87880be47b2f01843486456255b4d185b86bcb8))


#### Breaking Changes

* The sortMethod of rxSortableColumn was not properly
passing the method to the `scope` with a `&`, but was using a `=`, which
should only be used for two-way bindings.

To migrate the code, follow the example below:

BEFORE:

<rx-sortable-column
    sort-method="sortCol"
    sort-property="name"
    predicate="sort.predicate"
    reverse="sort.reverse">

AFTER:

<rx-sortable-column
    sort-method="sortCol(property)"
    sort-property="name"
    predicate="sort.predicate"
    reverse="sort.reverse">

The method you pass will *always* take `property` as the argument
when assigning it to `sort-method`.

tl;dr: Change every `sort-method="foo"` assignment to
`sort-method="foo(property)"`
 ([894805c9](git@github.com:rackerlabs/encore-ui/commit/894805c9ec9be3af24e5d55399dede92aba111e8))


<a name="0.9.2"></a>
### 0.9.2 (2014-05-13)


#### Bug Fixes

* **rxApp:**
  * Removed unused scope variable in rxAtlasSearch ([168f5d5c](git@github.com:rackerlabs/encore-ui/commit/168f5d5c302ffedacfa5c9e5a2353f923663afee))
  * Fixed merge conflict in menu ([0cbb82d8](git@github.com:rackerlabs/encore-ui/commit/0cbb82d8a3c37d75cfe380b062f34062859307d4))
  * Removed unused variable ([585224da](git@github.com:rackerlabs/encore-ui/commit/585224da376d573007bf9498c56809ce75722cc0))
  * Fixed jshint errors with formatting ([ce9d80c4](git@github.com:rackerlabs/encore-ui/commit/ce9d80c4965da1052ac478c91e35d9081d11e062))
  * Per discussion, updated menu to be more intuitive ([e3cf42a4](git@github.com:rackerlabs/encore-ui/commit/e3cf42a475b4302d28a7134c5de2b9742c78ebf4))
  * Search field will not redirect without value ([ff87afff](git@github.com:rackerlabs/encore-ui/commit/ff87afff6677f75836d6b1d3316fe49491fab474))
  * Search field will not redirect without value ([1fe9a78e](git@github.com:rackerlabs/encore-ui/commit/1fe9a78edf64f5a657a96538a366b696f45eb42a))
  * Fixed jscs errors in rxApp ([09aa7114](git@github.com:rackerlabs/encore-ui/commit/09aa7114859f86a198b76b08e875681a5498e423))
  * Fixed jscs errors in rxApp ([161dcd76](git@github.com:rackerlabs/encore-ui/commit/161dcd76d9344e5e5687f1334b9e83de03092e62))
* **rxSortableColumn:** Typo in the visibility expression ([29715292](git@github.com:rackerlabs/encore-ui/commit/29715292355a3001291767510fab533ddfc87f9d))


#### Features

* **rxApp:** Added US only account search to rxApp. ([1cd7ff7f](git@github.com:rackerlabs/encore-ui/commit/1cd7ff7f25186c5d6259d0ab6554f17b272a9d2a))


<a name="0.9.1"></a>
### 0.9.1 (2014-05-12)


#### Features

* **rxAge:** Added the ability to adjust verbosity ([3264c877](git@github.com:rackerlabs/encore-ui/commit/3264c877e041d181c43f2d34d5e69f2260166b14))


<a name="0.9.0"></a>
## 0.9.0 (2014-05-08)


#### Bug Fixes

* **rxNotify:** change error icon to avoid UX issue ([11facc8f](git@github.com:rackerlabs/encore-ui/commit/11facc8f804b92f0752abf3dcd8a89728d31b8fa))
* **rxUnauthorizedInterceptor:** Redirect back to originator ([61fe1a30](git@github.com:rackerlabs/encore-ui/commit/61fe1a30c29e967b30444f56ac8422c01d568b3a))


#### Features

* **rxApp:**
  * switch rxAppRoutes to service ([1c29cf73](git@github.com:rackerlabs/encore-ui/commit/1c29cf735f63eb1880d457cf1d1861a41ef7a35a))
  * expose appRoutes via rootScope ([800f225b](git@github.com:rackerlabs/encore-ui/commit/800f225b74bf479bfd68442a794b1aaf016c3e6f))


#### Breaking Changes

* Creation and editing of menus for rxApp has undergone major changes. See [PR #223](https://github.com/rackerlabs/encore-ui/pull/233) for details
 ([800f225b](git@github.com:rackerlabs/encore-ui/commit/800f225b74bf479bfd68442a794b1aaf016c3e6f))


<a name="0.8.4"></a>
### 0.8.4 (2014-05-07)


#### Bug Fixes

* **rxSession:**
  * Updates per feedback and added unit test ([96d7ef9e](git@github.com:rackerlabs/encore-ui/commit/96d7ef9ea4091fcb222bfb51a340b30d99c8cb3d))
  * Updated assignment per feedback on PR ([aa8bc09e](git@github.com:rackerlabs/encore-ui/commit/aa8bc09ee8a88f7aa3ca3813cb5107838f44c882))
  * renamed variable per feedback ([51311b39](git@github.com:rackerlabs/encore-ui/commit/51311b3918f8e9ada8b036f8526eb08042ff47b0))


#### Features

* **demo:** move to single-component view ([f322da44](git@github.com:rackerlabs/encore-ui/commit/f322da44ada5b968b53a9e96abc1154dfa46e36a))
* **rxSession:** Added features to get user info ([14707fc7](git@github.com:rackerlabs/encore-ui/commit/14707fc795c49a5c52f072e24dfea5dc489382a4))


<a name="0.8.3"></a>
### 0.8.3 (2014-05-05)


#### Bug Fixes

* **rxLogout:** Added redirect to /login on logoff ([6833c1fb](git@github.com:rackerlabs/encore-ui/commit/6833c1fb3588577a2f872547ff7ac7282bdcc993))


#### Features

* **rxApp:** added getIndexByKey and setRouteByKey functions ([6c4ab327](git@github.com:rackerlabs/encore-ui/commit/6c4ab3276e25d047ac5efd0df8ff653e0deb4144))
* **rxFormOptionTable:** Add required attribute ([646e8755](git@github.com:rackerlabs/encore-ui/commit/646e8755c4eb1922a3d09334a2d7a41477452022))


<a name="0.8.2"></a>
### 0.8.2 (2014-05-02)


#### Bug Fixes

* **rxApp:** add Roboto font back in ([a5359632](git@github.com:rackerlabs/encore-ui/commit/a5359632d018e2f0548b789da247f390b57ee1e7))


<a name="0.8.1"></a>
### 0.8.1 (2014-05-01)


#### Bug Fixes

* **rxEnvironment:** issue 185; gracefully fail environment undefined; ([643ba7da](git@github.com:rackerlabs/encore-ui/commit/643ba7dac7e7b2d7055fc097aa85324a99f1bd92))


<a name="0.8.0"></a>
## 0.8.0 (2014-04-29)


#### Bug Fixes

* **rxIdentity:** Updated proxy to point to /api/identity ([7cdd1d39](git@github.com:rackerlabs/encore-ui/commit/7cdd1d39a0e6e5b64cc791ef7a5631197fb1326e))
* **rxPermission:** Fixed test which referenced refactored method ([0af5ee3b](git@github.com:rackerlabs/encore-ui/commit/0af5ee3b5f4dc9fffa6f2c6476fc849d528e3807))
* **rxSession:** Renamed method to logout to work with rxApp ([e2d1dfd4](git@github.com:rackerlabs/encore-ui/commit/e2d1dfd49d63f7653c1a6041bb2d44cf63127b77))
* **rxTokenInterceptor:** Adding return statement for the config ([fe2cea21](git@github.com:rackerlabs/encore-ui/commit/fe2cea21298df84f619c58cd546b44d088ca06e8))


#### Features

* **rxEnvironement:** added new "unified" environment ([17bed908](git@github.com:rackerlabs/encore-ui/commit/17bed908810e416bba883137769f4939c45ed986))


#### Breaking Changes

* Session.logoff() changed to Session.logout()
 ([0af5ee3b](git@github.com:rackerlabs/encore-ui/commit/0af5ee3b5f4dc9fffa6f2c6476fc849d528e3807))


<a name="0.7.8"></a>
### 0.7.8 (2014-04-28)


#### Bug Fixes

* **rxApp:** Made URL isActive work with Query Strings ([78eeaa7d](git@github.com:rackerlabs/encore-ui/commit/78eeaa7d7868d8ac827d61b159258922fa17de14))


<a name="0.7.7"></a>
### 0.7.7 (2014-04-25)


#### Bug Fixes

* **rxApp:**
  * changed TQ nav ([9b3763b6](git@github.com:rackerlabs/encore-ui/commit/9b3763b6927763b4e413a6adbd82e36670765e10))
  * added clear classes to demo pages ([f554dc05](git@github.com:rackerlabs/encore-ui/commit/f554dc05150558668820879a4444c2c2b5dd5e48))


#### Features

* **rxApp:** added rxTicketSearch; clear classes; LBaaS; ([6dd3f711](git@github.com:rackerlabs/encore-ui/commit/6dd3f7119f263e5b2a2c87e36fc6e048ba79df67))
* **rxTokenInjector:** Simple $http injectors for auth and api calls. ([46b9d3c9](git@github.com:rackerlabs/encore-ui/commit/46b9d3c90fe199ded69f349494dedaf749f5de6e))


<a name="0.7.6"></a>
### 0.7.6 (2014-04-25)


#### Bug Fixes

* **rxApp:** changed rxAccountSearch to rxAtlasSearch ([a95733f2](git@github.com:rackerlabs/encore-ui/commit/a95733f28ad9c77591bc6af0e5c8d629efe80225))


#### Features

* **rxAppSearch:** new directive to add search to nav item ([e3612593](git@github.com:rackerlabs/encore-ui/commit/e3612593c1bba2ce4e38e822db4535d42601e251))


<a name="0.7.5"></a>
### 0.7.5 (2014-04-23)


#### Features

* **styles:** pulling over a couple of styles from cloud atlas ([34628102](git@github.com:rackerlabs/encore-ui/commit/3462810268a3d26ceb8a49af04f98b1a0188b053))


<a name="0.7.4"></a>
### 0.7.4 (2014-04-23)


#### Bug Fixes

* **rxApp:** #177 app routes not updating ([96af6a2d](git@github.com:rackerlabs/encore-ui/commit/96af6a2d94d7ef151ba3e52318c5560109464c32))


<a name="0.7.3"></a>
### 0.7.3 (2014-04-23)


<a name="0.7.2"></a>
### 0.7.2 (2014-04-22)


#### Bug Fixes

* **rxNav:** Ticket Queues Link was old Style ([5ccc3615](git@github.com:rackerlabs/encore-ui/commit/5ccc36153ca804419ffe725cadd7768fbab67ea0))


#### Features

* **rxApp:** added childHeader functionality to nav ([fec649ee](git@github.com:rackerlabs/encore-ui/commit/fec649ee5ef148673414514f4443931cf7ce73a3))


<a name="0.7.1"></a>
### 0.7.1 (2014-04-22)


#### Features

* **rxProductResources:** Add load balancers ([89fd26d4](git@github.com:rackerlabs/encore-ui/commit/89fd26d44516c7a0039a5a7a4881ad96056c488c))


<a name="0.7.0"></a>
## 0.7.0 (2014-04-21)


#### Bug Fixes

* **rxApp:**
  * fix some styling/nav in cloud atlas ([a2bd8c40](git@github.com:rackerlabs/encore-ui/commit/a2bd8c40a04af6008ea8f06f0d83819b1bb44ed3))
  * fixed paths for cloud atlas ([e0205840](git@github.com:rackerlabs/encore-ui/commit/e02058403b021e9434b08cc0ad2ce5e5fa868dbe))
* **rxAppNavItem:** catches links not defined in buildUrl ([196c515a](git@github.com:rackerlabs/encore-ui/commit/196c515a48861730c1b2341c9194ee6755fc7b7d))
* **rxModalAction:** close modal on route change #157 ([db7e0fe2](git@github.com:rackerlabs/encore-ui/commit/db7e0fe2dfb39b7ef22bef06b80558b91af53b6f))


#### Features

* **rxApp:**
  * bundle normalize.css in encore-ui.css; issue #165 ([465f00b1](git@github.com:rackerlabs/encore-ui/commit/465f00b16fceb1aeca9b1f75754e0591cb7773ff))
  * added rxnotifications and page-actions ([f30bf430](git@github.com:rackerlabs/encore-ui/commit/f30bf4300786acfa0348a48781743245bc8be660))
  * allow expand/collapse of child menus ([7b7c3502](git@github.com:rackerlabs/encore-ui/commit/7b7c35025351c1844486f6b12aed66014ab02141))


<a name="0.6.3"></a>
### 0.6.3 (2014-04-17)


<a name="0.6.2"></a>
### 0.6.2 (2014-04-17)


<a name="0.6.1"></a>
### 0.6.1 (2014-04-17)


#### Features

* **rxApp:** Add in Collapsible Flag for rxApp ([91d666d5](git@github.com:rackerlabs/encore-ui/commit/91d666d593c4af71224b75dff4215f2ca0aa8fe1))


<a name="0.6.0"></a>
## 0.6.0 (2014-04-16)


#### Bug Fixes

* **rxModalAction:** no longer destroys scope.fields on modal submit ([141f15b2](git@github.com:rackerlabs/encore-ui/commit/141f15b2d2d47ba3a94c92d3d6962eafc0e38eb9))


#### Breaking Changes

* 'fields' property no longer checks if scope.fields is already defined.
If you're defining 'fields' information inside the modal pre-hook, everything should work as normal
If you're defining it before the pre-hook (on page load), this will break. You will need to move that definition into a pre-hook function
 ([141f15b2](git@github.com:rackerlabs/encore-ui/commit/141f15b2d2d47ba3a94c92d3d6962eafc0e38eb9))


<a name="0.5.4"></a>
### 0.5.4 (2014-04-16)


#### Features

* **rxApp:** allow child nav to have visibility rules ([642f5d83](git@github.com:rackerlabs/encore-ui/commit/642f5d8341684df832a38dac9cf389de98a76198))


<a name="0.5.3"></a>
### 0.5.3 (2014-04-14)


#### Bug Fixes

* **rxApp:** Default Links for Ticket Queues were wrong ([7a047534](git@github.com:rackerlabs/encore-ui/commit/7a0475343dbd02645771f3d67126861d82f2dfc8))
* **rxEnvironment:**
  * remove more unused stuff ([dfbe29c1](git@github.com:rackerlabs/encore-ui/commit/dfbe29c1fb1e02282662a5d5825fb4dacee5d62c))
  * removed some unused functionality ([7218d71f](git@github.com:rackerlabs/encore-ui/commit/7218d71fee4faf83d1f444e9f25028e0caad9049))


#### Breaking Changes

* Environment.set() and $rootScope.environment removed
 ([7218d71f](git@github.com:rackerlabs/encore-ui/commit/7218d71fee4faf83d1f444e9f25028e0caad9049))


<a name="0.5.2"></a>
### 0.5.2 (2014-04-09)


#### Bug Fixes

* **rxEnvironment:** fix url bug; added rxEnvironmentMatch ([3cd8323c](git@github.com:rackerlabs/encore-ui/commit/3cd8323c5bd46bdf5d86f23efe7fc761b86e8355))


#### Features

* **rxApp:**
  * allow setting visibility rules for nav items ([8272e1af](git@github.com:rackerlabs/encore-ui/commit/8272e1af2e757621cb9951234ca8bec05231047e))
  * allows rxEnvironmentUrl w/paths ([51a65cc4](git@github.com:rackerlabs/encore-ui/commit/51a65cc47be923bb4cc3df90e0a1655aa0e7268b))
* **rxCompile:** compile expressions inside expressions ([16df3e76](git@github.com:rackerlabs/encore-ui/commit/16df3e76f40fcde69aa53ba5511577d8a32ede08))


<a name="0.5.1"></a>
### 0.5.1 (2014-04-04)


#### Features

* **rxProductResources:** add dbaas link to non-prod ([b86ec9a1](git@github.com:rackerlabs/encore-ui/commit/b86ec9a1b292a6305804f6df079975611f844648))


<a name="0.5.0"></a>
## 0.5.0 (2014-04-02)


#### Features

* **rxApp:** new component that handles common page layout and menu ([2197d52f](git@github.com:rackerlabs/encore-ui/commit/2197d52ff21e2db66c04fb81f7d442273cd49d08))
* **rxEnvironment:** environment based logic (e.g. prod, dev) ([c8693113](git@github.com:rackerlabs/encore-ui/commit/c8693113493d2a4ff9cdca6a195f318c72f022c2))


<a name="0.4.1"></a>
### 0.4.1 (2014-04-01)


#### Features

* **rxNotifications:**
  * Added rx-notifications directive ([f6ff97a2](git@github.com:rackerlabs/encore-ui/commit/f6ff97a2fe0e0fd228dfa9753eb8f677bfb50879))
  * Added rx-notifications directive ([b17c4ced](git@github.com:rackerlabs/encore-ui/commit/b17c4cedef99283291d8cba6ac3aea7a68b03bb6))


<a name="0.4.0"></a>
## 0.4.0 (2014-03-31)


#### Features

* **rxAttributes:** allowsconditional addition of attributes ([7b04aa47](git@github.com:rackerlabs/encore-ui/commit/7b04aa4783ad73cfb160a2f82d1d5dd7bd7777e5))
* **rxAuth:** Wrapper service which provides auth capabilities ([d1ba3d1b](git@github.com:rackerlabs/encore-ui/commit/d1ba3d1bdcd5531f898beaa8500d37d8b9c13890))


#### Breaking Changes

* change to rxFormOptionTable affects checkboxes

    The default for a checkboxes 'checked' model state has changed from `'true'` to `true`.
    If you're setting a default state, you'll need to update the value ([7b04aa47](git@github.com:rackerlabs/encore-ui/commit/7b04aa4783ad73cfb160a2f82d1d5dd7bd7777e5))


<a name="0.3.8"></a>
### 0.3.8 (2014-03-27)


#### Bug Fixes

* **rxBreadcrumbs:** home should go to root of website ([7ecdaec3](git@github.com:rackerlabs/encore-ui/commit/7ecdaec3ec8d8893c8a11a76481961be397e3efe))


<a name="0.3.7"></a>
### 0.3.7 (2014-03-26)


#### Bug Fixes

* **rxProductResources:** removed # from href for HTML5 mode ([79fdd7f8](git@github.com:rackerlabs/encore-ui/commit/79fdd7f8a577500f3bdfe28b58291754fafd9edb))


#### Features

* **rxPermission:** Service and directive for permissions ([92fb82a3](git@github.com:rackerlabs/encore-ui/commit/92fb82a3796b1d99a4caa15c08df35eaf782f19a))


<a name="0.3.6"></a>
### 0.3.6 (2014-03-26)


#### Features

* **rxFormOptionTable:** Allow expressions in keys. Give the ability for keys to be expression and to eve ([518b266a](git@github.com:rackerlabs/encore-ui/commit/518b266af8fdf686dc9239226de717794b136ed3))


<a name="0.3.5"></a>
### 0.3.5 (2014-03-25)


#### Features

* **rxSession:** Simple service for managing user session. ([52fa1c1a](git@github.com:rackerlabs/encore-ui/commit/52fa1c1adf88aad4ba8e3756317d6fda96ac8bd9))


<a name="0.3.4"></a>
### 0.3.4 (2014-03-21)


#### Bug Fixes

* **rxFormOptionTable:** fix issues 94 and 95 ([83d6bf92](git@github.com:rackerlabs/encore-ui/commit/83d6bf924eb70dfa2a61435768b5d107705a48f7))


#### Features

* **rxFormOptionTable:** allow setting true/false-value for checkbox ([bdb0d410](git@github.com:rackerlabs/encore-ui/commit/bdb0d4107ccb42e01efb73ccd82dd89193ba10a2))


<a name="0.3.3"></a>
### 0.3.3 (2014-03-21)


#### Features

* **rxIdentity:** Auth service for Rackspace Identity API ([34f3b0e8](git@github.com:rackerlabs/encore-ui/commit/34f3b0e8444fc8bb0d0623e6be9034df0a745573))
* **rxLocalStorage:** Implemented local storage injectable service ([84df46e4](git@github.com:rackerlabs/encore-ui/commit/84df46e48a056e49c1b0f53383d90d9b96c0e10d))


<a name="0.3.2"></a>
### 0.3.2 (2014-03-19)


#### Bug Fixes

* **rxBreadcrumbs:** change default hash in path URIs ([085a0044](git@github.com:rackerlabs/encore-ui/commit/085a00444d5b09703df4f8ed660793a45e1bb251))


#### Features

* **rxNav:** allow custom links and logo ([e139497b](git@github.com:rackerlabs/encore-ui/commit/e139497ba45026d59d518be0c5e043659a6adc4b))
* **rxSessionStorage:** Simple wrapper for sessionStorage object ([ed0bff0c](git@github.com:rackerlabs/encore-ui/commit/ed0bff0c8e8fd8f8d5247b6650876db6899b87a2))


<a name="0.3.1"></a>
### 0.3.1 (2014-03-18)


#### Bug Fixes

* **rxNotify:** Simple fix for getting rxSpinner to work on rxNotify ([65da492e](git@github.com:rackerlabs/encore-ui/commit/65da492e523dc44e3094784da897c7639cd92b7f))
* **rxProductResources:** FIX EN-623 ([5afce73e](git@github.com:rackerlabs/encore-ui/commit/5afce73eaf4b7406dd29884bbb0f04bafcbf8a54))


<a name="0.3.0"></a>
## 0.3.0 (2014-03-14)


#### Bug Fixes

* **readme:** more updates to docs based on changes ([72137b41](git@github.com:rackerlabs/encore-ui/commit/72137b416bad3cfa63afcfbe2223c3ee68e954a0))
* **rxSortUtil:** breaking tests due to not having a pager present ([c5d378f3](git@github.com:rackerlabs/encore-ui/commit/c5d378f34c6c074ebdf6e330d3e86418d2af01bb))
* **rxSpinner:** Fixed some minor display issues and added size options ([9ac8d17d](git@github.com:rackerlabs/encore-ui/commit/9ac8d17d033fc8a47626921c1df8e1df0a69df90))


#### Breaking Changes

* Path to Encore UI files has now changed

    Instead of the convention being /v0.0.0/filename.ext
    It is now filename-0.0.0.ext
    This was done to support build changes that occured (and match industry conventions)
 ([fd63960f](git@github.com:rackerlabs/encore-ui/commit/fd63960f4a4e5432e3f67d10460c14c6ade59800))


<a name="0.2.2"></a>
### 0.2.2 (2014-03-12)


#### Bug Fixes

* **grunt:** Change docs to guides in bump.js ([c0cda860](git@github.com:rackerlabs/encore-ui/commit/c0cda8600441ee8f144704a523a52f7d61e82615))
* **template:** protractor inside test suites only. ([88385b64](git@github.com:rackerlabs/encore-ui/commit/88385b64231ceb0457d9d738de9bb34182ec794b))


#### Features

* **rxButton:** Initial version of the rxButton. ([11361c67](git@github.com:rackerlabs/encore-ui/commit/11361c67211793478f45a4df13bb423278e5e1ba))


<a name="0.2.1"></a>
### 0.2.1 (2014-03-06)


#### Bug Fixes

* **grunt:**
  * gh-pages fixes (only add, commit msg) ([f003f9b8](git@github.com:rackerlabs/encore-ui/commit/f003f9b80a76b67e5e8d89117c6308ec8ff62cda))
  * updated replace task to work with new encore demo link ([ab461cf5](git@github.com:rackerlabs/encore-ui/commit/ab461cf5cd4f001133a49d2e59b73c0672f2df10))
* **rxNotify:**
  * message dismissed if scope being watched is destroyed ([fbfa4d25](git@github.com:rackerlabs/encore-ui/commit/fbfa4d25fae4f257437636519fc3fce68ece6a3b))
  * Dismiss loading messages on page change ([0947bafa](git@github.com:rackerlabs/encore-ui/commit/0947bafa67c3bb0f1226b3e572649a08bd665204))


<a name="0.2.0"></a>
## 0.2.0 (2014-03-05)


#### Features

* **demo:** demo pages now live on gh-pages branch instead of CDN ([a4ad3011](git@github.com:rackerlabs/encore-ui/commit/a4ad301194dc880c8c50af4bcfec054cc4990e79))


#### Breaking Changes

* normalize.less is no longer added by default to the encore-ui.css package.
 ([6ab470fa](git@github.com:rackerlabs/encore-ui/commit/6ab470fa56dfb7b05f2a759ecc057b717f99ca39))


<a name="0.1.0"></a>
## 0.1.0 (2014-03-04)


#### Bug Fixes

* **jscs:** Fixed jscs errors in rxPaginate.spec.js ([8e8acd37](git@github.com:rackerlabs/encore-ui/commit/8e8acd37ce50a4eb951a1b5832929f11fff4b7ef))
* **midway:** Update to new component template. ([11b766cd](git@github.com:rackerlabs/encore-ui/commit/11b766cdbfad0a59cc42d0dc7fd7738aa7de17e0))
* **rxPaginate:**
  * Removed unnecessary default value ([7fd8f8cd](git@github.com:rackerlabs/encore-ui/commit/7fd8f8cdf2cd006b455f88da9c4fca1920080a12))
  * Removed rxItemsPerPage and updated docs ([c6ddfe3e](git@github.com:rackerlabs/encore-ui/commit/c6ddfe3eb71339e0a6dbe7e063980bbf63b0c56f))
  * Updated rxPaginate based on feedback ([b7bf5074](git@github.com:rackerlabs/encore-ui/commit/b7bf5074c6b4e55c0cb7cef4913b6825206cbdae))


#### Features

* **midway:** Expose help method to page objects. ([969fec2e](git@github.com:rackerlabs/encore-ui/commit/969fec2e6b259631c3409ef56b92855a9018415b))
* **rxNotify:** added check for empty messagesgs ([5d2cfe42](git@github.com:rackerlabs/encore-ui/commit/5d2cfe420519c7f9b0cf39d8fb896908eaab1256))
* **rxPaginate:** Added the ability to override the itemsPerPage ([494738db](git@github.com:rackerlabs/encore-ui/commit/494738dba5c6e0d08eb654fe8819b4b38ccff74d))
* **rxPromiseNotifications:** handle promise messaging (API calls) ([1ac61fc1](git@github.com:rackerlabs/encore-ui/commit/1ac61fc1a5c747564adade4e56109db967f5cf9b))


<a name="0.0.5"></a>
### 0.0.5 (2014-02-26)


#### Bug Fixes

* **rxPageObjects:** added package.json and switched to `npm pack` so `npm install` now works ([483f46ab](git@github.com:rackerlabs/encore-ui/commit/483f46abb3dd84884b420714a9cd16b81d0d6702))


#### Features

* **midway:** New templates for midway tests. ([c89f9f26](git@github.com:rackerlabs/encore-ui/commit/c89f9f26ae5d378ae53edb906f77b352db9ec096))


<a name="0.0.4"></a>
### 0.0.4 (2014-02-21)


#### Bug Fixes

* **css:** removing test comment ([257989e3](git@github.com:rackerlabs/encore-ui/commit/257989e3dda9871f0e4157be6c527e3a3561354e))
* **git-hooks:** update to have git hooks actually run ([d31e77fe](git@github.com:rackerlabs/encore-ui/commit/d31e77fec46efde88874ca9bb60b4bf6031ee8b0))
* **npm:** exceptions now found in astrolabe. ([96938a1a](git@github.com:rackerlabs/encore-ui/commit/96938a1acee950211e470be1f1505e904dff9a5f))


#### Features

* **midway:** rxPaginate page objects, with tests. ([88c83ab5](git@github.com:rackerlabs/encore-ui/commit/88c83ab5aaf394b70cf44d8b34d5f1a6ebaeb838))
* **rxForm:** added field prefix; added description HTML support ([fdf33e2a](git@github.com:rackerlabs/encore-ui/commit/fdf33e2a5c2cd48a6fc1ffb68973ab1a68b7abfc))
* **rxFormInput:** new form directive; deprecated old form directives ([f2a13d2c](git@github.com:rackerlabs/encore-ui/commit/f2a13d2c645fc9eb2362745a0bd938647c753d7c))
* **rxNotify:**
  * added ability to set message to "loading" ([7dfe5571](git@github.com:rackerlabs/encore-ui/commit/7dfe557106f0420041f8d4dc899f95d01e9c0419))
  * added new component ([d50b30b8](git@github.com:rackerlabs/encore-ui/commit/d50b30b89d755534a996d9ddb00fd2ea3e7242fb))


<a name="v0.0.3"></a>
### v0.0.3 (2014-02-17)


#### Bug Fixes

* **rxNav:** add in globalSearch completion function passthrough. ([ed35429e](git@github.com:rackerlabs/encore-ui/commit/ed35429ee35c22d5845f242907acc377d8c48748))


#### Features

* **css:** now minifying css ([b639081e](git@github.com:rackerlabs/encore-ui/commit/b639081e7acbf209b244c9b0c9d6ede75b1a5b65))
* **grunt:**
  * Shipit squirrel - sword. ([e2647206](git@github.com:rackerlabs/encore-ui/commit/e2647206928d6a6b8b789c0f4088c61dd52bd42b))
  * Sample random shipit squirrels. ([9d5fa808](git@github.com:rackerlabs/encore-ui/commit/9d5fa808062a51a96d2a0e408fce4b0ab420554e))
* **js:** now minifying javascript ([c88ae8ab](git@github.com:rackerlabs/encore-ui/commit/c88ae8ab199031106168439c080ff3d86d47b973))
* **midway:** Use mocha reporting, chai matchers. ([ac1c0532](git@github.com:rackerlabs/encore-ui/commit/ac1c0532433a47873f79b9f47121fdd4787a6dc5))
* **rxProductResources:** ADD Databases and icons ([620f81ed](git@github.com:rackerlabs/encore-ui/commit/620f81ed88f5feec68b55f7ded335a7a524eedb4))
* **rxSortableColumn:** new component; added "visually hidden" class for accessibility ([db156c4e](git@github.com:rackerlabs/encore-ui/commit/db156c4e6c3e9d4823b11c07687dd9a7ed1aa651))
* **test:** now ships component page objects for app use ([218dffae](git@github.com:rackerlabs/encore-ui/commit/218dffae1de55a516632e2ccd9a85696fb9ed821))

<a name="v0.0.2"></a>
### v0.0.2 (2014-02-07)


#### Bug Fixes

* **images:** re-worked way images are added ([9d6e62fd](git@github.com:rackerlabs/encore-ui/commit/9d6e62fda0bb37140fe93593e1a82d596e771e8c))

