var config = require('../util/config');
var _ = require('lodash');

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
    },
    'wraith': {
        src: ['wraith/configs/config.yaml'],
        overwrite: true,
        replacements: [{
            // http://www.regexr.com/3962b
            from: /paths:(\n +[ ":'/#\w]+)+/gm,
            to: function () {
                var paths = 'paths:\n';
                var urlTemplate = _.template('  <%- name %>: "/#/component/<%- name %>"\n');

                _.each(config.demoModules, function (module) {
                    paths += urlTemplate(module);
                });
                return paths;
            }
        }]
    }
};