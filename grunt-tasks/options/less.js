module.exports = {
    encore: {
        options: {
            sourceMap: true,
            sourceMapFilename: '<%= config.dist %>/encore-ui.map.css',
            outputSourceFiles: 'true'
        },
        files: {
            '<%= config.dist %>/encore-ui.css': [
                'src/styles/*.less', // less files in root need to be loaded first
                'src/rx*/*.less'
            ]
        }
    }
};