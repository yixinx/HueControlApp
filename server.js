var http = require("http"),
    fs = require('fs'),
    url = require("url"),
    qs = require('querystring');

var lights = require("./api/lights");
var helper = require("./js/helper");
var bridge = require("./api/bridge");
var mustache = require('./js/mustache');

http.createServer(function(request, response) {
    console.log(request.url);
    var uri = url.parse(request.url).pathname;
    var userName = '';
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
                    lights.infoGet(userName, "lights", response);
                });
        break;
        case '/groups-info':
                request.on('data', function(chunk) {
                    userName += chunk;
                });
                request.on('end', function() {
                    console.log("Server: groups-info received");
                    console.log("Server: groups-info with username " + userName);
                    lights.infoGet(userName, "groups", response);
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
                    lights.controlPut(body);
                });
        break;
        case '/create-user':
            bridge.createUser(response);
        break;
        case '/upload-user':
            console.log("Get upload user command!");
            var body = '';
                request.on('data', function(chunk) {
                  body += chunk;
                });
                request.on('end', function() {
                    bridge.uploadUser(body, response);
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
