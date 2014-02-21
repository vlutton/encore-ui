/*jshint node:true*/
module.exports = {
    hooks: {
        options: {
            stdout: true
        },
        command: function () {
            // don't run the command if we're in Travis CI
            if (!process.env.TRAVIS) {
                return [
                    'rm -f .git/hooks/pre-commit .git/hooks/commit-msg .git/hooks/post-merge',
                    'cp grunt-tasks/git-hooks/* .git/hooks/',
                    'chmod u+x .git/hooks/pre-commit .git/hooks/commit-msg .git/hooks/post-merge',
                ].join(' && ');
            } else {
                // do nothing
                return '';
            }
        }
    }
};