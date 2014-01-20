module.exports = {
    encore: {
        options: {
            paths: ['styles/']
        },
        files: {
            '<%= config.dist %>/encore-ui-<%= pkg.version %>.css': 'styles/encore-ui.less'
        }
    }
}