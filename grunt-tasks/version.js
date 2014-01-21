module.exports = function(grunt) {

    grunt.registerTask('version', 'Set version. If no arguments, it just takes off suffix', function(type, suffix) {
        var fileList = ['package.json', 'bower.json'];
        var VERSION_REGEX = /([\'|\"]version[\'|\"][ ]*:[ ]*[\'|\"])([\d|.]*)(-\w+)*([\'|\"])/;
        var version, contents;

        fileList.forEach(function(file) {
            contents = grunt.file.read(file);

            contents = contents.replace(VERSION_REGEX, function(match, left, center) {
                version = center;

                if (type) {
                    version = require('semver').inc(version, type);
                }

                //semver.inc strips our suffix if it existed
                if (suffix) {
                    version += '-' + suffix;
                }

                return left + version + '"';
            });

            grunt.log.ok('Version set to ' + version.cyan + ' (' + file + ')');
            grunt.file.write(file, contents);
        });
    });
};