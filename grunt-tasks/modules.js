var path = require('path');

module.exports = function (grunt) {
    var markdown = require('marked');

    function enquote (str) {
        return '\'' + str + '\'';
    }

    //Common encore.ui module containing all modules for src and templates
    //findModule: Adds a given module to config
    var foundModules = {};
    function findModule (name) {
        if (foundModules[name]) {
            return;
        }
        foundModules[name] = true;

        function breakup (text, separator) {
            return text.replace(/[A-Z]/g, function (match) {
                return separator + match;
            });
        }

        function ucwords (text) {
            return text.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
                return $1.toUpperCase();
            });
        }

        function parseMarkdown (text) {
            return markdown(text);
        }

        function convertDateFormat (dateStr) {
            if (!dateStr) {
                return;
            }

            // dateStr recieved as "2015-02-20 13:34:24 -0600"
            // Covert to "Fri Feb 20 2015 13:34:24 GMT-0600 (CST)" then split into array
            var d = new Date(dateStr).toString().split(' ');

            // Return as "Feb 20, 2015 @ 13:34:24 (UTC-0600)"
            return [
                d[1], parseInt(d[2]) + ',', d[3], '@', d[4].substr(0, 5), d[5].replace('GMT', '(UTC') + ')'].join(' ');
        }

        var tplJsFileGlobs = [
            'templates/' + name + '/templates/*.html',
            'templates/' + name + '/docs/example/*.html'
        ];

        var module = {
            name: name,
            moduleName: enquote('encore.ui.' + name),
            displayName: ucwords(breakup(name, ' ')),
            srcFiles: grunt.file.expand('src/' + name + '/!(*.spec|*.page|*.exercise).js'),
            tplFiles: grunt.file.expand('src/' + name + '/*.tpl.html'),
            tplJsFiles: grunt.file.expand(tplJsFileGlobs),
            dependencies: dependenciesForModule(name),
            stability: stabilities[name],
            lastModified: convertDateFormat(lastModified[name]),
            rawLastModified: lastModified[name],
            docs: {
                md: grunt.file.expand('src/' + name + '/*.md').map(grunt.file.read).map(parseMarkdown).join('\n'),
                js: grunt.file.expand('src/' + name + '/docs/!(*.midway).js').map(grunt.file.read).join('\n'),
                html: grunt.file.expand('src/' + name + '/docs/' + name + '.html').map(grunt.file.read).join('\n'),
                less: grunt.file.expand('src/' + name + '/*.less').map(grunt.file.read).join('\n'),
                midway: grunt.file.expand('src/' + name + '/docs/*.midway.js').map(grunt.file.read).join('\n') +
                    '\n// this component\'s exercise.js file, if it exists, is below\n\n' +
                    grunt.file.expand('src/' + name + '/*.exercise.js').map(grunt.file.read).join('\n')
            }
        };

        module.dependencies.forEach(findModule);
        grunt.config('config.modules', grunt.config('config.modules').concat(module));
    }

    function dependenciesForModule (name) {
        var deps = [];

        grunt.file.expand('src/' + name + '/*.js')
            .map(grunt.file.read)
            .forEach(function (contents) {
                //Strategy: find where module is declared,
                //and from there get everything inside the [] and split them by comma
                var moduleDeclIndex = contents.indexOf('angular.module(');
                var depArrayStart = contents.indexOf('[', moduleDeclIndex);
                var depArrayEnd = contents.indexOf(']', depArrayStart);
                var dependencies = contents.substring(depArrayStart + 1, depArrayEnd);
                dependencies.split(',').forEach(function (dep) {
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

    var lastModified = {};
    var stabilities = {};
    function moduleMetaData () {

        // Like Math.max, but for strings too!
        function maxString (str1, str2) {
            return (str1 > str2 ? str1 : str2);
        }

        var execFunc = require('child_process').execSync || require('execSync').exec;
        var command, lines, line, stability, module, dateStr;

        // Run command returning stdout as array of string per line
        function exec (command) {
            var result = execFunc(command);

            // Account for native execSync result vs execSync module result
            result = ('stdout' in result ? result.stdout : result.toString());
            return result.trim().split('\n');
        }

        function getStabilities () {
            command = 'find src -name README.md | xargs grep "stability"';
            lines = exec(command);

            while ((line = lines.pop()) !== undefined) {
                // Line looks like "src/configs/README.md:[![stable](http://badges.github.io/stability-badges/dist..."
                line = line.split('/', 3);
                module = line[1];
                stability = line[2].split(']', 1)[0].split('[', 3)[2];

                stabilities[module] = stability;
            }
        }

        function getLastModified () {
            // Get a list of directories in the branch under the 'src/' dir; These are the modules
            command = 'ls -1 src';
            lines = exec(command);

            while ((module = lines.pop()) !== undefined) {

                // Get the date of the most recently modified file
                command = 'git log -1 --format="%ai" -- src/' + module;
                dateStr = exec(command);

                // Store the most recent date
                lastModified[module] = maxString(lastModified[module] || '', dateStr[0]);
            }
        }

        getLastModified();
        getStabilities();
    }

    grunt.registerTask('modules', 'Auto-discover EncoreUI modules and load their details into config', function () {
        var _ = grunt.util._;

        moduleMetaData();

        grunt.file.expand({ filter: 'isDirectory', cwd: '.' }, 'src/!(styles)')
            .forEach(function (dir) {
                findModule(dir.split('/')[1]);
            });

        var modules = grunt.config('config.modules');
        // remove any modules that don't have javascript
        var jsModules = _.filter(modules, function (module) {
            return module.srcFiles.length > 0;
        });
        grunt.config('config.srcModules', _.pluck(jsModules, 'moduleName'));

        // remove any modules that don't have templates
        var tplModules = _.pluck(modules, 'tplJsFiles').filter(function (tpls) {
            return tpls.length > 0;
        });

        // remove first two directories from templates
        tplModules = tplModules.map(function (tpls) {
            tpls = tpls.map(function (tplPath) {
                // convert path to array
                var templatePath = tplPath.split(path.sep);

                // remove the first two directories ('templates' and the module name)
                templatePath.shift();
                templatePath.shift();

                // return the rest of the path as a string
                return enquote(templatePath.join(path.sep));
            });

            return tpls;
        });

        grunt.config('config.tplModules', tplModules);

        grunt.config('config.demoModules',
            modules.filter(function (module) {
                return module.docs.md;
            })
            .sort(function (a, b) {
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

        // Set the concat task to concatenate the given src modules
        grunt.config('concat.dist.src', grunt.config('concat.dist.src').concat(srcFiles));

        // Set the concat-with-templates task to concat the given src & tpl modules
        grunt.config('concat.distTpls.src', grunt.config('concat.distTpls.src').concat(srcFiles).concat(tplJsFiles));

        // Set the copy task to process via grunt template
        grunt.config('copy.demohtml.options.process', grunt.template.process);
    });
};
