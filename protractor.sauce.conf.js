/*jshint node:true */
exports.config = {
    baseUrl: 'http://localhost:9001',

    specs: [
        './src/**/*.midway.js'
    ],

    framework: 'mocha',

    allScriptsTimeout: 30000,

    // Options to be passed to mocha
    mochaOpts: {
        reporter: 'spec',
        slow: 4000,
        ui: 'bdd'
    },

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    capabilities: {
        browserName: 'firefox'
    }
};