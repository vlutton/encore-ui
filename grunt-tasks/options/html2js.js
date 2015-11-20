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
                return moduleName.split(path.sep) // convert path to array
                    .slice(2) // ignore first two directories (:category/:name)
                    .join(path.sep); // convert back to path string
            }
        },
        files: [
            {
                expand: true,
                cwd: 'src/atoms',
                src: ['**/templates/*.html'],
                dest: 'templates/'
            }, {
                expand: true,
                cwd: 'src/components',
                src: ['**/templates/*.html'],
                dest: 'templates/'
            }, {
                expand: true,
                cwd: 'src/molecules',
                src: ['**/templates/*.html'],
                dest: 'templates/'
            }, {
                expand: true,
                cwd: 'src/quarks',
                src: ['**/templates/*.html'],
                dest: 'templates/'
            },
        ]
    }
};
