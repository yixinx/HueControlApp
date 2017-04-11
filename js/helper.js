var fs = require("fs");

module.exports = {
    renderFile: function(filename, response){

        console.log(filename + "renderfile"); 
        if(filename.indexOf('.html') != -1){
            fs.readFile('.' + filename, function (err, data){
            response.writeHeader(200, {'Content-Type': 'text/html','Content-Length':data.length});
            response.write(data);
            response.end();
            });
            return true;
        }

        if(filename.indexOf('.css') != -1){
            fs.readFile('.' + filename,function (err, data){
            response.writeHeader(200, {'Content-Type': 'text/css'});
            response.write(data);
            response.end();
            });
            return true;
        }

        if(filename.indexOf('.js') != -1){
            fs.readFile('.' + filename, function (err, data){
                if(err) {
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                }else{
                    response.writeHeader(200, {'Content-Type': 'text/javascript'});
                    response.write(data);
                    response.end();
                }  
            });
            return true;
        }
        return false;
    }
}