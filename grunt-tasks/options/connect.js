var config = require('../util/config');
var modRewrite = require('connect-modrewrite');
var proxyRequest = require('grunt-connect-proxy/lib/utils').proxyRequest;
var liveReloadPort = 1337;
var liveReloadPage = require('connect-livereload')({ port: liveReloadPort });

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = {
    options: config.server,
    proxies: [
        {
            context: '/api/identity',
            host: 'identity.api.rackspacecloud.com',
            port: 443,
            https: true,
            xforward: true,
            changeOrigin: false,
            rewrite: {
                '/api/identity': '/v2.0/'
            }
        },
        {
            context: '/encore-ui',
            host: 'localhost',
            port: 9001,
            rewrite: {
                '/encore-ui': '/'
            }
        }
    ],
    dist: {
        options: {
            middleware: function (cnct) {
                return [
                    proxyRequest,
                    modRewrite([
                        'login.html /login.html [L]',
                        '^/login#* /login.html',
                        '^/index.html\/.* /index.html [L]',
                        '!\\.[0-9a-zA-Z_-]+$ /index.html [L]'
                    ]),
                    liveReloadPage,
                    mountFolder(cnct, '.tmp'),
                    mountFolder(cnct, config.dir.docs)
                ];
            },
            livereload: liveReloadPort
        }
    },
    keepalive: {
        options: {
            keepalive: true,
            base: '<%= config.dir.docs %>'
        }
    }
};
