module.exports = {
    encore: {
        options: {
            sourceMap: true,
            sourceMapFilename: '<%= config.dist %>/encore-ui-<%= pkg.version %>.map.css',
            outputSourceFiles: 'true'
        },
        files: {
            '<%= config.dist %>/encore-ui-<%= pkg.version %>.css': [
                'src/common.less', // less files in root need to be loaded first
                'src/*/*.less'
            ]
        }
    }
};