var pageObjectHeader = '/*jshint node:true*/\nvar Page = require(\'astrolabe\').Page;\n';

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
        dest: '<%= config.dist %>/<%= config.fileNameTpl %>.js'
    },
    rxPageObjects: {
        options: {
            // Replace all Astrolabe requires with a single one up top
            banner: pageObjectHeader,
            process: function (src) {
                return src.replace(pageObjectHeader, '');
            }
        },
        src: ['src/*/*.page.js'],
        dest: 'utils/rx-page-objects/index.js'
    },
    tmpLess: {
        // The `less` task can't properly create a source map when multiple input
        // files are present. We concat them all into a temp file here, and it
        // can work from that instead
        src: ['demo/bower_components/pure/grids-min.css', 'src/*/*.less', '!src/styles/*.less'],
        dest: '<%= config.tmpLess %>'
    }
};
