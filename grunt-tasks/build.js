module.exports = function (grunt) {
    grunt.registerTask('build', 'Create build files', function () {
        grunt.task.run([
            'clean:build',
            'modules',
            'concat:dist',
            'concat:distTpls',
            'concat:tmpEncoreLess',
            'concat:tmpDemosLess',
            'concat:tmpExamplesLess',
            'less:encore',
            'less:encoreResp',
            'less:styleguide',
            'copy:demomarkdown',
            'copy:demohtml',
            'copy:demoassets',
            'copy:demopolyfills',
            'copy:demoExamples',
            'imagemin',
            'concat:rxPageObjects',
            'concat:rxPageObjectsExercises',
            'jsdoc2md:rxPageObjects',
            'shell:rxPageObjectsDemoDocs',
            'ngdocs'
        ]);
    });
};
