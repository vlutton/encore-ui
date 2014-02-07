module.exports = {
    options: {
        port: 9001,
        hostname: 'localhost',
    },
    dist: {
        options: {
            livereload: 1337,
            base: '<%= config.dist %>'
        }
    },
    keepalive: {
        options: {
            keepalive: true,
            base: '<%= config.dist %>'
        }
    }
};