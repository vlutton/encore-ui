module.exports = {
    options: {
        banner: '<%= config.meta.banner %>',
        except: ['angular'],
        sourceMap: true
    },
    dist: {
        files: [{
            expand: true,
            flatten: true,
            src: '<%= config.dir.dist %>/*.js',
            dest: '<%= config.dir.dist %>/',
            ext: '.min.js',
            extDot: 'last'
        }]
    }
};
