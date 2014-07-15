var config = require('../util/config');

module.exports = {
    'readme': {
        src: ['guides/getting-started.md', 'guides/testing.md'],
        overwrite: true,
        replacements: [{
            from: config.versionRegEx,
            to: '-<%= pkg.version %>'
        }]
    },
    'bower': {
        src: ['bower/encore-ui.min.js', 'bower/encore-ui-tpls.min.js'],
        overwrite: true,
        replacements: [{
            from: config.versionRegEx,
            to: ''
        }]
    }
};