/*jshint node:true */
module.exports = function (grunt) {
    grunt.registerTask('shipit', 'Ships code to prod', function (versionType) {
        var validTypes = ['major', 'minor', 'patch'];
        var tasks = [];

        if (validTypes.indexOf(versionType) > -1) {
            // increment the version
            tasks.push('bump-only:' + versionType);

            // create changelog
            tasks.push('changelog');

            // increment version in readme
            tasks.push('replace:readme');

            // commit version increment
            tasks.push('bump-commit');

            // build the code
            tasks.push('before-test');
            tasks.push('after-test');

            // push files to prod
            tasks.push('cloudfiles:production');

            // update gh-pages branch
            tasks.push('gh-pages:ghPages');

            // update bower repo
            tasks.push('bower');

            // shipit squirrel
            tasks.push('squirrel');

            grunt.task.run(tasks);
        } else {
            grunt.fatal('Must pass in version type major/minor/patch. E.g. `grunt shipit:patch`');
        }
    });
};