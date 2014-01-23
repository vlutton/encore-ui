module.exports = {
    demohtml: {
        options: {
            process: function () {
                // this function intentionally left blank (gets replaced by build task)
            }
        },
        files: [{
            expand: true,
            src: ['**/*.html'],
            cwd: 'demo/',
            dest: 'dist/'
        }]
    },
    demoassets: {
        files: [{
            expand: true,
            //Don't re-copy html files, we process those
            src: ['**/**/*', '!**/*.html'],
            cwd: 'demo/',
            dest: 'dist/'
        }]
    }
};