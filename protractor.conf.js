/*jshint node:true */

var config = {
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9001',

    specs: [
        './src/**/*.midway.js'
    ],

    framework: 'mocha',

    multiCapabilities: [{
        browserName: 'firefox',
        shardTestFiles: true,
        count: 3
    }],

    splitTestsBetweenCapabilities: true,

    allScriptsTimeout: 30000,

    // Options to be passed to mocha
    mochaOpts: {
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;