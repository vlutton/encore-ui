module.exports = function(grunt) {
    grunt.registerTask('rxPageObjects', ['concat:rxPageObjects', 'compress:rxPageObjects', 'clean:rxPageObjects']);
};