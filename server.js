var  http = require("http"),
    url = require("url"),
    fs = require("fs");

var lights = require("./api/lights");

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    console.log(uri)
    switch(uri){
        case '/control':
            lights.controlPut(true, 50);
        break;
        case '/lights-info':
            lights.infoGet();
        break;
        case '/bridge-info':
            bridge.infoGet();
        break;
        default:
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
    };
}).listen(8080);

function renderFile(filename, response){
        fs.readFile(filename, "binary", function(err, file) {
        if(err) {
            response.writeHeader(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
        }else{
            response.writeHeader(200);
            response.write(file, "binary");
            response.end();
        }    
    });
}
