module.exports = function (grunt) {
    grunt.registerTask('phantomjs-check',
        'Check demo page for Javascript errors',
        function (standalone) {
            if (!standalone) {
                grunt.task.requires('server:testing');
            }

            var phantomjs = require('grunt-lib-phantomjs').init(grunt);
            var hasErrors = false;

            phantomjs.on('error.onError', function () {
                hasErrors = true;
                grunt.log.error('Javascript errors were present on the Demo page');
                phantomjs.halt();
            });

            phantomjs.on('console', function (msg) {
                hasErrors = true;
                grunt.log.error('Console messages were present on the Demo page: ' + msg);
                phantomjs.halt();
            });

            phantomjs.on('fail.load', function(url) {
                grunt.warn('PhantomJS unable to load URL.' + url);
                hasErrors = true;
                phantomjs.halt();
            });

            phantomjs.on('fail.timeout', function() {
                phantomjs.halt();
            });

            var done = this.async();
            var url = grunt.template.process('http://<%= config.serverHostname %>:<%= config.serverPort %>');
            phantomjs.spawn(url, {
                options: {
                    timeout: 5000,
                },
                done: function(err) {
                    done(err || !hasErrors);
                }
            });
        });
};
