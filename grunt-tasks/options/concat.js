module.exports = {
    dist: {
        options: {
            banner: '<%= config.meta.banner %><%= config.meta.modules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= config.dist %>/<%= config.fileName %>.js'
    },
    distTpls: {
        options: {
            banner: '<%= config.meta.banner %><%= config.meta.all %>\n<%= config.meta.tplmodules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= config.dist %>/<%= config.fileName %>-tpls.js'
    }
};