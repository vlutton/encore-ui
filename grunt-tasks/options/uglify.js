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
            src: '<%= config.dist %>/*.min.js',
            dest: '<%= config.dist %>/'
        }]
    }
};