var fs = require("fs");

function createClass(result){
	fs.writeFile('message.txt', 'Just now, we have created this file', function(err){
		if(err) throw err;
		console.log('it saved in same location');
	})	
}


exports.createClass = createClass;