/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('test', 'Run tests on karma server', function () {
        grunt.task.run('karma:single');
    });
};