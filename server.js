var http = require("http");
var url = require("url");

function start(client,result, route, handle)
{
	http.createServer(function(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("request for "+ pathname + " received");
		route(client,result, handle, pathname , response);
	}).listen(8000);

	console.log("Server has started.");
}


exports.start = start;