var http = require("http");
var url = require("url");

function start(client,result, route, handle)
{
	http.createServer(function(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("request for "+ pathname + " received\n");
		route(client,result, handle, pathname , request, response);
	}).listen(8000);

	console.log("Server has started.");
}


exports.start = start;