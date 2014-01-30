var path = require('path');

/* jshint node:true */
module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        // frameworks to use
        frameworks: ['mocha', 'chai', 'sinon-chai'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/lodash/dist/lodash.js',
            'src/*/*.js',
            'utils/browser-helpers.js',
            'src/*/templates/*.html'
        ],

        // list of files to exclude
        exclude: [
        ],

        preprocessors: {
            'src/*/templates/*.html': 'ng-html2js',
            'src/*/!(*.spec).js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            // or define a custom transform function
            cacheIdFromPath: function (filepath) {
                // convert src to array
                var templatePath = filepath.split(path.sep);

                // remove the first two directories ('src/*/')
                templatePath.shift();
                templatePath.shift();

                return templatePath.join(path.sep);
            },
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: './coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        //  config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

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
