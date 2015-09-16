var _ = require('lodash');
var path = require('path');
var config = require('../util/config');
var marked = require('marked');
var renderer = new marked.Renderer();
var classes = {
    2: ' class="page-title title lg"',
    3: ' class="title"',
    4: ' class="title sm"'
};

renderer.heading = function (text, level) {
    // level - Increment and append to <h> with class by lookup, or reinsert level if no class found
    // id - Anchor link target; Take out non-alphanumeric characters from header ex. '(', then kebab case
    var compiled = _.template('<h${ lvl } id="${ id }">${ txt }</h${ lvl }>');
    return compiled({
        lvl: ++level + (classes[level] || ''),
        id: text.toLowerCase().replace(/[^\w ]/g, '').replace(/ /g, '-'),
        txt: text
    });
};

// To be rewritten to hit README.md
var readme = new RegExp(/https:\/\/github\.com\/rackerlabs\/encore-ui(?:$|#[\w-]*$)/);
renderer.link = function (href, title, text) {
    var click = '';

    // In case <a> with no href
    href = href || '';

    // Rewrite relative link md files for use with the guides controller
    if (href.substr(0, 1) === '.' && href.indexOf('.md') !== -1) {
        href = '#/guides' + href.substr(href.lastIndexOf('/')).replace('.md', '');
    }

    // Rewrite Github root doc to README
    else if (readme.test(href)) {
        href = href.replace('https://github.com/rackerlabs/encore-ui', '#/guides/README');
    }

    // Overwrite local anchor link ids so they match custom rendered header ids
    else if (href.indexOf('#') === 0) {
        // Add angular click handler
        // `id` is href stripped of everything except alpha, numeric, and hypens
        // Keep empty href to get link style
        click = ' ng-click="vm.scrollTo(\'' + href.replace(/[^\w-]/g, '') +'\')"';
        href = '';
    }

    // Rewrite any other relative links
    else if (href.substr(0, 1) === '.') {
        href = 'https://github.com/rackerlabs/encore-ui/blob/master' + href.substr(href.indexOf('/'));
    }

    var compiled = _.template('<a href="${ href }"${ click }>${ text }</a>');
    return compiled({
        href: href,
        click: click,
        text: text
    });
};

function convertMarkdown (content) {

    // Replace the [![Build Status...]] line with an empty string
    // (note that /m makes $ match newlines
    content = content.replace(/\[\!\[Build Status(.*)$/m, '');

    // The README contains a link to the demo app, which leads the user off
    // this page and to the github demo app. Let's remove that. Strip out "# Demo App",
    // and everything that follows it until the next section header "#"
    // (Note that .* won't work because . doesn't match newlines. [\s\S] is equivalent
    content = content.replace(/# Demo App[\s\S]*?(#[\s\S]*)/mg, '$1');

    // Renderer handles custom link and header writing
    return marked(content, { renderer: renderer });
}

module.exports = {
    demohtml: {
        options: {
            process: function () {
                // this function intentionally left blank (gets replaced by build task)
            }
        },
        files: [{
            expand: true,
            src: ['**/*.html', '*.js'],
            cwd: 'demo/',
            dest: '<%= config.docs %>'
        }]
    },
    demoassets: {
        files: [
            {
                expand: true,
                //Don't re-copy html files, we process those
                src: ['**/**/*', '!**/*.html', '!*.js'],
                cwd: 'demo/',
                dest: '<%= config.docs %>'
            },
            {
                expand: true,
                cwd: 'src',
                src: ['**/docs/examples/*.html'],
                dest: 'demo/examples/',
                rename: function (moduleName, filePath) {
                    // SOURCE: src/<component>/docs/examples/<example>.html
                    // DESTINATION: demo/examples/<component>/<example>.html
                    return '' + moduleName + filePath.replace('docs/examples/', '');
                }
            }
        ]
    },
    demopolyfills: {
        files: [{
            src: 'utils/browser-helpers.js',
            dest: 'demo/browser-helpers.js'
        }]
    },
    demomarkdown: {
        files: [{
            src: 'README.md',
            dest: 'demo/readme.html'
        }, {
            expand: true,
            src: '*.md',
            dest: 'demo/guides/rendered',
            ext: '.html'
        }, {
            expand: true,
            cwd: 'guides',
            src: '*.md',
            dest: 'demo/guides/rendered',
            ext: '.html'
        }],
        options: {
            process: convertMarkdown
        }
    },
    coverage: {
        files: [{
            expand: true,
            src: ['Phantom*/**/*'],
            cwd: 'coverage/',
            dest: '<%= config.docs %>/coverage/',
            // remove 'Phantom' from path
            rename: function (dest, src) {
                // convert src to array
                var templatePath = src.split(path.sep);

                // remove the first directory ('Phantom ...')
                templatePath.shift();

                // return dest + the rest of the path as a string
                return dest + templatePath.join(path.sep);
            }
        }]
    },
    rxPageObjects: {
        expand: true,
        flatten: true,
        src: 'utils/rx-page-objects/*.tgz',
        dest: '<%= config.dist %>/'
    },
    bower: {
        files: [{
            expand: true,
            cwd: '<%= config.dist %>/',
            src: '**/*',
            dest: '<%= config.bower %>/',
            // remove version number from file names
            rename: function (dest, src) {
                // will catch the following
                // -0.10.11.min.js
                // -0.9.22.css
                // -0.1.1.js
                // -10.11.11.min.js
                var strippedVersion = src.replace(config.versionRegEx, '');

                return dest + strippedVersion;
            }
        }, {
            src: 'bower.json',
            dest: '<%= config.bower %>/bower.json'
        }, {
            expand: true,
            cwd: '<%= config.exportableStyles %>/',
            src: '*.less',
            dest: '<%= config.bower %>/less/'
        }]
    }
};
