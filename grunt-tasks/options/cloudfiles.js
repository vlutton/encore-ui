module.exports = {
    alpha: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-alpha',
            'src': [
                '<%= config.dist %>/**/*'
            ],
            'dest': '/',
            'stripcomponents': 1
        }]
    },
    staging: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-staging',
            'src': [
                '<%= config.dist %>/**/*'
            ],
            'dest': '/',
            'stripcomponents': 1
        }]
    },
    production: {
        'user': '<%= localConfig.cloudUsername %>',
        'key': '<%= localConfig.apiKey %>',
        'region': 'DFW',
        'upload': [{
            'container': 'encore-ui-production',
            'src': [
                '<%= config.dist %>/**/*'
            ],
            'dest': '/',
            'stripcomponents': 1
        }]
    }
};