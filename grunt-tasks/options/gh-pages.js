module.exports = {
    options: {
        base: '<%= config.docs %>',
        message: 'docs(ghpages): release v<%= pkg.version %>'
    },
    src: '**/*'
};