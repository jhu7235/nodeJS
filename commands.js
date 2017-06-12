let fs = require('fs');
let request = require('request');

function pwd(args, done) {
	let output = process.env.PWD
 	done(output);

}

function curl(args, done) {
	let url = args[0];
	request(url, function(err, res, body) {
		if (err) throw err;
		done(body);
	})
}

function ls(args, done) {
	let output = '';
	fs.readdir('.', function(err, files) {
	  if (err) throw err;
	  files.forEach(function(file) {
	    output += file.toString() + "\n";
	  })
		done(output);
	});
}

function cat(stdin, args, done) {
	console.log('START CAT');
	let output = '';
	if (typeof args === 'string') {
		output = args;
		done(output, stdin);
	} else {
		args = args.map(function(ele , index) {
			fs.readFile(ele, function(err,data) {
				if (err) throw err;
				output += data + '\n';
				if (index === args.length - 1 ) {
					done(output, stdin);
				}
			});
		});
	}
}

function grep(stdin, args, done) {
	let match = args[0];
	let path = args[1];
	if (typeof args !== 'string') {
		fs.readFile(path, function (err, data) {
			if (err) throw err;
			let output = data.toString();
			output = output.split('\n').filter(function (line) {
				return line.includes(match);
			}).join('\n');
			done(output, stdin);
		});
	} else {
		match = stdin[0];
		let output = args.split('\n').filter(function (line) {
				return line.includes(match);
		}).join('\n');
		done(output, stdin.slice(1));
	}
}

function head(stdin, path, done) {
	if (typeof path === 'string') {
		var output = path.split('\n').slice(0, 5).join('\n');
		done(output, stdin);
	} else {
		fs.readFile(path[0], function(err, data) {
			if (err) {throw err;}
			data = data.toString();
			data = data.split('\n').slice(0, 5).join('\n');
			done(data, stdin);
		});
	}
}

function tail(path, done) {
	fs.readFile(path[0], function(err, data) {
		if (err) {throw err;}
		data = data.toString();
		data = data.split('\n').reverse().slice(0, 5).reverse().join('\n');
		done(data);
	});
}

function sort(path, done) {
	fs.readFile(path[0], function(err, data) {
		if (err) {throw err;}
		data = data.toString();
		data = data.split('\n').sort().join('\n');
		done(data);
	});
}

function uniq(path, done) {
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
		done(data);
	});
}

function date(args, done) {
 	let time = new Date().getTime();
 	let date = new Date(time);
 	let output = date.toString();
	done(output);
}

function echo(args, done) {
	args = args.map(function(x) {
		if(x[0] === '$') {
			return process.env[x.slice(1)];
		} else {
			return x;
		}
	});
	args = args.join(' ');
	done(args);
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
module.exports.curl = curl;
module.exports.grep = grep;
