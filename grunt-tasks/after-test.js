module.exports = function(grunt) {
    grunt.registerTask('after-test', ['html2js', 'build', 'copy', 'clean:templates', 'complexity']);
};