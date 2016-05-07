'use strict';

const rp = require('request-promise'),
    Promise = require('bluebird'),
    bearerToken = require('./bearerToken');

const TIMELINE_URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json';

function getTimeline(token, screenName, pageNo) {
    if (!token) {
        throw TypeError('Empty bearer token');
    }

    let authenticatedRequest = rp.defaults({
        method: 'GET',
        auth: {
            bearer: token
        },
        json: true
    });

    return authenticatedRequest({
        uri: TIMELINE_URL,
        qs: {
            screen_name: screenName,
            count: 200,
            page: pageNo
        }
    });
}

exports.get = function (screenName) {
    let tokenPromise = bearerToken.obtain();

    return Promise.join(tokenPromise, screenName, 1, getTimeline);
};
