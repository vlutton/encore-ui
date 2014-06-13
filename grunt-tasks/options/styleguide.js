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
            'build/styleguide': 'build/dist/*.css'
        }
    }
};