/*jshint node:true*/
module.exports = {
    hooks: {
        command: function () {
            // don't run the command if we're in Travis CI
            if (!process.env.TRAVIS) {
                return [
                    'rm -f .git/hooks/jshint .git/hooks/validate-commit-msg',
                    'cp grunt-tasks/git-hooks/* .git/hooks/',
                    'chmod u+x .git/hooks/jshint .git/hooks/validate-commit-msg'
                ].join(' && ');
            } else {
                // do nothing
                return '';
            }
        }
    }
};