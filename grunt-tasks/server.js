module.exports = function (grunt) {
    grunt.registerTask('server',
        'Runs app in development mode.',
        function () {
            var commonTasks = [
                'before-test',
                'after-test',
                'configureProxies',
                'connect:dist',
                'karma:watch',
                'karma:watch:run',
                'watch'
            ];

            grunt.task.run(commonTasks);
        });
};
