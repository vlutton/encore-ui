module.exports = {
    app: 'src',
    dist : 'dist',
    liveReloadPage: require('connect-livereload')({ port: 35729 }),
    mountFolder : function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    },
    fileName: 'encore-ui',
    fileNameCustom: '<%= fileName %>-custom',
    moduleName: 'encore.ui',
    modules: [],
    meta: {
        modules: 'angular.module("<%= config.moduleName %>", [<%= config.srcModules %>]);',
        tplmodules: 'angular.module("<%= config.moduleName %>.tpls", [<%= config.tplModules %>]);',
        all: 'angular.module("<%= config.moduleName %>", ["<%= config.moduleName %>.tpls", <%= config.srcModules %>]);',
        banner: [
            '/*',
            ' * <%= pkg.name %>',
            ' * <%= pkg.homepage %>\n',
            ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
            ' * License: <%= pkg.license %>',
            ' */\n'
        ].join('\n')
    }
};