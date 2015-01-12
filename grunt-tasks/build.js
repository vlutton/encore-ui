module.exports = function (grunt) {
    grunt.registerTask('build', 'Create build files', function () {

        grunt.task.run(['clean:build', 'modules', 'concat:dist', 'concat:distTpls', 'concat:tmpLess', 'less:encore',
            'less:styleguide', 'copy:demoreadme', 'copy:demohtml', 'copy:demoassets', 'imagemin',
            'copy:font', 'replace:wraith']);
    });
};
