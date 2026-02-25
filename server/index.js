const http = require("http");
const fs = require("fs");


// console.log(http);

// Incoming request ko process krne ke liye we will going to use a callback function known as request listeners (request , response)

// callbacks run for every request
// Creating a log and audit for every request



const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New request received\n`;
  
  fs.appendFile("log.txt", log, (err, data) => {});


  //res.end("Hello From Server from Port 8000..."); // sends response to browser

  switch (req.url) {
    case "/":
      res.end("Home Page");
      break;
    case "/about":
      res.end("About Page");
      break;
    default:
      res.end("Not Found 404");
      break;

  }
});


// Starting a server...
myServer.listen(8000, () => {
  console.log("Server Running on port 8000");
});
