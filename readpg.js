var pg = require('pg');


var server = require("./server");
var router = require("./router");
var func = require("./function");

var handle = {}
handle["/"] = func.select;
handle["/select"] = func.select;
handle["/download"] = func.download;
handle["/index"] = func.index;
handle["/creatf"] = func.creatf;

//var constring = "postgres://postgres:1234@localhost:5432/test";
var constring = "postgres://postgres:postgres@192.168.1.104:5432/basedb";
//var constring = "postgres://postgres:postgres@58.246.146.186:5432/basedb";
var client = new pg.Client(constring);
client.connect(function(error, results){
	if(error){
		console.log('connect pgsql has error:'+ error.message);
		client.end();
		return;
	}
	console.log("client.connect OK.\n");
	client.query('select relname from pg_stat_user_tables;', function(err, result) {
    	if(err) {
      		return console.error('error running query', err);
    	}
    
    	server.start(client,result, router.route, handle);
    });
	
});