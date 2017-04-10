var  http = require("http"),
    url = require("url"),
    fs = require("fs");

module.exports = {
	css: function(request, response) {
		  if (request.url === '/style.css') {
		    response.writeHead(200, {'Content-type' : 'text/css'});
		    var fileContents = fs.readFileSync('./style.css');
		    response.write(fileContents);
		  }
	}  


}