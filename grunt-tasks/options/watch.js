module.exports = {
    options: {
        livereload: 1337
    },
    scripts: {
        files: [
            'src/**/*.js',
            'src/**/*.meta.json',
            '!src/**/*.spec.js',
            '!src/**/*.midway.js',
            '!src/**/*.page.js',
            '!src/**/*.exercise.js'
        ],
        tasks: [
            'build',
            'karma:watch:run'
        ]
    },
    specs: {
        files: [
            'src/**/*.spec.js'
        ],
        tasks: [
            'karma:watch:run',
            'copy:coverage'
        ],
        options: {
            livereload: false
        }
    },
    componentHtml: {
        files: [
            'src/**/templates/*.html'
        ],
        tasks: [
            'html2js',
            'build',
            'karma:watch:run'
        ]
    },
    componentLess: {
        files: [
            'src/**/*.less'
        ],
        tasks: [
            'concat:tmpEncoreLess',
            'concat:tmpDemosLess',
            'concat:tmpExamplesLess',
            'less'
        ]
    },
    componentImages: {
        files: [
            'src/**/images/*'
        ],
        tasks: [
            'imagemin'
        ]
    },
    exampleMarkup: {
        files: [
            'src/**/examples/*.html'
        ],
        tasks: [
            'copy:demoExamples'
        ]
    },
    demoSite: {
        files: [
            'src/**/docs/*.html',
            'src/**/*.md',
            'demo/**/*',
            '!demo/bower_components/**/*'
        ],
        tasks: [
            'build'
        ]
    },
    rxPageObjects: {
        files: [
            'src/**/*.page.js',
            'src/**/*.exercise.js'
        ],
        tasks: [
            'concat:rxPageObjects',
            'concat:rxPageObjectsExercises',
            'jsdoc2md:rxPageObjects',
            'shell:rxPageObjectsDemoDocs'
        ]
    }
};
