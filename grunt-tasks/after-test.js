module.exports = function (grunt) {
    grunt.registerTask('after-test', ['html2js', 'build', 'cssmin', 'ngmin', 'uglify', 'copy', 'rxPageObjects',
        'clean:templates', 'complexity']);
};