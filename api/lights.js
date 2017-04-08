var  http = require("http"),
    url = require("url"),
    fs = require("fs");

var callback = function(response){
    var str = ''
    response.on('data', function(chunk){
        str += chunk
    })
    response.on('end', function(){
        console.log(str)
    })
};

var availableLightsGet = function(){


};

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
		http.request(options, callback).write(bodyString);
	},

	infoGet: function(){
	    var options = {
		    "host": "192.168.0.12",
		    "path": "/api/qheFK7aEy9jwiZXI1gECL9Oe1DRcdReWPeKJiEm2/lights",
		    "method": "GET"
		}
		http.request(options, callback).end();
		}

}