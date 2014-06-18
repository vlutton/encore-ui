module.exports = {
    styledocco: {
        options: {
            include: '<%= config.dist %>/<%= config.fileName %>.css'
        },
        files: {
            '<%= config.docs %>/styleguide': '<%= config.app %>/**/*.less'
        }
    }
};