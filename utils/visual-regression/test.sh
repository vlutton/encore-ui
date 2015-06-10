#! /bin/bash

[ "${TRAVIS_SECURE_ENV_VARS}" == "false" ] && exit 0;
[ "${TRAVIS_BRANCH}" == "false" ] && exit 0;

./node_modules/.bin/protractor protractor.visual.regression.conf.js
