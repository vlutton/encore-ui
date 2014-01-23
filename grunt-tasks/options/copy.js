var path = require('path');

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
    },
    coverage: {
        files: [{
            expand: true,
            src: ['Phantom*/**/*'],
            cwd: 'coverage/',
            dest: 'dist/coverage/',
            // remove 'Phantom' from path
            rename: function (dest, src) {
                // convert src to array
                var templatePath = src.split(path.sep);

                // remove the first directory ('Phantom ...')
                templatePath.shift();

                // return dest + the rest of the path as a string
                return dest + templatePath.join(path.sep);
            }
        }]
    }
};