var fs = require('fs')
var mime = require('mime');
function filesLoad(filePath, type, res){
	console.log("download is begin..............");
	
	fs.exists(filePath, function(exists){
		if(!exists){
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end();
		}else{
			fs.readFile(filePath, 'binary', function(err, file){
				if(err){
					res.writeHead(500, {'Content-Type': 'text/plain'});
				}else{
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.write(file, 'binary');
					res.end();
				}
			});
		}
	})
}

exports.filesLoad = filesLoad;