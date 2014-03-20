module.exports = {
    app: 'src',
    build: 'build',
    dist: 'build/dist', // used for js/css files pushed to CDN/bower
    docs: 'build', // used for demo, coverage, jsdocs files to go to gh-pages (same a 'build' folder, but a
                   // different variable in case they're later changed)
    bower: 'bower',
    liveReloadPage: require('connect-livereload')({ port: 1337 }),
    proxyRequest: require('grunt-connect-proxy/lib/utils').proxyRequest,
    modRewrite: require('connect-modrewrite'),
    mountFolder: function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    },
    fileName: 'encore-ui-<%= pkg.version %>',
    fileNameTpl: 'encore-ui-tpls-<%= pkg.version %>',
    moduleName: 'encore.ui',
    modules: [],
    meta: {
        modules: 'angular.module(\'<%= config.moduleName %>\', [<%= config.srcModules %>]);',
        tplmodules: 'angular.module(\'<%= config.moduleName %>.tpls\', [<%= config.tplModules %>]);',
        all: 'angular.module(\'<%= config.moduleName %>\', ' +
            '[\'<%= config.moduleName %>.tpls\', <%= config.srcModules %>]);',
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
