var  http = require("http"),
    url = require("url");

var lights = require("./api/lights");
var helper = require("./helper");

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    console.log(uri)
    switch(uri){
        case '/':
            helper.renderFile('welcome.html', response);
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
