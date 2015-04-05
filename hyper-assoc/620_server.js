var http = require('http');
var fs = require('fs');
var trumpet = require('trumpet');
var ecstatic = require('ecstatic')(__dirname + '/static');

var assoc = require('./160_assoc.js');
var render = require('./370_hackerspace.js');

var shoe = require('shoe');
var sock = shoe(function (stream) {
    stream.pipe(assoc.track()).pipe(stream);
});

var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        var tr = trumpet();
        var q = assoc.list('hackerspace');

        var elem = tr.select('#hackerspaces');
        elem.setAttribute('data-start', q.startKey);
        elem.setAttribute('data-end', q.endKey);

        q.pipe(render()).pipe(elem.createWriteStream());
        fs.createReadStream('550_index.html').pipe(tr).pipe(res);
    }
    else ecstatic(req, res);
});
server.listen(8000);
console.log('listening on port 8000');
sock.install(server, '/sock');
