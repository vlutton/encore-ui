module.exports = function (grunt) {
    grunt.registerTask('after-test', ['html2js', 'build', 'ngmin', 'uglify', 'copy', 'rxPageObjects', 'cssmin',
        'clean:templates', 'complexity']);
};