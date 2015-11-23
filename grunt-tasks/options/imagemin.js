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
                var imagePath = src.split(path.sep) // convert src to array
                    .slice(3) // remove :category, :component, and images directories
                    .join(path.sep); // convert back to path string

                return dest + imagePath;
            }
        }]
    }
};
