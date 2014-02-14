module.exports = {
    encore: {
        options: {
            report: 'gzip'
        },
        dest: '<%= config.dist %>/encore-ui.min.css',
        src: '<%= config.dist %>/encore-ui.css'
    }
};