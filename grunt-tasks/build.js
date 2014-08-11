module.exports = function (grunt) {
    grunt.registerTask('build', 'Create build files', function () {

        grunt.task.run(['clean:build', 'modules', 'concat:dist', 'concat:distTpls', 'concat:tmpLess', 'less',
            'copy:demoreadme', 'copy:demohtml', 'copy:demoassets', 'copy:componentImages',
            'copy:font', 'replace:wraith']);
    });
};
