module.exports = {
    'readme': {
        src: ['README.md'],
        overwrite: true,
        replacements: [{
            from: /\.com\/(?:\d\.){2}\d\/encore/g,
            to: '.com/<%= pkg.version %>/encore'
        }]
    }
};