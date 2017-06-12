// Output a prompt
var commands = require('./commands.js');

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var cmd = data.toString().trim(); // remove the newline
  let args = cmd.split(' ');
  commands[args[0].toLowerCase()](args.slice(1));
});
