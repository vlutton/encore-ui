module.exports = {
    encore: {
        options: {
            // TODO figure out how to get sourcemap file to only generate once
            // sourceMap: true,
            // sourceMapFilename: '<%= config.dist %>/encore-ui.map.css',
            // outputSourceFiles: 'true',
            paths: 'src/styles/'
        },
        files: {
            '<%= config.dist %>/encore-ui.css': [
                'src/styles/normalize.less',
                'src/styles/common.less',
                'src/rx*/*.less'
            ]
        }
    }
};