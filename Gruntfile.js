/* jshint node:true */
'use strict';

function loadConfig (path, grunt) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', { cwd: path }).forEach(function (option) {
        key = option.replace(/\.js$/,'');
        var val = require(path + option);

        // Instead of just exporting a plain object, the files
        // in grunt-tasks/options/ can also export a function, which
        // will receive `grunt` as its argument
        if (typeof val === 'function') {
            object[key] = val(grunt);
        } else {
            object[key] = val;
        }
    });

    return object;
}

module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', '!grunt-lib-phantomjs'] });
    grunt.loadTasks('grunt-tasks');

    // make sure grunt doesn't fail if localConfig not there
    var localConfig;
    try {
        localConfig = require('./localConfig.js');
    } catch (e) {
        localConfig = {};
    }

    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,
        config: require('./grunt-tasks/util/config.js'),
        localConfig: localConfig
    };

    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/', grunt));
    grunt.initConfig(config);
};
