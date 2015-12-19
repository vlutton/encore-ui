module.exports = function (grunt) {
    grunt.registerTask('rxPageObjects', 'Publish rxPageObjects to npm', function (publishType) {
        var tasks = [
            'concat:rxPageObjects',
            'concat:rxPageObjectsExercises',
            'shell:rxPageObjects',
            'jsdoc:rxPageObjects',
            'copy:rxPageObjectsDocs'
        ];

        if (publishType === 'hotfix') {
            tasks.push('shell:npmPublishHotFix');
        } else {
            tasks.push('shell:npmPublish');
        }

        tasks.push('clean:rxPageObjects');
        grunt.task.run(tasks);

    });
};
