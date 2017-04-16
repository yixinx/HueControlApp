var  http = require("http");

module.exports = {
	createUser: function(host, response){
		var data = JSON.stringify({devicetype: 'my_hue_app#iphone peter'});
		var headers = {
		    'Content-Type': 'text/json',
		    "Access-Control-Allow-Origin": "*"
		};
	    var options = {
		    "host": host,
		    "path": "/api",
		    "method": "POST",
		    "headers": headers
		};
		http.request(options, function(res){
		    var str = '';
		    res.on('data', function(chunk){
		        str += chunk
		    })
		    res.on('end', function(){
		    	console.log(JSON.parse(str));
		        response.writeHeader(200, {"Content-Type": "text/json"});
		        response.write(str);
		        response.end();
		    })
		}).write(data);
	},

	uploadUser: function(host, userName, response){
	    var options = {
		    "host": host,
		    "path": "/api/" + userName,
		    "method": "GET"
		}
		http.request(options, function(res){
		    var str = ''
		    res.on('data', function(chunk){
		        str += chunk
		    })
		    res.on('end', function(){
		        console.log(JSON.parse(str));
		        response.writeHeader(200, {"Content-Type": "text/json"});
		        response.write(str);
		        response.end();
		    })
		}).end();
	}
}