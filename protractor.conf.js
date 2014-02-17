/*jshint node:true */

var config = {
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9001',

    specs: [
        './src/**/*.midway.js'
    ],

    framework: 'mocha',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    allScriptsTimeout: 30000,

    // Options to be passed to mocha
    mochaOpts: {
        reporter: 'spec',
        slow: 3000,
        ui: 'bdd'
    }

};

// If we're on travis, use sauce for selenium
if (process.env.TRAVIS) {
    config.sauceUser = process.env.SAUCE_USERNAME,
    config.sauceKey = process.env.SAUCE_ACCESS_KEY,
    config.capabilities = {
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    };
} else {
    // otherwise use a local server
    config.seleniumAddress = 'http://localhost:4444/wd/hub';
}

exports.config = config;
