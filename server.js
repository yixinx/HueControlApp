var http = require("http"),
    fs = require('fs'),
    url = require("url");

var lights = require("./api/lights");
var helper = require("./helper");
var mustache = require('mustache');

var view = {
  title: "Joe",
  calc: function() {
    return 2 + 4;
  }
};

var template = "<h1>{{title}}</h1>";

var model = {
    title: 'Mustache'
}

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    console.log(uri)
    switch(uri){
        case '/':
            fs.readFile('index.html',function (err, data){
            response.writeHeader(200, {'Content-Type': 'text/html','Content-Length':data.length});
            response.write(data);
            response.end();
    });
        // var html = mustache.to_html(template, model)
        // response.writeHeader(200, {'Content-Type': 'text/html'})
        // response.write(html)
        // response.end()
        break;
        case '/test':
            lights.infoGet(response);
        break;
        case '/control':
            lights.controlPut(true, 50);
        break;
        case '/lights-info':
            lights.infoGet(response);

        break;
        default:
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
    };
}).listen(8080);
