module.exports = {
    rxPageObjects: {
        options: {
            mode: 'tgz',
            archive: '<%= config.dist %>/rxPageObjects.tar.gz'
        },
        src: 'index.js'
    }
};