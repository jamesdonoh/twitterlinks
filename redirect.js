'use strict';

var rp = require('request-promise');

module.exports = function (url) {
    let options = {
        url: url,
        resolveWithFullResponse: true
    };

    return rp(options)
        .then(response => response.request.uri.href);
};
