var  http = require("http"),
    url = require("url"),
    fs = require("fs");


module.exports = {
	controlPut: function(data){
		var controlData = data;
		console.log(controlData);

		var headers = {
		    'Content-Type': 'text/json',
		    "Access-Control-Allow-Origin": "*"
		};

	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/qheFK7aEy9jwiZXI1gECL9Oe1DRcdReWPeKJiEm2/lights/3/state",
		    "method": "PUT",
		    "headers": headers
		}
		http.request(options).write(controlData);
	},

	infoGet: function(type, response){
		console.log(type);
	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/qheFK7aEy9jwiZXI1gECL9Oe1DRcdReWPeKJiEm2/"+type,
		    "method": "GET"
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
		}).end();

	}
}