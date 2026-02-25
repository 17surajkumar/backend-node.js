const http = require("http");
const fs = require("fs");
const url = require("url");

//make a callback function with the name myHandler
//const myServer = http.createServer(myHandler);

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} New request received\n`;

  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err, data) => {});

  switch (myUrl.pathname) {
    case "/":
      res.end("Home Page");
      break;
    case "/about":
      const userName = myUrl.query.name;
      res.end(`Hi ${userName}... Welcome to About Section`);
      break;

    case "/search":
      const search = myUrl.query.search_query;
      res.end("Here are your result for " + search);
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
