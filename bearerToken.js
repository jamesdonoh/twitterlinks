'use strict';

const rp = require('request-promise');

const TOKEN_URL = 'https://api.twitter.com/oauth2/token';

function requestToken(key, secret) {
    let credentials = `${key}:${secret}`,
        base64encode = (str) => new Buffer(str).toString('base64'),
        authHeader = 'Basic ' + base64encode(credentials);

    let options = {
        uri: TOKEN_URL,
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'grant_type=client_credentials',
        json: true
    };

    return rp(options)
        .then(parsedBody => parsedBody.access_token);
}

exports.obtain = function () {
    let key = process.env.TWITTER_KEY,
        secret = process.env.TWITTER_SECRET;

    if (!key || !secret) {
        console.error('Please set TWITTER_KEY and TWITTER_SECRET');
        process.exit(1);
    }

    return requestToken(key, secret);
}
