module.exports = function (grunt) {
    grunt.registerTask('minify', [
        'cssmin',
        'ngAnnotate',
        'uglify',
        'imagemin'
    ]);
};
