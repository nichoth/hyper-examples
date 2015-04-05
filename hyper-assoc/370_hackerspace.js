var hyperkey = require('hyperkey');
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/300_hackerspace.html');
var hacker = require('./420_hacker.js');

module.exports = function() {
    return hyperkey(html, function(row) {
        return {
            '.name': {
                _text: row.name,
                href: '/' + row.name
            },
            '.hackers': (function(stream) {
                return {
                    'data-start': stream.startKey,
                    'data-end': stream.endKey,
                    _html: stream.pipe(hacker())
                };
            })(row.hackers())
        };
    });
};