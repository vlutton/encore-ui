module.exports = {
    staging: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-staging',
            'src': [
                '<%= config.dist %>/*.js',
                '<%= config.dist %>/*.css'
            ],
        'dest': '<%= pkg.version %>/',
        'stripcomponents': 1
        }]
    }
};