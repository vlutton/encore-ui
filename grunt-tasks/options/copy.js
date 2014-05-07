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
            src: ['**/*.html', '*.js'],
            cwd: 'demo/',
            dest: '<%= config.docs %>'
        }]
    },
    demoassets: {
        files: [{
            expand: true,
            //Don't re-copy html files, we process those
            src: ['**/**/*', '!**/*.html', '!*.js'],
            cwd: 'demo/',
            dest: '<%= config.docs %>'
        }]
    },
    coverage: {
        files: [{
            expand: true,
            src: ['Phantom*/**/*'],
            cwd: 'coverage/',
            dest: '<%= config.docs %>/coverage/',
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
    },
    rxPageObjects: {
        expand: true,
        flatten: true,
        src: 'utils/rx-page-objects/*.tgz',
        dest: '<%= config.dist %>/'
    },
    bower: {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>/',
            src: '**/*',
            dest: '<%= config.bower %>/',
            // remove version number from file names
            rename: function (dest, src) {
                var strippedVersion = src.replace(/\-(?:\d\.){2}\d/g, '');

                return dest + strippedVersion;
            }
        }, {
            src: 'bower.json',
            dest: '<%= config.bower %>/bower.json'
        }]
    }
};