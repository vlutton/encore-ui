var config = require('../util/config');
var _ = require('lodash');

module.exports = {
    'readme': {
        src: ['guides/using-encoreui.md', 'guides/testing.md'],
        overwrite: true,
        replacements: [{
            from: config.versionRegEx,
            to: '-<%= pkg.version %>'
        }]
    },
    'bower': {
        src: ['bower/*.css', 'bower/*.map', 'bower/*.js'],
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
                var paths = 'paths:';
                var urlTemplate = _.template('\n  <%- name %>: "/#/component/<%- name %>"');

                _.each(config.demoModules, function (module) {
                    paths += urlTemplate(module);
                });

                return paths;
            }
        }]
    }
};
