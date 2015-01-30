module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', [
        'concat:rxPageObjects',
        'shell:rxPageObjects',
        'copy:rxPageObjects',
        'shell:npmPublish',
        'jsdoc2md:rxPageObjects',
        'clean:rxPageObjects'
    ]);
};
