'use strict';

const rp = require('request-promise');

const truncate = (str) => str.substring(0, 70);

module.exports = function (url) {
    let options = {
        url: url,
        resolveWithFullResponse: true
    };

    return rp(options)
        .then(response => response.request.uri.href)
        .catch(err => {
            console.error('Dereferencing %s failed: %s', url, truncate(err.message));
            return url;
        });
};
