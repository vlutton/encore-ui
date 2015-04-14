# Testing

Goal: Ability to deliver features *quickly* to production with high *reliability* and *quality*

In order to support continuous development/integration, taking advantage of automated testing is a must. While the goal of automated testing is to provide full coverage, it also needs to be seemlessly integrated into the developer environment.

Configuration Files
-------------

More details on these files are found in the files themselves

**karma.conf.js** - Used by our component tests

**protractor.conf.js** - Used by our midway/E2E tests

**wraith/configs/config.yaml** - Used by our UI Regression Tests


Component Tests (aka unit tests)
-------------

*Goal: Tests smallest piece of functionality or method*

 - Code level tests
 - Uses [Karma](http://karma-runner.github.io) + [Mocha](http://visionmedia.github.io/mocha/) + [Chai](http://chaijs.com/) + [Sinon](http://sinonjs.org/)
 - Stored in same location as code (separate file with \*.spec.js)
 - Best for testing services, classes and objects
 - Does contain "functional" tests (can test browser interactions like 'click')
 - Sandboxed & Isolated testing
 - Mocking & Stubbing required
 - Fast

Unit tests automatically execute when running `grunt server`. It's best to run your tests in this fashion, as they automatically re-run on file changes.

If you wish to run them separately, use `grunt test`.

### Testing Individual Components

When developing a specific component, you likely don't want to run the entire test suite on every change. In order to test a single set of functionality, use the 'only' function when describing your test. For example:

`describe.only('Login', function () { ... tests go here ... })`

**Be sure to remove the `only` once you're done.**

### Code Coverage

Code coverage stats for our component tests are generated every time the test suite is executed. To view the stats, simply open the index.html file in any of the browser directories in the 'coverage' directory. **Note**: the coverage directory only exists when the server is running.


Midway Tests
-------------

*Goal: Validate our component in a full browser*

 - Uses an example instance of the component
 - Uses [Selenium](https://code.google.com/p/selenium/wiki/WebDriverJs), [Protractor](https://github.com/angular/protractor/), [Astrolabe](https://github.com/stuplum/astrolabe)
 - Somewhat slow
 - Story Based

### Running Tests

In order to run the midway test suite, you will need a selenium server running. To install and run selenium, execute the webdriver-manager. For Example:

```
./node_modules/.bin/webdriver-manager update # First time only
./node_modules/.bin/webdriver-manager start
```

To run all tests, enter `./node_modules/.bin/protractor` in a terminal. You need to ensure that you already have a development server running. If you haven't already, run `grunt server` in a separate tab. You will need to keep this running in the background through the entirety of the midway tests.

#### Testing Individual Components

When developing a specific components, it's much quicker to run tests only for that component (rather than run through the entire suite every time). To do this, pass in path to the file as a 'specs' option in your protractor command. For example:

```
./node_modules/.bin/protractor --specs=src/rxComponent/**/*.midway.js
```

### Convienience Page Objects

In order to help developers more easily test their app, each component should provide a page object file for itself. This file will provide convenience methods for the tester to use when writing midway tests for their app.

The file name for this page objects follows the `componentName.page.js` convention and is included with the [Component Scaffolding](./ui-setup.md#component-scaffolding)

On build, all page object files are concatanated and tarballed into the `dist` directory. They are then published either manually or via Travis. To use these page objects, developers should include the following dependency in their `package.json` file:

    "rx-page-objects": "rx-page-objects-1.12.1.tgz"

Alternatively, they can install the file using this command:

    npm install --save-dev rx-page-objects@1.7.1

Once installed, the page objects can be pulled in to any midway test via:

```js
var myComponent = require('rx-page-objects').myComponent;
// ...
expect(myComponent.main.rootElement.isDisplayed()).to.eventually.be.true;
```

Alternatively, you could place this helper library in the global scope of all tests. This is the recommended way. In your project's protractor config file, add this to your `onPrepare` section.


```js
onPrepare: function () {
    encore = require('rx-page-objects');
}
```

Keep in mind you'll need to register a global variable declaration in your linting file (`.jshintrc`, etc.).

### Some odd patterns in the page object source code...

In some of the page object source code, you may notice something like the following line

```js
var helperComponent = exports.rxHelper || require('../rxHelper/rxHelper.page.js').rxHelper;
```

Since the publish step of the page objects concatenates all pages together into one large zipped file, there isn't a reliable way to know if the import is happening in the "one large file", or in the `src/` directory (where UI smoke tests are run on Travis). This simply catches both cases, so that importing components can happen in either situation.

Speaking of concatenating all page object files together, the code located at the top of the [grunt concat](../grunt-tasks/options/concat.js) task includes a list of third-party node modules used throughout the page objects and exercises. When requiring a new dependency into a page object or exercise, check that list and make sure it is included! It will make sure that the `index.js` and `exercise.js` files that get published by `grunt rxPageObjects` does not have duplicate `require` calls scattered throughout it.

### Convenience Page Object Exercises

Convenience page objects exist to abstract away many of the tedious commands needed to direct a component during tests that prove high-level business functionality in your tests. However, many tests should still be run to ensure that your app's encore-ui components were "wired up" correctly. They should respond to activities that many users will exercise during normal operation. Instead of duplicating these tests in every instance of a component in your app, you can include that page object's exercise using this pattern:

```js
// assuming you've included `encore = require('rx-page-objects')` in your protractor conf's onPrepare step
describe('Home Page', function () {

    before(function () {
        loginPage.login();
        homePage.search('My Term');
    });

    it('should have a pagination component present', function () {
        expect(homePage.resultsTable.pagination.rootElement.isPresent()).to.eventually.be.true;
    });

    // you can skip many tests by simply doing this instead
    describe('search result pagination', encore.exercise.rxPaginate(homePage.resultsTable.pagination));

});
```

The above snippet would run a couple dozen basic tests, assuming there are no edge cases in your app's implementation of the pagination component. Examples of such edge cases might be having less than three pages of total pagination space, or defaulting to a very large or small number of results by default.

### Handling Edge Cases in Exercises

If you do have edge cases, many of the exercises support passing in an `options` argument, which should be documented in the [npm home page for rx-page-objects](https://www.npmjs.com/package/rx-page-objects). This allows you to specify aspects of a particular component's implementation to the exercise function, allowing it to skip certain tests that are not valid.

UI Regression Tests
-------------

*Goal: Prevent visual regressions by making it easier to compare changes*

[Wraith](https://github.com/BBC-News/wraith) is used in EncoreUI for UI regression testing. Currently, it will compare the production EncoreUI demo site with your local server.

### Installation

Wraith is a Ruby based tool. See the [Wraith installation docs](https://github.com/BBC-News/wraith#installation) for information on getting it installed.

### Running Tests

Once installed, you can run your tests through `grunt wraith`. Be sure you have a local instance of `grunt server` running.

`grunt wraith` will create a 'shots' folder which is the output of the regression test. To view the results, open `wraith/shots/gallery.html`.

There will be some small differences between your local server and production (e.g. the rxEnvironment demo run differently, as expected). It's not a requirement that there are no changes, just that there aren't any unexpected alterations.
