var shoe = require('shoe');
var sock = shoe('/sock');
var rassoc = require('render-assoc');

var render = require('./370_hackerspace.js')();
render.pipe(sock).pipe(rassoc(render, {
    hacker: require('./420_hacker.js')
}));
render.appendTo('#hackerspaces');

// browserify -t brfs 760_browser.js > static/bundle.js
// node 620_server.js
// http://localhost:5000