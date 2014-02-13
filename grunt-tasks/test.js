/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('test', 'Run tests on karma server', function () {
        grunt.task.run('karma:single');
        // make sure to run tests against minified files as well
        grunt.task.run('karma:minified');
    });
};