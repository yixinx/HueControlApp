var  http = require("http"),
    url = require("url"),
    fs = require("fs"),
    mustache = require('mustache');


module.exports = {
	controlPut: function(status, bright){
		var bodyString = JSON.stringify({
		    on: status,
		    bri: bright
		});

		var headers = {
		    'Content-Type': 'application/json',
		    'Content-Length': bodyString.length
		};

	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/qheFK7aEy9jwiZXI1gECL9Oe1DRcdReWPeKJiEm2/lights/3/state",
		    "method": "PUT",
		    "headers": headers
		}
		http.request(options).write(bodyString);
	},

	infoGet: function(response){
	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/qheFK7aEy9jwiZXI1gECL9Oe1DRcdReWPeKJiEm2/lights",
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