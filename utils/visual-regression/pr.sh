#! /bin/bash

[ "${TRAVIS_SECURE_ENV_VARS}" == "false" ] && exit 0;
[ "${TRAVIS_BRANCH}" == "false" ] && exit 0;

ENCORE_SHA=`echo $TRAVIS_COMMIT_RANGE | cut -c44-51`
BRANCH=SHA-$ENCORE_SHA
node utils/screenshots-pr.js ${TRAVIS_REPO_SLUG}#${TRAVIS_PULL_REQUEST} comeatmebro:$BRANCH > /dev/null 2>&1;
