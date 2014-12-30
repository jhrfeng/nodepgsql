var fs = require("fs");

function createFile(tables, packages, client){

    var size = Object.keys(tables).length;
	for(var i=0; i<size; i++){		
		console.log(tables[i]);
		client.query("select column_name,data_type from information_schema.columns where table_name='"+ tables[i] +"';", function(err, result) {
    		if(err) return console.error('error running query', err);
    		var rows = result["rows"];
    		var data =[];
    		//类型正则验证
    		for(var i=0; i<rows.length; i++){
    			var type = row[i]["data_type"];
    			if(/int/.test(type))
    				data[rows[i]["column_name"]] = "Integer";
    			else if(/char/.test(type))
					data[rows[i]["column_name"]] = "String";
				else if(/date/.test(type))
					data[rows[i]["column_name"]] = "Date";
				else if(/timestamp/.test(type))
					data[rows[i]["column_name"]] = "Timestamp";
    		}
    	});
	}   
	
}

function createClass(result){
	//创建java实体类文件
	fs.writeFile();
	
	//创建DAO接口文件
	fs.writeFile();

	//创建xml文件
	fs.writeFile();
	fs.writeFile('message.txt', 'Just now, we have created this file', function(err){
		if(err) throw err;
		console.log('it saved in same location');
	})	
}


exports.createFile = createFile;