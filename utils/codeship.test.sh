#! /bin/bash

set -e

grunt
./node_modules/.bin/protractor protractor.error.conf.js
