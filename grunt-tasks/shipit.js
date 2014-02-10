/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('shipit', 'Ships code to prod', function (versionType) {
        var validTypes = ['major', 'minor', 'patch'];

        if (validTypes.indexOf(versionType) > -1) {
            // increment the version
            grunt.task.run('bump-only:' + versionType);

            // create changelog
            grunt.task.run('changelog');

            // increment version in readme
            grunt.task.run('replace:readme');

            // commit version increment
            grunt.task.run('bump-commit');

            // build the code
            grunt.task.run('before-test');
            grunt.task.run('after-test');

            // push files to prod
            grunt.task.run('cloudfiles:production');

            // shipit squirrel
            grunt.task.run('squirrel');
        } else {
            grunt.fatal('Must pass in version type major/minor/patch. E.g. `grunt shipit:patch`');
        }
    });
};