// preprocessor: '/usr/bin/less'
var config = require('../util/config.js');

module.exports = {
    config: config,
    options: {
        _: ['<%= config.dist %>'],
        name: 'Encore UI',
        out: '<%= config.docs %>/styleguide',
        in : ['<%= config.dist %>'],
        include: [],
        preprocessor: 'node_modules/grunt-contrib-less/node_modules/less',
        basePath: '<%= config.dist %>'
    }
};