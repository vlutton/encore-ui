module.exports = {
    encore: {
        options: {
            sourceMap: true,
            sourceMapFilename: '<%= config.dist %>/encore-ui-<%= pkg.version %>.map.css',
            outputSourceFiles: 'true'
        },
        files: {
            '<%= config.dist %>/encore-ui-<%= pkg.version %>.css': [
                'src/global-styles/*.less', // less files in root need to be loaded first
                'src/rx*/*.less'
            ]
        }
    }
};