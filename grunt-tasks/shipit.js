/*jshint node:true */
var squirrel = '         _-------_        _______________\n' +
    '       .\'  ..::. `\\      /               \\\n' +
    '      /  .::\' `\'` /     | Ship it! v<%= pkg.version %> |\n' +
    '     / .::\' .--.=;     / ________________/\n' +
    '     | ::\' /  C ..\\   / /\n' +
    '     | :: |   \\  _.) <_/\n' +
    '      \\ \':|   /  \\\n' +
    '       \'-, \\./ \\)\\)\n' +
    '          `-|   );/\n' +
    '             \'--\'-\'\'';

module.exports = function (grunt) {
    grunt.registerTask('shipit', 'Ships code to prod', function (versionType) {
        var validTypes = ['major', 'minor', 'patch'];

        if (validTypes.indexOf(versionType) > -1) {
            // increment the version
            // grunt.task.run('bump-only:' + versionType);

            // // create changelog
            // grunt.task.run('changelog');

            // // commit version increment
            // grunt.task.run('bump-commit');

            // // build the code
            // grunt.task.run('before-test');
            // grunt.task.run('after-test');

            // // push files to prod
            // grunt.task.run('cloudfiles:production');

            // shipit squirrel
            squirrel = grunt.template.process(squirrel);
            console.log(squirrel);
        } else {
            grunt.fatal('Must pass in version type major/minor/patch. E.g. `grunt shipit:patch`');
        }
    });
};