function route(client,result, handle, pathname, response){
	console.log("About a to route a request for "+ pathname);
    // Website you wish to allow to connect
  //  response.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.114:8000');
     response.setHeader('Access-Control-Allow-Origin', '*');


    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    //res.setHeader('Access-Control-Allow-Credentials', true);

	if(typeof handle[pathname] === 'function'){
		console.log('pathname is '+ pathname);
		if(pathname == '/download'){
			handle[pathname]('d:/test/test1.txt', response);
		}else{
			handle[pathname](client,result, response);
		}
		
	}else{
		console.log("Np request handle found for" + pathname +'\n');
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.write("404 not found");
		response.end();
	}
}

exports.route = route;

