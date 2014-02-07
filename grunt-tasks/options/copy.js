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
            dest: '<%= config.dist %>'
        }]
    },
    demoassets: {
        files: [{
            expand: true,
            //Don't re-copy html files, we process those
            src: ['**/**/*', '!**/*.html'],
            cwd: 'demo/',
            dest: '<%= config.dist %>'
        }]
    },
    coverage: {
        files: [{
            expand: true,
            src: ['Phantom*/**/*'],
            cwd: 'coverage/',
            dest: '<%= config.dist %>/coverage/',
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
    },
    componentImages: {
        files: [{
            expand: true,
            src: ['*/images/*'],
            cwd: 'src/',
            dest: '<%= config.dist %>/images/',
            // remove 'images' from path
            rename: function (dest, src) {
                // convert src to array
                var imagePath = src.split(path.sep);

                // remove the componentName and images directory
                imagePath.splice(0, 2);

                return dest + imagePath.join(path.sep);
            }
        }]
    }
};