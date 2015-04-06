var shoe = require('shoe');
var sock = shoe('/sock');
var rassoc = require('render-assoc');

var render = require('./render/hackerspace.js')();

render.pipe(sock).pipe(rassoc(render, {
    hacker: require('./render/hacker.js')
}));

render.appendTo('#hackerspaces');
