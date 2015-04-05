var shoe = require('shoe');
var render = require('./render/message.js')();
var sock = shoe('/sock');

// The render instance will output data to the websocket to keep track of the
// keys and ranges to track updates automatically.
render.pipe(sock).pipe(render.sortTo('#messages'));
