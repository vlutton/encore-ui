module.exports = {
    //We use %version% and evluate it at run-time, because <%= pkg.version %>
    //is only evaluated once
    'release-prepare': {
        command: [
            'grunt before-test after-test',
            'grunt version', //remove "-SNAPSHOT"
            'grunt changelog'
        ].join(' && ')
    },
    'release-complete': {
        command: [
            'git commit CHANGELOG.md bower.json package.json -m "chore(release): v%version%"',
            'git tag %version%'
        ].join(' && ')
    },
    'release-start': {
        command: [
            'grunt version:minor:"SNAPSHOT"',
            'git commit bower.json package.json -m "chore(release): Starting v%version%"'
        ].join(' && ')
    },
    hooks: {
        command: [
            'rm -f .git/hooks/jshint .git/hooks/validate-commit-msg',
            'cp grunt-tasks/git-hooks/* .git/hooks/',
            'chmod u+x .git/hooks/jshint .git/hooks/validate-commit-msg'
        ].join(' && ')
    }
};