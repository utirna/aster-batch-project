const http = require("http");

let server = http.createServer(function (request, response) {
  response.write("<h1 style='color:red'>This change is deu to nodemon</h1>");
  response.end();
});

server.listen(3001, function () {
  console.log("server started...3001");
});
/*
    http
    fs
    path
    event    
*/
