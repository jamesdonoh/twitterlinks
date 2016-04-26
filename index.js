'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    timeline = require('./timeline'),
    followRedirect = require('./redirect');

const URL_PATTERN = /https?:\/\/[^ ]+/g;

function getLinks(data) {
    let matchLinks = tweet => tweet.match(URL_PATTERN);

    return _(data)
        .map('text')
        .map(matchLinks)
        .filter()
        .flatten()
        .value();
}

function followRedirects(links) {
    return Promise.map(links, followRedirect);
}

function printLinks(links) {
    console.log(links);
}

timeline.get('talia')
    .then(getLinks)
    .then(followRedirects)
    .then(printLinks);
