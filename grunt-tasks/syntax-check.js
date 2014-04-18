module.exports = function (grunt) {
    // might want to add 'complexity' in the future when it's more standardized
    grunt.registerTask('syntax-check', ['jshint', 'jscs']);
};