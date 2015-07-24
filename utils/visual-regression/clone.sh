#! /bin/bash
[ "${TRAVIS_SECURE_ENV_VARS}" == "false" ] && exit 0;

# keep tricky cairo dependencies for visual regression isolated to Travis builds only
sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
npm install snappit-mocha-protractor@0.0.8

CLONE_URL="https://${ghToken}@github.com/rackerlabs/encore-ui-screenshots.git";
git submodule add -f ${CLONE_URL} screenshots > /dev/null 2>&1;
