var level = require('level');
var sub = require('level-sublevel');
var db = sub( level('./tmp/assoc.db', { valueEncoding: 'json' }) );

var rows = require('./115_data.json');

var spaces = rows.map(function(row) {
    return row.value.type === 'hackerspace' && row.key;
}).filter(Boolean);

var tools = rows.map(function(row) {
    return row.value.type === 'tool' && row.key;
}).filter(Boolean);

var hackers = rows.map(function(row) {
    return row.value.type === 'hacker' && row.key;
}).filter(Boolean);

db.batch(rows.map(function(row) {
    return {
        type: 'put',
        key: row.key,
        value: row.value
    };
}));

// setInterval(function() {
//     // create a new hacker
//     var name = Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
//     console.log(name);
//     var space = spaces[Math.floor(Math.random() * spaces.length)];
//     db.put(name, {
//         type: 'hacker',
//         name: name,
//         hackerspace: space
//     });
//     hackers.push(name);
// }, 500);

// setInterval(function() {
//     // create a new hackerspace
//     var name = 'x' + Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
//     db.put(name, {
//         type: 'hackerspace',
//         name: name
//     });
//     spaces.push(name);
// }, 10 * 1000);

// setInterval(function() {
//     // create new tool usage
//     var key = Math.floor(Math.random() * Math.pow(16, 8)).toString(16);
//     var tool = tools[Math.floor(Math.random() * tools.length)];
//     var hacker = hackers[Math.floor(Math.random() * hackers.length)];
//     var min = Math.floor(Math.random() * 20 + 1);
//     db.put(key, {
//         type: 'usage',
//         tool: tool,
//         minutes: min,
//         hacker: hacker
//     });
// }, 500);

var assoc = require('level-assoc')(db);
assoc.add('hackerspace')
    .hasMany('hackers', ['type', 'hacker'])
    .hasMany('tools', ['type', 'tool']);
assoc.add('hacker')
    .hasMany('projects', ['type', 'project'])
    .hasMany('usage', ['type', 'usage']);
assoc.add('tool')
    .hasMany('usage', ['type', 'usage']);
module.exports = assoc;
