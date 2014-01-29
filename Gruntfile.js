/* jshint node:true */
'use strict';

function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
}

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
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

    grunt.util._.extend(config, loadConfig('./grunt-tasks/options/'));
    grunt.initConfig(config);
};