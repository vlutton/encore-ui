module.exports = {
    options: {
        banner: '<%= config.meta.banner %>'
    },
    dist:{
        src:['<%= concat.dist.dest %>'],
        dest:'<%= config.dist %>/<%= config.fileName %>.min.js'
    },
    distTpls:{
        src:['<%= concat.distTpls.dest %>'],
        dest:'<%= config.dist %>/<%= config.fileName %>-tpls.min.js'
    }
};