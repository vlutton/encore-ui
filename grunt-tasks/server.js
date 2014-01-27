module.exports = function (grunt) {
    grunt.registerTask('server',
        'Runs app in development mode.',
        function() {
            var commonTasks = [
                'html2js',
                'after-test',
                'connect:dist',
                'karma:watch',
                'watch'
            ];

            grunt.task.run(commonTasks);
        });
};