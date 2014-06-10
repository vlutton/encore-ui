module.exports = function (grunt) {
    grunt.registerTask('bower', [
        'clean:bower',
        'copy:bower',
        'replace:bower',
        'gh-pages:bower'
    ]);
};