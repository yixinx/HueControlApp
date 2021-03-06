var http = require("http"),
    url = require("url");

var lights = require("./api/lights");
var helper = require("./js/helper");
var bridge = require("./api/bridge");
var mustache = require('./js/mustache');

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    var userName = '';
    var host = "192.168.0.12";

    switch(uri){
        case '/':
            helper.renderFile('/html/index.html', response);
        break;
        case '/lights-info':
                request.on('data', function(chunk) {
                    userName += chunk;
                });
                request.on('end', function() {
                    console.log("Server: lights-info received");
                    console.log("Server: lights-info with username " + userName);
                    lights.infoGet(host, userName, "lights", response);
                });
        break;
        case '/groups-info':
                request.on('data', function(chunk) {
                    userName += chunk;
                });
                request.on('end', function() {
                    console.log("Server: groups-info received");
                    console.log("Server: groups-info with username " + userName);
                    lights.infoGet(host, userName, "groups", response);
                });
        break;
        case '/control':
            var body = '';
                request.on('data', function(chunk) {
                  body += chunk;
                });
                request.on('end', function() {
                    console.log("Server: control received");
                    console.log("Server: control with " + body);
                    lights.controlPut(host, body);
                });
        break;
        case '/create-user':
            console.log("Server: create-user received");
            bridge.createUser(host, response);
        break;
        case '/upload-user':
                request.on('data', function(chunk) {
                  userName += chunk;
                });
                request.on('end', function() {
                    console.log("Server: upload-user received");
                    console.log("Server: upload-user with username " + userName);
                    bridge.uploadUser(host, userName, response);
                });
        break;
        default:
            if (helper.renderFile(uri, response) == false){
                response.writeHeader(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
            }
    };
}).listen(8080);
