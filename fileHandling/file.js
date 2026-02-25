const fs = require("fs");

// console.log(fs);

//Synchronous call...
// fs.writeFileSync('./text.txt',"hey there,Good Morning")

//Asynchronous call... (required a call back )
// fs.writeFileSync("./text.txt", "Hey,Good Morning Async..", (err) => {});

// const res = fs.readFileSync('./demo.txt',"utf-8");
// console.log(res);

// This Asynchronous function required a call back jiske andar wo result and error value de dega

//-----------------------------------------------------------
// console.log("Start");

// fs.readFile("./demo.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log(result);
//   }
// });

// console.log("End");
//-----------------------------------------------------------

// fs.appendFileSync("./text.txt", "\nHello Append function");

fs.cpSync("./text.txt", "./copy.txt");
console.log(fs.statSync("./text.txt").isFile());
