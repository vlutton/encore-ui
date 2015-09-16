module.exports = {
    bower: {
        src: '<%= config.bower %>'
    },
    build: {
        src: ['<%= config.build %>']
    },
    examples: {
        src: ['demo/examples']
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
