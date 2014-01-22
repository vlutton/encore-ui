var path = require('path');

module.exports = {
    dist: {
        options: {
            module: false, // no bundle module for all the html2js templates
            // remove folder name from path
            rename: function (moduleName) {
                // grab filename from moduleName
                var basename = path.basename(moduleName);
                return 'templates/' + basename;
            }
        },
        files: [{
            expand: true,
            flatten: true,
            cwd: 'src',
            src: ['**/*.html'],
            dest: 'templates/'
        }]
    }
};