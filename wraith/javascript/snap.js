/*jshint node:true */
/*globals phantom:true*/
var system = require('system');
var page = require('webpage').create();

if (system.args.length === 3) {
    phantom.exit();
}

var url = system.args[1];
var imageName = system.args[3];
var viewportWidth = system.args[2];
var currentRequests = 0;
var lastRequestTimeout;
var finalTimeout;

page.viewportSize = { width: viewportWidth, height: 1500 };
page.settings = { loadImages: true, javascriptEnabled: true };

// If you want to use additional phantomjs commands, place them here
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko)' +
    ' Chrome/28.0.1500.95 Safari/537.17';

function debouncedRender () {
    clearTimeout(lastRequestTimeout);
    clearTimeout(finalTimeout);

    // If there's no more ongoing resource requests, wait for 1 second before
    // rendering, just in case the page kicks off another request
    if (currentRequests < 1) {
        clearTimeout(finalTimeout);
        lastRequestTimeout = setTimeout(function () {
            console.log('Snapping ' + url + ' at width ' + viewportWidth);
            page.render(imageName);
            phantom.exit();
        }, 2000);
    }

    // Sometimes, straggling requests never make it back, in which
    // case, timeout after 5 seconds and render the page anyway
    finalTimeout = setTimeout(function () {
        console.log('Snapping ' + url + ' at width ' + viewportWidth);
        page.render(imageName);
        phantom.exit();
    }, 5000);
}

page.onResourceRequested = function () {
    currentRequests += 1;
};

page.onResourceReceived = function (res) {
    if (res.stage === 'end') {
        currentRequests -= 1;
        debouncedRender();
    }
};

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Error with page ' + url);
        phantom.exit();
    }
});