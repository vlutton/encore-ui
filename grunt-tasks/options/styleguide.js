module.exports = {
    styledocco: {
        options: {
            framework: {
                name: 'styledocco',
                options: {
                    verbose: true
                },
            },
            name: 'Encore UI'
        },

        files: {
            '<%= config.docs %>/styleguide': '<%= config.dist %>/*.css'
        }
    }
};