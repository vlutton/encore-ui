module.exports = function (grunt) {
    grunt.registerTask('before-test', ['clean', 'jshint', 'jscs']);
};