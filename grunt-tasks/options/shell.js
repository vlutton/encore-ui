module.exports = {
    //We use %version% and evluate it at run-time, because <%= pkg.version %>
    //is only evaluated once
    'release-prepare': [
        'grunt before-test after-test',
        'grunt version', //remove "-SNAPSHOT"
        'grunt changelog'
    ],
    'release-complete': [
        'git commit CHANGELOG.md bower.json package.json -m "chore(release): v%version%"',
        'git tag %version%'
    ],
    'release-start': [
        'grunt version:minor:"SNAPSHOT"',
        'git commit bower.json package.json -m "chore(release): Starting v%version%"'
    ]
};