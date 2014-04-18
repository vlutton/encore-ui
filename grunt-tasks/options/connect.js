var config = require('../util/config');

module.exports = {
    options: {
        port: 9001,
        hostname: 'localhost',
    },
    proxies: [
        {
            context: '/identity',
            host: 'identity.api.rackspacecloud.com',
            port: 443,
            https: true,
            xforward: true,
            changeOrigin: false,
            rewrite: {
                '/identity': '/v2.0/'
            }
        }
    ],
    dist: {
        options: {
            middleware: function (cnct) {
                return [
                    config.proxyRequest,
                    config.modRewrite(['!\\.\\w+$ /']),
                    config.liveReloadPage,
                    config.mountFolder(cnct, '.tmp'),
                    config.mountFolder(cnct, config.docs)
                ];
            },
            livereload: 1337
        }
    },
    keepalive: {
        options: {
            keepalive: true,
            base: '<%= config.docs %>'
        }
    }
};
