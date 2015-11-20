var config = require('../util/config');

module.exports = {
    'readme': {
        src: [
            'guides/using-encoreui.md',
            'guides/testing.md'
        ],
        overwrite: true,
        replacements: [{
            from: config.regex.version,
            to: '-<%= pkg.version %>'
        }]
    },
    'bower': {
        src: ['bower/*.css', 'bower/*.map', 'bower/*.js'],
        overwrite: true,
        replacements: [{
            from: config.regex.version,
            to: ''
        }]
    }
};
