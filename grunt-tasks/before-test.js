module.exports = function(grunt) {
    grunt.registerTask('before-test', ['enforce', 'jshint', 'html2js']);
};