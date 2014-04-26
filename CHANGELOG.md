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

