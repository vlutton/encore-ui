module.exports = {
    'readme': {
        src: ['README.md', 'guides/testing.md'],
        overwrite: true,
        replacements: [{
            from: /\-(?:\d\.){2}\d\./g,
            to: '-<%= pkg.version %>.'
        }]
    }
};