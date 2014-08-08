module.exports = {
    encore: {
        options: {
            // TODO figure out how to get sourcemap file to only generate once
            sourceMap: true,
            sourceMapFilename: '<%= config.dist %>/<%= config.cssMapName %>',
            sourceMapURL: '<%= config.cssMapName %>',
            outputSourceFiles: 'true',
            paths: ['src/styles/', 'node_modules/normalize.css/']
        },
        files: {
            '<%= config.dist %>/<%= config.fileName %>.css': ['<%= config.tmpLess %>']
        }
    }
};
