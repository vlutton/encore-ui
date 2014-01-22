module.exports = {
    dist: {
        options: {
            module: false // no bundle module for all the html2js templates
        },
        files: [{
            expand: true,
            src: ['src/**/*.tpl.html'],
            dest: 'templates'
        }]
    }
};