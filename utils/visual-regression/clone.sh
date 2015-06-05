#! /bin/bash
[ "${TRAVIS_SECURE_ENV_VARS}" == "false" ] && exit 0;

CLONE_URL="https://${ghToken}@github.com/rackerlabs/encore-ui-screenshots.git";
git submodule add -f ${CLONE_URL} screenshots > /dev/null 2>&1;
