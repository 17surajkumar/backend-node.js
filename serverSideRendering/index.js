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

//middlewares routing
app.use(express.json());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>URL Shortener - All URLs</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f0f2f5;
            min-height: 100vh;
            padding: 40px 20px;
          }

          h1 {
            text-align: center;
            color: #1a1a2e;
            font-size: 2rem;
            margin-bottom: 10px;
          }

          .subtitle {
            text-align: center;
            color: #555;
            margin-bottom: 30px;
            font-size: 0.95rem;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
          }

          .stats-bar {
            background: #1a1a2e;
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.95rem;
          }

          .stats-bar span {
            font-weight: bold;
            color: #e94560;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          }

          thead {
            background: #1a1a2e;
            color: #ffffff;
          }

          thead th {
            padding: 14px 18px;
            text-align: left;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          tbody tr {
            border-bottom: 1px solid #f0f2f5;
            transition: background 0.2s;
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          tbody tr:hover {
            background: #f7f9fc;
          }

          td {
            padding: 14px 18px;
            color: #333;
            font-size: 0.9rem;
          }

          .short-id {
            font-weight: 600;
            color: #e94560;
            font-family: monospace;
            font-size: 1rem;
          }

          .redirect-url {
            color: #0077cc;
            text-decoration: none;
            word-break: break-all;
          }

          .redirect-url:hover {
            text-decoration: underline;
          }

          .clicks-badge {
            display: inline-block;
            background: #e94560;
            color: #fff;
            padding: 3px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.85rem;
          }

          .no-data {
            text-align: center;
            padding: 40px;
            color: #888;
            font-size: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>URL Shortener Dashboard</h1>
          <p class="subtitle">All shortened URLs and their analytics</p>

          <div class="stats-bar">
            Total URLs: <span>${allUrls.length}</span> &nbsp;|&nbsp;
            Total Clicks: <span>${allUrls.reduce((sum, url) => sum + url.visitHistory.length, 0)}</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Short ID</th>
                <th>Original URL</th>
                <th>Total Clicks</th>
              </tr>
            </thead>
            <tbody>
              ${
                allUrls.length === 0
                  ? `<tr><td colspan="4" class="no-data">No URLs found.</td></tr>`
                  : allUrls
                      .map(
                        (url, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td><span class="short-id">${url.shortId}</span></td>
                  <td><a class="redirect-url" href="${url.redirectURL}" target="_blank">${url.redirectURL}</a></td>
                  <td><span class="clicks-badge">${url.visitHistory.length}</span></td>
                </tr>`,
                      )
                      .join("")
              }
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `);
});

//Jo bhi routes urlRoute file me defined hain, un sab ke aage /url laga do.
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
