const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//--------------------------------------------------------------
// This is the server side rendering
app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

//--------------------------------------------------------------

app.get("/api/users", (req, res) => {
  return res.json(users);
});


app.post("/api/users", (req, res) => { //create a new user
  // TODO: create a new user
  res.json({ status: "pending" });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.patch("/api/users/:id", (req, res) => {
  // TODO: Edit the user with id
  return res.json({ status: "pending" });
});

app.delete("/api/users/:id", (req, res) => {
  // TODO: Delete the user with id
  return res.json({ status: "pending" });
});

//----------------------------------------------------
//To do the routing with same path we will be doing in single app routing
// "/api/users/:id" is same in every routing then we can merge them

//         app.patch() → Route method

//        "/api/users/:id" → Route path (Endpoint)

//        (req, res) => {} → Route handler (Callback function)


// app
//   .route("/api/users/:id")
//   .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
//   })
//   .put((req, res) => {
//     // TODO: Edit the user with id
//     return res.json({ status: "pending" });
//   })
//   .delete((req, res) => {
//     // TODO: Delete the user with id
//     return res.json({ status: "pending" });
//   });

//-------------------------------------------------------

app.listen(PORT, () => {
  console.log("Server is started on the port :" + PORT);
});
