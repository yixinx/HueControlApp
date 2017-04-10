var  http = require("http"),
    url = require("url"),
    fs = require("fs");


module.exports = {
	createUser: function(response){
		
		var bodyString = JSON.stringify({
		    devicetype: 'my_hue_app#iphone peter'
		});
		var headers = {
		    'Content-Type': 'text/json',
		    "Access-Control-Allow-Origin": "*"
		};

	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api",
		    "method": "POST",
		    "headers": headers
		}
		http.request(options, function(res){
		    var str = ''
		    res.on('data', function(chunk){
		        str += chunk
		    })
		    res.on('end', function(){
		        response.writeHeader(200, {"Content-Type": "text/json"});
		        response.write(str);
		        console.log(JSON.parse(str));
		        response.end();
		    })
		}).write(bodyString);
	}
}