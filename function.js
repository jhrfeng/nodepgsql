var mime = require('mime');
var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var loadfile = require('./loadfile');
var crefile = require('./crefile')
//var mime = require('./mime').mime;

function select(client,result, request, response)
{
	client.query('select relname from pg_stat_user_tables;', function(error, results){
	 // client.query('select * from days_etl_log;', function(error, results){
		if(error){
			 client.end();
			 return console.error('error running query', err);
		}
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(results["rows"]));
		response.end();

	});
}

function download(filenamedir, res){
  //接收文件目录数组
  var indexPath = filenamedir;
  var type="txt";
  fs.exists(indexPath, function(exists){
  	if( !exists){
  		throw err;
  	}else{

  		var file = 'D:/test/test1.txt';

 		var filename = 'test1.txt';
  		var mimetype = mime.lookup(file);
  		console.log('mimetype is .....'+mimetype);

  		res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  		res.setHeader('Content-type', mimetype);

  		var filestream = fs.createReadStream(file);
  		console.log('downliad file  is start ...........');
  		filestream.pipe(res);
		filestream.on('finish', function() {
     		filestream.close(cb);  // close() is async, call cb after close completes.
     	});

  		
/*  		var file = fs.createWriteStream(filenamedir);
  
  			res.pipe(file);
  			file.on('finish', function() {
     			 file.close(cb);  // close() is async, call cb after close completes.
     			 });
    		*/

  	    /*  fs.readFile(indexPath, 'binary', function(err, file){
				if(err){
					res.writeHead(500, {'Content-Type': 'text/plain'});
				}else{
					res.writeHeader(200, {'Content-type': 'text/plain'});
					res.write(file, 'binary');
					res.end();
				}
			});*/
  	}
  })
}

function index(client, result, req, res){
	fs.readFile('./html/index.html', function(err, html){
		if(err){ throw err;}
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
}

//this creatf function name is create_tables_file
function creatf(client, result, req, res){
    var POST_TB = {};
    var POST_PACKAGE = {};
    if (req.method == 'POST') {
        req.on('data', function(data){
          data = data.toString();
          data = data.split('&');
          var regExp = /tb([0-9]+)/;
          var tb_index = 0;
          for(var i=0; i <data.length; i++){
            var _data = data[i].split("=");
            var res = regExp.test(_data[0]);
            if(false == res){
               POST_PACKAGE[_data[0]] = _data[1];
            }else{
               POST_TB[parseInt(tb_index++)] = _data[1];           
            }                          
          }
          crefile.createFile(POST_TB, POST_PACKAGE, client);           
        });
    
        req.on('end', function () {
          console.log("handle is end ..................");
           
        });
       
    }

}

exports.select = select;
exports.download = download;
exports.index = index;
exports.creatf = creatf;
