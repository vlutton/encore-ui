module.exports = function (grunt) {
    grunt.registerTask('build', 'Create build files', function () {
        grunt.task.run(['clean:build', 'modules', 'concat:dist', 'concat:distTpls', 'concat:tmpLess',
                        'concat:tmpLessResp', 'less:encore', 'less:encoreResp', 'less:styleguide', 'copy:demoreadme',
                        'copy:demohtml', 'copy:demoassets', 'copy:demopolyfills', 'imagemin', 'concat:rxPageObjects',
                        'concat:rxPageObjectsExercises', 'jsdoc2md:rxPageObjects', 'shell:rxPageObjectsDemoDocs',
                        'ngdocs']);
    });
};
