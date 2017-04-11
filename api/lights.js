var  http = require("http"),
    url = require("url"),
    fs = require("fs");

module.exports = {
	controlPut: function(data){
		var jsonData = JSON.parse(data);
		var headers = {
		    'Content-Type': 'text/json',
		    "Access-Control-Allow-Origin": "*"
		};

	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/" + jsonData.username + "/lights/3/state",
		    "method": "PUT",
		    "headers": headers
		};
		delete jsonData.username;
		http.request(options).write(JSON.stringify(jsonData));
	},

	infoGet: function(userName, type, response){
	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/" + userName + "/" +type,
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