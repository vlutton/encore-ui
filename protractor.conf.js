/*jshint node:true */

var config = {
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9001',

    specs: [
        './src/**/*.midway.js'
    ],

    framework: 'mocha',

    capabilities: {
        browserName: 'firefox'
    },

    allScriptsTimeout: 30000,

    onPrepare: function () {
        expect = require('chai').use(require('chai-as-promised')).expect;
    },

    // Options to be passed to mocha
    mochaOpts: {
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;
