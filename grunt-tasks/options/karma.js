module.exports = {
    options: {
        configFile: 'karma.conf.js'
    },
    dev: {
        singleRun: false,
        autoWatch: true
    },
    watch: {
        background: true
    },
    continuous: {
        singleRun: true
    },
    jenkins: {
        singleRun: true,
        colors: false,
        reporters: ['dots', 'junit'],
        browsers: ['Chrome', 'ChromeCanary', 'Firefox', 'Opera',
            '/Users/jenkins/bin/safari.sh', '/Users/jenkins/bin/ie11.sh']
    },
    travis: {
        singleRun: true,
        browsers: ['Firefox']
    }
};