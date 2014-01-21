module.exports = function(grunt) {
    grunt.registerTask('enforce', 'Install commit message enforce script if it doesn\'t exist', function() {
        if (!grunt.file.exists('.git/hooks/commit-msg')) {
            grunt.file.copy('misc/validate-commit-msg.js', '.git/hooks/commit-msg');
            require('fs').chmodSync('.git/hooks/commit-msg', '0755');
        }
    });
};