/*jshint node:true */

var config = {

    baseUrl: 'http://localhost:9001',

    framework: 'mocha',

    specs: [
        './utils/visual-regression/**/*.midway.js'
    ],

    capabilities: {
        browserName: 'firefox'
    },

    allScriptsTimeout: 30000,

    params: {},

    onPrepare: function () {
        expect = require('chai').use(require('chai-as-promised')).expect;
        demoPage = require('./utils/demo.page.js');
        encore = require('./utils/rx-page-objects/index');
        browser.driver.manage().window().setSize(1366, 768); // laptop
        screenshot = require('snappit-mocha-protractor');
        screenshot.configure({
            defaultResolutions: [[768, 1024], [1024, 768], // tablet
                                 [320, 568], [568, 320]]  // phone
        });
    },

    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 10000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;
