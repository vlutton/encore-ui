#! /bin/bash

[ "${TRAVIS_SECURE_ENV_VARS}" == "false" ] && exit 0
[ "${TRAVIS_BRANCH}" == "false" ] && exit 0

PUSH_URL="https://${ghToken}@github.com/comeatmebro/encore-ui-screenshots.git"
ENCORE_SHA=`echo $TRAVIS_COMMIT_RANGE | cut -c44-51`
BRANCH=SHA-$ENCORE_SHA
cd screenshots
git checkout -b $BRANCH
git config user.email "comeatmebro@users.noreply.github.com"
git config user.name "comeatmebro"
git add -A
git status -sb
git commit -m "chore(screenshots): Visual diff against $ENCORE_SHA"
git push "${PUSH_URL}" $BRANCH > /dev/null 2>&1;
