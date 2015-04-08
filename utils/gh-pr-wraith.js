/*jshint node:true*/
var https = require('https');

var prNumber = process.argv[2];
var cdnUrl = 'http://eb4d4842ea70055541c8-b6a3ba129b5eb76af13f4d17e4c1a53b.r51.cf5.rackcdn.com/';

var data = {
    'body': '[Wraith UI diff](' + cdnUrl + prNumber + '/gallery.html)'
};

var options = {
    hostname: 'api.github.com',
    path: '/repos/rackerlabs/encore-ui/issues/' + prNumber + '/comments',
    method: 'POST',
    headers: {
        'User-Agent': 'Encore-Wraith-Script',
        'Content-Type': 'application/json',
        'Authorization': 'token ' + process.env.ghToken
    }
};

var req = https.request(options, function (res) {
    if (res.statusCode !== 201) {
        console.error('statusCode: ', res.statusCode);
        console.error('headers: ', res.headers);
        process.exit(1);
    }
});

req.write(JSON.stringify(data));

req.on('error', function (e) {
    console.error(e);
});

req.end();
