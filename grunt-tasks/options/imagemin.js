var path = require('path');
var config = require('../util/config.js');

module.exports = {
    options: {
        config: config
    },
    dist: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: '*/images/*',
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