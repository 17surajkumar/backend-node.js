const express = require("express");
const app = express();

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const URL = require("./models/url");
const PORT = 8001;

//connect to the model means the database
// "short-url" is the database name
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected"),
);

//middlewares
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectURL);
});

// starting the server
app.listen(PORT, () => {
  console.log(`Server started at the Port ${8001}`);
});
