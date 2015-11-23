var path = require('path');

/* jshint node:true */
module.exports = function (config) {
    config.set({
        // frameworks to use
        frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-as-promised'],

        // list of files to exclude
        exclude: [
            'src/**/*.page.js',
            'src/**/*.exercise.js'
        ],

        preprocessors: {
            'src/**/*.html': 'ng-html2js',
            'src/**/scripts/!(*.spec).js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            // or define a custom transform function
            cacheIdFromPath: function (filepath) {
                return filepath.split(path.sep) // convert src to array
                    .slice(3) // remove first three directories (src/:category/:module)
                    .join(path.sep); // convert back to path string
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'coverage/'
                }, {
                    type: 'lcov',
                    dir: 'coverage/'
                }
            ]
        },

        // web server port
        port: 9877,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        //  config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
