module.exports = {
    'readme': {
        src: ['README.md', 'docs/testing.md'],
        overwrite: true,
        replacements: [{
            from: /\.com\/(?:\d\.){2}\d\//g,
            to: '.com/<%= pkg.version %>/'
        }, {
            from: /\-(?:\d\.){2}\d\.tgz/g,
            to: '-<%= pkg.version %>.tgz'
        }]
    }
};