module.exports = function (grunt) {
    grunt.registerTask('bower', [
        'clean:bower',
        'copy:bower',
        'gh-pages:bower'
    ]);
};