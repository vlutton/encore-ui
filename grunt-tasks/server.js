module.exports = function (grunt) {
    grunt.registerTask('server',
        'Runs app in development mode.',
        function (testing) {
            var commonTasks = [
                'clean',
                'html2js',
                'build',
                'less',
                'copy',
                'ngdocs',
                'styleguide',
            ];

            if (!testing) {
                commonTasks.push('configureProxies');
                commonTasks.push('connect:dist');
                commonTasks.push('karma:watch:start');
                commonTasks.push('watch');
            } else {
                commonTasks.push('connect:dist');
            }

            grunt.task.run(commonTasks);
        });
};
