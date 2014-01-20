module.exports = {
    dist: {
        options: {
            module: null, // no bundle module for all the html2js templates
            base: '.'
        },
        files: [{
            expand: true,
            src: ['templates/**/*.html'],
            ext: '.html.js'
        }]
    }
};