// list of files / patterns to load in the browser
var files = [
    // bower:js
    'demo/bower_components/angular/angular.js',
    'demo/bower_components/angular-sanitize/angular-sanitize.js',
    'demo/bower_components/angular-resource/angular-resource.js',
    'demo/bower_components/angular-route/angular-route.js',
    'demo/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'demo/bower_components/lodash/dist/lodash.compat.js',
    'demo/bower_components/momentjs/moment.js',
    'demo/bower_components/html2canvas/build/html2canvas.js',
    'demo/bower_components/mousetrap/mousetrap.js',
    'demo/bower_components/angular-hotkeys/build/hotkeys.min.js',
    'demo/bower_components/angular-mocks/angular-mocks.js',
    // endbower
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
                '<%= config.dist %>/<%= config.fileNameTpl %>.min.js'
            ])
        },
        singleRun: true,
        reporters: ['progress']
    }
};
