var  http = require("http");

module.exports = {
	controlPut: function(host, data){
		var jsonData = JSON.parse(data);
		var headers = {
		    'Content-Type': 'text/json',
		    "Access-Control-Allow-Origin": "*"
		};

	    var options = {
		    "host": host,
		    "path": "/api/" + jsonData.username + "/lights/3/state",
		    "method": "PUT",
		    "headers": headers
		};
		delete jsonData.username;
		http.request(options).write(JSON.stringify(jsonData));
	},

	infoGet: function(host, userName, type, response){
	    var options = {
		    "host": host,
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