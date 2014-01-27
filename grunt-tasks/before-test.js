module.exports = function(grunt) {
    grunt.registerTask('before-test', ['clean:coverage', 'enforce', 'jshint']);
};