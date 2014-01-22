module.exports = function(grunt) {
    grunt.registerTask('enforce', 'Install commit message enforce script if it doesn\'t exist', function() {
        // commented out since not overwriting means updates will never be recieved
        //if (!grunt.file.exists('.git/hooks/commit-msg')) {
        grunt.file.copy('./grunt-tasks/misc/validate-commit-msg.js', '.git/hooks/commit-msg');
        require('fs').chmodSync('.git/hooks/commit-msg', '0755');
        //}
    });
};