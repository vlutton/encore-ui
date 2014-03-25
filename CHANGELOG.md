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

