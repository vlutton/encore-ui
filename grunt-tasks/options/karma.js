// list of files / patterns to load in the browser
var files = [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/momentjs/moment.js',
    'utils/browser-helpers.js'
];

module.exports = {
    options: {
        configFile: 'karma.conf.js',
        files: files.concat([
            'src/*/*.js',
            'src/*/templates/*.html'
        ])
    },
    watch: {
        background: true
    },
    single: {
        singleRun: true
    },
    minified: {
        options: {
            files: files.concat([
                'src/*/*.spec.js',
                '<%= config.dist %>/<%= config.fileName %>-tpls.min.js'
            ])
        },
        singleRun: true,
        reporters: ['progress']
    }
};