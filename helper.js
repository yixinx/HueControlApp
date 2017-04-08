var fs = require("fs");

module.exports = {
    renderFile: function(filename, response){
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

}