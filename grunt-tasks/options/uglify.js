module.exports = {
    options: {
        banner: '<%= config.meta.banner %>'
    },
    dist:{
        src:['<%= concat.dist.dest %>'],
        dest:'<%= config.dist %>/<%= config.fileName %>-<%= pkg.version %>.min.js'
    },
    distTpls:{
        src:['<%= concat.distTpls.dest %>'],
        dest:'<%= config.dist %>/<%= config.fileName %>-tpls-<%= pkg.version %>.min.js'
    }
};