module.exports = {
    docs: {
        src: [
            '<%= config.dist %>/index.html',
            '<%= config.dist %>/assets',
            '<%= config.dist %>/images',
            '<%= config.dist %>/coverage'
        ]
    },
    build: {
        src: ['<%= config.dist %>/*']
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