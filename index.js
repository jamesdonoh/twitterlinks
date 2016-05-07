'use strict';

const _ = require('lodash'),
    Promise = require('bluebird'),
    timeline = require('./timeline'),
    followRedirect = require('./redirect');

if (process.argv.length < 3) {
    console.log('Please specify a username');
    process.exit(1);
}

const screenName = process.argv[2];

const getTweets = (timeline) => _.map(timeline, 'text');

function extractUrls(tweets) {
    const urlMatches = (tweet) => tweet.match(/https?:\/\/[^ ]+/g);

    return _(tweets)
        .map(urlMatches)
        .filter()
        .flatten()
        .value();
}

function followRedirects(links) {
    return Promise.map(links, followRedirect);
}

function printUrls(urls) {
    console.dir(urls, { colors: true });
}

timeline.get(screenName)
    .then(getTweets)
    .then(extractUrls)
    .then(followRedirects)
    .then(printUrls);
