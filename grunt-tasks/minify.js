module.exports = function (grunt) {
    grunt.registerTask('minify', ['cssmin', 'ngmin', 'uglify']);
};