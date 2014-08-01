/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('test', 'Run tests on karma server', function (full) {
        grunt.task.run('karma:single');
        if (full) {
            grunt.task.run('server:testing');
            grunt.task.run('phantomjs-check');
        }
    });
};
