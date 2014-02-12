/*jshint node:true */
var _ = require('lodash');

module.exports = function (grunt) {
    grunt.registerTask('squirrel', 'Logs a shipit squirrel', function () {
        var squirrels = [
            ['         _-------_        _______________',
             '       .\'  ..::. `\\      /               \\',
             '      /  .::\' `\'` /     | Ship it! v<%= pkg.version %> |',
             '     / .::\' .--.=;     / ________________/',
             '     | ::\' /  C ..\\   / /',
             '     | :: |   \\  _.) <_/',
             '      \\ \':|   /  \\',
             '       \'-, \\./ \\)\\)',
             '          `-|   );/',
             '             \'--\'-\'\''],
            ['         _-------_        _______________',
             '       .\'  ..::. `\\      /               \\',
             '      /  .::\' `\'` /     | Ship it! v<%= pkg.version %> |',
             '     / .::\' .--.=;     / ________________/',
             '     | ::\' /  C ..\\   / /',
             '     | :: |   \\  _.) <_/',
             '      \\ \':|   /  \\',
             '       \'-, \\./ \\)\\)',
             '          `-|   );/',
             '             \'--\'-\'\'']
        ];

        var squirrel = grunt.template.process(_.sample(squirrels).join('\n'));
        console.log(squirrel);
    });
};
