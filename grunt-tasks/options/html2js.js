var path = require('path');

module.exports = {
    dist: {
        options: {
            module: false, // no bundle module for all the html2js templates
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true
            },
            // remove folder name from path
            rename: function (moduleName) {
                // convert path to array
                var templatePath = moduleName.split(path.sep);

                // remove the first directory (the module name)
                templatePath.shift();

                // return the rest of the path as a string
                return templatePath.join(path.sep);
            }
        },
        files: [{
            expand: true,
            flatten: true,
            cwd: 'src',
            src: ['**/templates/*.html'],
            dest: 'templates/'
        }]
    }
};