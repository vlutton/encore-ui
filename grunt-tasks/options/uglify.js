module.exports = {
    options: {
        banner: '<%= config.meta.banner %>'
    },
    dist:{
        src:['<%= concat.dist.dest %>'],
        dest:'<%= config.dist %>/<%= config.fileName %>-<%= pkg.version %>.min.js'
    },
    dist_tpls:{
        src:['<%= concat.dist_tpls.dest %>'],
        dest:'<%= config.dist %>/<%= config.fileName %>-tpls-<%= pkg.version %>.min.js'
    }
}