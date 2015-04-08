module.exports = {
    ghPages: {
        options: {
            base: '<%= config.docs %>',
            message: 'docs(ghpages): release v<%= pkg.version %>'
        },
        src: '**/*'
    },
    bower: {
        options: {
            base: 'bower',
            branch: 'master',
            message: 'chore(bower): release v<%= pkg.version %>',
            repo: 'https://github.com/rackerlabs/encore-ui-bower.git',
            tag: '<%= pkg.version %>'
        },
        src: '**/*'
    }
};
