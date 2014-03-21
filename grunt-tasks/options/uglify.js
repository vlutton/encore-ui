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
            src: '<%= config.dist %>/*.js',
            dest: '<%= config.dist %>/',
            ext: '.min.js',
            extDot: 'last'
        }]
    }
};