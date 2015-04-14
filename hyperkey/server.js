var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');  // static server
var trumpet = require('trumpet');  // html templates
var fs = require('fs');
var db = require('./db.js');
var render = require('./render/message.js');
var tracker = require('level-track')(db);
// var liveStream = require('level-livefeed')(db);  // db update stream
var shoe = require('shoe');  // websockets

var port = process.argv[2] || 8000;

// server
var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        var tr = trumpet();
        var range = [ 'message', 'message~' ];

        var messages = tr.select('#messages');
        messages.setAttribute('data-start', range[0]);
        messages.setAttribute('data-end', range[1]);

        db.createReadStream({ start: range[0], end: range[1] })
            .pipe(render())
            .pipe(messages.createWriteStream())
        ;
        readStream('index.html').pipe(tr).pipe(res);
    }
    else ecstatic(req, res);
});
server.listen(port);
console.log('listening on port ' + port);

// websockets
var sock = shoe(function (stream) {
    stream.pipe(tracker()).pipe(stream);
});
sock.install(server, '/sock');

function readStream (file) {
    return fs.createReadStream(__dirname + '/static/' + file);
}
