module.exports = function(grunt) {
    var markdown = require('node-markdown').Markdown;

    //Common encore.ui module containing all modules for src and templates
    //findModule: Adds a given module to config
    var foundModules = {};
    function findModule(name) {
        if (foundModules[name]) {
            return;
        }
        foundModules[name] = true;

        function breakup(text, separator) {
            return text.replace(/[A-Z]/g, function (match) {
                return separator + match;
            });
        }

        function ucwords(text) {
            return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        }

        function enquote(str) {
            return '"' + str + '"';
        }

        var module = {
            name: name,
            moduleName: enquote('encore.ui.' + name),
            displayName: ucwords(breakup(name, ' ')),
            srcFiles: grunt.file.expand('src/'+name+'/!(*.spec).js'),
            tplFiles: grunt.file.expand('src/'+name+'/*.tpl.html'),
            tplJsFiles: grunt.file.expand('templates/'+name+'*.html'),
            tplModules: grunt.file.expand('templates/'+name+'*.html').map(enquote),
            dependencies: dependenciesForModule(name),
            docs: {
                md: grunt.file.expand('src/'+name+'/*.md').map(grunt.file.read).map(markdown).join('\n'),
                js: grunt.file.expand('src/'+name+'/docs/!(*.midway).js').map(grunt.file.read).join('\n'),
                html: grunt.file.expand('src/'+name+'/docs/*.html').map(grunt.file.read).join('\n')
            }
        };

        module.dependencies.forEach(findModule);
        grunt.config('config.modules', grunt.config('config.modules').concat(module));
    }

    function dependenciesForModule(name) {
        var deps = [];

        grunt.file.expand('src/' + name + '/*.js')
            .map(grunt.file.read)
            .forEach(function(contents) {
                //Strategy: find where module is declared,
                //and from there get everything inside the [] and split them by comma
                var moduleDeclIndex = contents.indexOf('angular.module(');
                var depArrayStart = contents.indexOf('[', moduleDeclIndex);
                var depArrayEnd = contents.indexOf(']', depArrayStart);
                var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
                dependencies.split(',').forEach(function(dep) {
                    if (dep.indexOf('encore.ui.') > -1) {
                        var depName = dep.trim().replace('encore.ui.','').replace(/['"]/g,'');

                        if (deps.indexOf(depName) < 0) {
                            deps.push(depName);
                            //Get dependencies for this new dependency
                            deps = deps.concat(dependenciesForModule(depName));
                        }
                    }
                });
            });
        return deps;
    }

    grunt.registerTask('build', 'Create build files', function() {
        var _ = grunt.util._;

        //If arguments define what modules to build, build those. Else, everything
        if (this.args.length) {
            this.args.forEach(findModule);
            grunt.config('config.fileName', grunt.config('config.fileNamecustom'));
        }
        else {
            grunt.file.expand({filter: 'isDirectory', cwd: '.'}, 'src/!(styles)')
                .forEach(function(dir) {
                    findModule(dir.split('/')[1]);
                });
        }

        var modules = grunt.config('config.modules');
        grunt.config('config.srcModules', _.pluck(modules, 'moduleName'));
        grunt.config('config.tplModules', _.pluck(modules, 'tplModules').filter(function(tpls) {
            return tpls.length > 0;
        }));
        grunt.config('config.demoModules',
            modules.filter(function(module) {
                return module.docs.md && module.docs.js && module.docs.html;
            })
            .sort(function(a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }));

        var srcFiles = _.pluck(modules, 'srcFiles');
        var tplJsFiles = _.pluck(modules, 'tplJsFiles');

        //Set the concat task to concatenate the given src modules
        grunt.config('concat.dist.src', grunt.config('concat.dist.src').concat(srcFiles));

        //Set the concat-with-templates task to concat the given src & tpl modules
        grunt.config('concat.distTpls.src', grunt.config('concat.distTpls.src').concat(srcFiles).concat(tplJsFiles));

        //Set the copy task to process via grunt template
        grunt.config('copy.demohtml.options.process', grunt.template.process);

        grunt.task.run(['clean:build', 'less:encore', 'concat', 'ngmin']);
    });
};