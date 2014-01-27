module.exports = {
    scripts: {
        files: ['src/**/*.js', '!src/*/*.spec.js'],
        tasks: ['jshint:scripts', 'after-test', 'karma:watch:run'],
        options: {
            livereload: true
        }
    },
    specs: {
        files: ['src/**/*.spec.js'],
        tasks: ['jshint:specs', 'karma:watch:run'],
        options: {
            livereload: false
        }
    },
    css: {
        files: ['src/**/*.less'],
        tasks: ['less'],
        options: {
            livereload: true
        }
    },
    html: {
        files: ['src/**/*.html'],
        tasks: ['after-test'],
        options: {
            livereload: true
        }
    }
};