module.exports = function (grunt) {
    grunt.registerTask('server',
        'Runs app in development mode.',
        function () {
            var commonTasks = [
                'clean',
                'html2js',
                'build',
                'less',
                'copy',
                'ngdocs',
                'styleguide',
                'configureProxies',
                'connect:dist',
                'karma:watch:start',
                'watch'
            ];

            grunt.task.run(commonTasks);
        });
};
