var config = require('../util/config.js');

module.exports = {
    options: {
        port: 9000,
        hostname: 'localhost',
    },
    dist: {
        options: {
            livereload: true,
            base: 'dist'
        }
    }
};