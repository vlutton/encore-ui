var config = require('../util/config.js');

module.exports = {
    config: config,
    options: {
        _: ['build/dist'],
        name: 'Encore UI',
        out: '<%= config.docs %>/styleguide',
        in : ['build/dist'],
        include: [undefined],
        basePath: 'build/dist'
    }
};