module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', [
        'concat:rxPageObjects',
        'concat:rxPageObjectsExercises',
        'shell:rxPageObjects',
        'copy:rxPageObjects',
        'jsdoc2md:rxPageObjects',
        'shell:npmPublish',
        'clean:rxPageObjects'
    ]);
};
