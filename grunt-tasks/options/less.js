module.exports = {
    encore: {
        options: {
            // TODO figure out how to get sourcemap file to only generate once
            // sourceMap: true,
            // sourceMapFilename: '<%= config.dist %>/encore-ui.map.css',
            // outputSourceFiles: 'true',
            paths: ['src/styles/', 'node_modules/normalize.css/']
        },
        files: {
            '<%= config.dist %>/<%= config.fileName %>.css': ['src/rx*/*.less']
        }
    }
};