/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('squirrel', 'Logs a shipit squirrel', function () {
        var squirrel =
            '         _-------_        _______________\n' +
            '       .\'  ..::. `\\      /               \\\n' +
            '      /  .::\' `\'` /     | Ship it! v<%= pkg.version %> |\n' +
            '     / .::\' .--.=;     / ________________/\n' +
            '     | ::\' /  C ..\\   / /\n' +
            '     | :: |   \\  _.) <_/\n' +
            '      \\ \':|   /  \\\n' +
            '       \'-, \\./ \\)\\)\n' +
            '          `-|   );/\n' +
            '             \'--\'-\'\'';


        squirrel = grunt.template.process(squirrel);
        console.log(squirrel);
    });
};