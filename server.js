var  http = require("http"),
    url = require("url"),
    fs = require("fs");

var bodyString = JSON.stringify({
    on: false,
    bri: 50
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

callback = function(response) {
    console.log("reach callback")
    var str = ''
    response.on('data', function(chunk){
        str += chunk
    })

    response.on('end', function(){
        console.log(str)
    })
}

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    console.log(uri)
    switch(uri){
        case '/':
            http.request(options, callback).write(bodyString);
        break;
        case 'info':
            renderFile('info.html', response);
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
