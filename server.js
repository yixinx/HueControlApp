var http = require("http"),
    fs = require('fs'),
    url = require("url"),
    qs = require('querystring');

var lights = require("./api/lights");
var helper = require("./helper");
var mustache = require('mustache');

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    switch(uri){
        case '/':
            fs.readFile('index.html',function (err, data){
            response.writeHeader(200, {'Content-Type': 'text/html','Content-Length':data.length});
            response.write(data);
            response.end();
        });
        break;
        case '/get-info':
            console.log("Get get-info command!");
            lights.infoGet(response);
        break;
        case '/control':
            console.log("Get control command!");
            var body = '';
                request.on('data', function(chunk) {
                  body += chunk;
                });
                request.on('end', function() {
                    lights.controlPut(body);
                });
        break;
        case '/create-user':
        break;
        default:
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
    };
}).listen(8080);
