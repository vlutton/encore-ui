module.exports = {
    encore: {
        options: {
            report: 'gzip'
        },
        dest: '<%= config.dir.dist %>/<%= config.dist.fileName %>.min.css',
        src: '<%= config.dir.dist %>/<%= config.dist.fileName %>.css'
    },

    encoreResp: {
        options: {
            report: 'gzip'
        },
        dest: '<%= config.dir.dist %>/<%= config.dist.fileNameResp %>.min.css',
        src: '<%= config.dir.dist %>/<%= config.dist.fileNameResp %>.css'
    }
};
