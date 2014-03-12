module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', [
        'concat:rxPageObjects',
        'shell:rxPageObjects',
        'copy:rxPageObjects',
        'clean:rxPageObjects'
    ]);
};