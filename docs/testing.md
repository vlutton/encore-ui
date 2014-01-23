# Testing

Goal: Ability to deliver features *quickly* to production with high *reliability* and *quality*

In order to support continuous development/integration, taking advantage of automated testing is a must. While the goal of automated testing is to provide full coverage, it also needs to be seemlessly integrated into the developer environment.

## Test Levels

### Component Testing
 - Code level tests
 - Stored in same location as code (separate file with *.spec.js)
 - Best for testing services, classes and objects
 - Does contain "functional" tests (can test browser interactions like 'click')
 - Sandboxed & Isolated testing
 - Mocking & Stubbing required
 - Fast
 - Uses [Karma](http://karma-runner.github.io) + [Mocha](http://visionmedia.github.io/mocha/) + [Chai](http://chaijs.com/) + [Sinon](http://sinonjs.org/)
 - Think of it as testing the building blocks of an application, but not the application itself

### Midway Testing
 - Page level tests
 - Can access all parts of an application
 - Uses [stub.by](https://github.com/mrak/stubby4node) for mocking the API server responses
 - Uses [Selenium](https://code.google.com/p/selenium/wiki/WebDriverJs), [Protractor](https://github.com/angular/protractor/), [Astrolabe](https://github.com/stuplum/astrolabe)
 - Somewhat slow
 - Story Based

## Test Variants

### Smoke Tests

Goal: Validate mission critical functionality before running entire test suite

### Regression Tests

Goal: Test that all existing components work as expected


## Configuration Files

More details on these files are found in the files themselves

**karma.conf.js** - Used by our component tests

**protractor.conf.js** - Used by our midway/E2E tests

## Running Tests

Testing is setup to run through the `grunt test` command. Running this should execute the entire suite of tests (component/midway/e2e).

### Component Tests (aka unit tests)

Goal: Tests smallest piece of functionality or method

Use `grunt test:unit` to run these tests apart from running midway/e2e tests

When you're making a lot of unit test related changes, it's faster to leave PhantomJS running (rather than spinning up a new instance every time). Use the following command to have grunt 'watch' your files:

`grunt test:dev`

### Testing Individual Components

When developing a specific component, you likely don't want to run the entire test suite on every change. In order to test a single set of functionality, use the 'only' function when describing your test. For example:

`describe.only('Login', function () { ... tests go here ... })`

**Be sure to remove the `only` once you're done.**

#### Full Browser Regression

By default, unit tests are only executed against PhantomJS. In order to test across Firefox, Chrome, Chrome Canary and Safari, run `grunt karma:full` (note 'karma', not 'test'). **Make sure you have all 4 browsers installed first**.

#### Code Coverage

Code coverage stats for our component tests are generated every time the test suite is executed. To view the stats, simply open the index.html file in any of the browser directories in the 'coverage' directory.


### Page Object Model

For both Midway and E2E tests, we use a Page Object library called [Astrolabe](https://github.com/stuplum/astrolabe).


### Midway Tests

Goal: Validate our appplication in isolation from its dependencies (e.g. API Server)

In order to run the midway test suite, you will need a selenium server running. To install and run selenium, see [Selenium setup with remote drivers](http://docs.seleniumhq.org/docs/03_webdriver.jsp#running-standalone-selenium-server-for-use-with-remotedrivers).

Server mocks are done using Stub.by. Server stubs are stored in the test/api-mocks folder.

To run tests, enter `grunt test:mid` in a terminal. You need to enusure that you already have a development server running. Do this with

    grunt server:stubbed:watch

in order to correctly run the midway tests. You will need to keep this running in the background, so open a new terminal after running this command.

#### Testing Individual Pages

When developing a specific page, it's much quicker to run tests only for that page (rather than run the entire suite every time). In order to limit the tests to just that page, pass in path to the file to test as the third option in your grunt command. For example:

`grunt test:mid:test/midway/cloudDetailPage.js`

### E2E Tests

Goal: Validate our app & all dependencies work in correlation as expected
