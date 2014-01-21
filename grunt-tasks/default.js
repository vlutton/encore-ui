module.exports = function(grunt) {
    // Hi, I will run jshint
    grunt.registerTask('default', ['before-test', 'test', 'after-test']);
};