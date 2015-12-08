module.exports = {
    bower: {
        src: '<%= config.dir.bower %>'
    },
    build: {
        src: ['<%= config.dir.build %>']
    },
    templates: {
        src: ['templates']
    },
    coverage: {
        src: ['coverage']
    },
    rxPageObjects: {
        src: ['utils/rx-page-objects/*.tgz']
    }
};
