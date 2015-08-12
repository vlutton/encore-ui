/*jshint node:true */
var _ = require('lodash');

module.exports = function (grunt) {
    grunt.registerTask('squirrel', 'Logs a shipit squirrel', function () {
        // uniform bubble sizes, regardless of version number
        var shipIt = grunt.template.process('| Ship it! v<%= pkg.version %>  |');
        var topBubble = _.repeat('_', shipIt.length - 5);
        var topAir = ['/', _.repeat(' ', shipIt.length - 3), '\\'].join('');
        var bottomBubble = [_.repeat('_', shipIt.length - 3), '/'].join('');

        var squirrels = [
            ['         _-------_        ' + topBubble,
             '       .\'  ..::. `\\     ' + topAir,
             '      /  .::\' `\'` /     ' + shipIt,
             '     / .::\' .--.=;     / ' + bottomBubble,
             '     | ::\' /  C ..\\   / /',
             '     | :: |   \\  _.) <_/',
             '      \\ \':|   /  \\',
             '       \'-, \\./ \\)\\)',
             '          `-|   );/',
             '             \'--\'-\'\''],
            ['                     ^',
             '         _-------_  /T\\      ' + topBubble,
             '       .\'  ..::. `\\ |||    ' + topAir,
             '      /  .::\' `\'` / |||    ' + shipIt,
             '     / .::\' .--.=;  |||   / ' + bottomBubble,
             '     | ::\' /  C ..\\ |||  / /',
             '     | :: |   \\  _.)||| <_/',
             '      \\ \':|   /  \\  |||',
             '       \'-, \\./ \\)\\_0===0',
             '          `-|   );/  |',
             '             \'--\'-\'\' U']
        ];

        var squirrel = grunt.template.process(_.sample(squirrels).join('\n'));
        console.log(squirrel);
    });
};
