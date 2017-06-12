// Output a prompt
var commands = require('./commands.js');

function done (output, args) {
  if (args[0]) {
    // pipe into next cmd
    console.log('args in done: ', args);
    commands[args[0][0].toLowerCase()]( args[0].slice(1), output, done);
  } else {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }
}

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim(); // remove the newline
  var cmdList = cmdString.split(/\s*\|\s*/g);
  let args = cmdList.map(function (el) {
   return el.split(' ');
  });
  commands[args[0][0].toLowerCase()]( args.slice(1), args[0].slice(1), done);
});

