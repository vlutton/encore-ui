module.exports = {
    scripts: {
        files: ['src/**/*.js', '!src/*/*.spec.js'],
        tasks: ['jshint:scripts', 'after-test', 'karma:watch:run'],
        options: {
            livereload: 1337
        }
    },
    specs: {
        files: ['src/**/*.spec.js'],
        tasks: ['jshint:specs', 'karma:watch:run'],
        options: {
            livereload: false
        }
    },
    componentHtml: {
        files: ['src/**/templates/*.html'],
        tasks: ['after-test', 'karma:watch:run'],
        options: {
            livereload: 1337
        }
    },
    css: {
        files: ['src/**/*.less'],
        tasks: ['less'],
        options: {
            livereload: 1337
        }
    },
    html: {
        files: ['demo/*', 'src/**/docs/*.html', 'src/**/*.md'],
        tasks: ['after-test'],
        options: {
            livereload: 1337
        }
    }
};