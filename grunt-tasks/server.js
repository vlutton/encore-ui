module.exports = function (grunt) {
    grunt.registerTask('server',
        'Runs app in development mode.',
        function () {
            var commonTasks = [
                'before-test',
                'after-test',
                'connect:dist',
                'karma:watch',
                'watch',
                'karma:watch:run'
            ];

            grunt.task.run(commonTasks);
        });
};