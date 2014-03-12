module.exports = {
    build: {
        src: ['<%= config.build %>']
    },
    templates: {
        src: ['templates']
    },
    coverage: {
        src: ['coverage']
    },
    rxPageObjects: {
        src: ['utils/rx-page-objects/index.js', 'utils/rx-page-objects/*.tgz']
    }
};