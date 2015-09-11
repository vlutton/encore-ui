/*jshint node:true */

var config = {
    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:9001',

    specs: [
        './utils/jsErrorCheck.midway.js'
    ],

    framework: 'mocha',

    plugins: [{
        path: 'node_modules/protractor/plugins/console',
        failOnWarning: false,
        failOnError: true
    }],

    capabilities: {
        browserName: 'chrome'
    },

    allScriptsTimeout: 30000,

    onPrepare: function () {
        expect = require('chai').use(require('chai-as-promised')).expect;
        demoPage = require('./utils/demo.page.js');
        encore = require('./utils/rx-page-objects/index');
    },

    // Options to be passed to mocha
    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;
