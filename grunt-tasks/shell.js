module.exports = function(grunt) {
    grunt.registerMultiTask('shell', 'run shell commands', function() {
        var self = this;
        var sh = require('shelljs');

        self.data.forEach(function(cmd) {
            cmd = cmd.replace('%version%', grunt.file.readJSON('package.json').version);
            grunt.log.ok(cmd);
            var result = sh.exec(cmd,{silent:true});
            
            if (result.code !== 0) {
                grunt.fatal(result.output);
            }
        });
    });
};