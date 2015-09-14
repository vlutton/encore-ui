#! /bin/bash

set -e

npm install -g grunt-cli bower

npm install
bower install
./node_modules/.bin/webdriver-manager update --standalone

grunt connect:keepalive &
nohup bash -c "./node_modules/.bin/webdriver-manager start 2>&1 &"
