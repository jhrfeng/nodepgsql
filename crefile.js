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
    		//读取template
    		fs.readFile('./template/entity.java', {encoding:'utf8'},function (err, data) {
        		map = JSON.parse(data);
                var package = packages;
                var className = tables[i];
                var fileName = className+".java";
                var clounm = "";
                var setGet = "";
                for(var attr in data){
                	 clounm += "private "+ data[attr] + " "+attr+";\n";
                	 setGet += "public set"+dattr+ "("+data[attr]+" "+attr+"){\n this."+attr+"="+attr+"\n}\n public "+data[attr]+ "get(){\n return "+ attr+"\n}\n";
                }
				JSON.stringify(map). (/"${clounm}"/g,clounm);
				JSON.stringify(map). (/"${setGet}"/g,setGet);
				JSON.stringify(map). (/"${package}"/g,package);

        		//创建java实体类文件
        		fs.writeFile(fileName, map ,{encoding:'utf8',flag:'w'}, function(err){
					if(err) throw err;
					console.log('it saved in same location');
				})	

    		});
    	});
	}   
	
}

function loadTemplate(path){
    fs.readFile(path, {encoding:'utf8'},function (err, data) {
        map = JSON.parse(data);
    });
}

function createClass(result){
	//创建java实体类文件
	for(var )
	fs.writeFile();
	
	//创建DAO接口文件
	fs.writeFile();

	//创建xml文件
	fs.writeFile();
	fs.writeFile('message.java', 'Class Message ', function(err){
		if(err) throw err;
		console.log('it saved in same location');
	})	
}


exports.createFile = createFile;