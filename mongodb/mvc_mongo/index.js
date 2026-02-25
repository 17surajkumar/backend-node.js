const express = require("express");
const { connectMongoDb } = require("./connections");

const userRouter = require("./routes/user"); //router

const { logReqRes } = require("./middlewares"); //middleware

const app = express();
const PORT = 8000;

//Connections
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
  console.log("MongoDB connected"),
);

//Middleware Pluggin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

// Starting the SERVER
app.listen(PORT, () => {
  console.log("Server is started on the port :" + PORT);
});

//------------------------------------------------------------------

/*

1. First Index.js
2. routes -> user.js
3. routes get its routers function from the controllers

index.js(USER)
    |
    V
routes(user.js) and connections.js
    |
    V
controller(user.js) (controller can manipulate the model)
    |
    V
models(user.js)

*/
