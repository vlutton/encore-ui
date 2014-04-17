# Testing

Goal: Ability to deliver features *quickly* to production with high *reliability* and *quality*

In order to support continuous development/integration, taking advantage of automated testing is a must. While the goal of automated testing is to provide full coverage, it also needs to be seemlessly integrated into the developer environment.

## Configuration Files

More details on these files are found in the files themselves

**karma.conf.js** - Used by our component tests

**protractor.conf.js** - Used by our midway/E2E tests

## Running Tests

### Component Tests (aka unit tests)

Unit tests automatically execute when running `grunt server`. It's best to run your tests in this fashion, as they automatically re-run on file changes.

If you wish to run them separately, use `grunt test`.

#### Testing Individual Components

When developing a specific component, you likely don't want to run the entire test suite on every change. In order to test a single set of functionality, use the 'only' function when describing your test. For example:

`describe.only('Login', function () { ... tests go here ... })`

**Be sure to remove the `only` once you're done.**

#### Code Coverage

Code coverage stats for our component tests are generated every time the test suite is executed. To view the stats, simply open the index.html file in any of the browser directories in the 'coverage' directory. **Note**: the coverage directory only exists when the server is running.

### Midway Tests

For Midway tests, we use a Page Object library called [Astrolabe](https://github.com/stuplum/astrolabe).

In order to run the midway test suite, you will need a selenium server running. To install and run selenium, see [Selenium setup with remote drivers](http://docs.seleniumhq.org/docs/03_webdriver.jsp#running-standalone-selenium-server-for-use-with-remotedrivers).

To run tests, enter `protractor protractor.conf.js` in a terminal. You need to ensure that you already have a development server running. If you haven't already, run `grunt server` in a separate tab. You will need to keep this running in the background through the entirety of the midway tests.

#### Testing Individual Components

When developing a specific components, it's much quicker to run tests only for that component (rather than run through the entire suite every time). To do this, pass in path to the file as a 'specs' option in your protractor command. For example:

`protractor protractor.conf.js --specs path/to/myFile.js`

#### Convienience Page Objects

In order to help developers more easily test their app, each component should provide a page object file for itself. This file will provide convenience methods for the tester to use when writing midway tests for their app.

The file name for this page objects follows the `componentName.page.js` convention and is included with the [Component Scaffolding](./ui-setup.md#component-scaffolding)

On build, all page object files are concatanated and tarballed into the `dist` directory. They are then published either manually or via Travis. To use these page objects, developers should include the following dependency in their `package.json` file:

    "rx-page-objects": "https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/rx-page-objects-0.6.3.tgz"

Alternatively, they can install the file using this command:

    npm install --save-dev https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/rx-page-objects-0.6.3.tgz

Once installed, the page objects can be pulled in to any midway test via:

```
var rxPageObjects = require('rxPageObjects');
var myComponentPage = rxPageObjects.myComponent;
...
expect(myComponentPage.rootElement.isDisplayed()).to.eventually.eq.true;
```

## Test Levels

### Component Testing

Goal: Tests smallest piece of functionality or method

 - Code level tests
 - Stored in same location as code (separate file with *.spec.js)
 - Best for testing services, classes and objects
 - Does contain "functional" tests (can test browser interactions like 'click')
 - Sandboxed & Isolated testing
 - Mocking & Stubbing required
 - Fast
 - Uses [Karma](http://karma-runner.github.io) + [Mocha](http://visionmedia.github.io/mocha/) + [Chai](http://chaijs.com/) + [Sinon](http://sinonjs.org/)

### Midway Testing

Goal: Validate our component in a full browser

 - Uses an example instance of the component
 - Uses [Selenium](https://code.google.com/p/selenium/wiki/WebDriverJs), [Protractor](https://github.com/angular/protractor/), [Astrolabe](https://github.com/stuplum/astrolabe)
 - Somewhat slow
 - Story Based