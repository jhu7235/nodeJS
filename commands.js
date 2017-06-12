let fs = require('fs');

function pwd() {
 	process.stdout.write(process.env.PWD);
  process.stdout.write('\nprompt > ');
	
}

function ls() {
	fs.readdir('.', function(err, files) {
	  if (err) throw err;
	  files.forEach(function(file) {
	    process.stdout.write(file.toString() + "\n");
	  })
	  process.stdout.write("\nprompt > ");
	});
}

function cat(args) {
	args = args.map(function(ele , index) {
		fs.readFile(ele, function(err,data) {
			if (err) throw err;
			process.stdout.write(data);
			if(index === args.length - 1 ) {
				process.stdout.write("\nprompt > ");
			}
		});
	});
}

function head(path) {
	fs.readFile(path[0], function(err, data) {
		if (err) {throw err;}
		data = data.toString();
		data = data.split('\n').slice(0, 5).join('\n');
		process.stdout.write(data);
	});
}

function tail(path) {
	fs.readFile(path[0], function(err, data) {
		if (err) {throw err;}
		data = data.toString();
		data = data.split('\n').reverse().slice(0, 5).reverse().join('\n');
		process.stdout.write(data);
	});
}

function sort(path) {
	fs.readFile(path[0], function(err, data) {
		if (err) {throw err;}
		data = data.toString();
		data = data.split('\n').sort().join('\n');
		process.stdout.write(data);
	});
}

function uniq(path) {
	fs.readFile(path[0], function(err, data) {
		if (err) {throw err;}
		data = data.toString();
		data = data.split('\n');
		data = data.map( function( line, index, arr ) {
			if(line === arr[index-1]) {
				return null;
			} else {
				return line;
			}
		});
		data = data.filter(function(line) {
			if(line !== null) {
				return true;
			}
		});
		data = data.join('\n');
		process.stdout.write(data);
	});
}

function date() {
 	let time = new Date().getTime();
 	let date = new Date(time);
 	process.stdout.write(date.toString());
	process.stdout.write("\nprompt > ");
}

function echo(args) {
	args = args.map(function(x) {
		if(x[0] === '$') {
			return process.env[x.slice(1)];
		} else {
			return x;
		}
	});
	args = args.join(' ');
	process.stdout.write(args);
	process.stdout.write("\nprompt > ");
}

module.exports.pwd = pwd;
module.exports.ls = ls;
module.exports.echo = echo;
module.exports.date = date;
module.exports.cat = cat;
module.exports.head = head;
module.exports.tail = tail;
module.exports.sort = sort;
module.exports.uniq = uniq;
