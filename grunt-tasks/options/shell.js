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
    },
    rxPageObjects: {
        command: 'npm pack',
        options: {
            stdout: true,
            execOptions: {
                cwd: 'utils/rx-page-objects'
            }
        }
    },
    bower: {
        command:  function () {
            return [
                // cd into bower directory
                'cd bower',
                // add & commit files
                'git commit -a -m "v<%= pkg.version %>"',
                // tag files to new version
                'git tag "v<%= pkg.version %>";',
                // push to github
                'git push;',
                'git push --tags;',
            ].join(' && ');
        },
        options: {
            stdout: true,
        }
    }
};