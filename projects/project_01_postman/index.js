const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("Hello Middleware 1 is called");
//   req.myUsername = "surajkumar";
//   next();

// })

app.use((req, res, next) => {
  fs.appendFile('log.txt',`${Date.now()}: ${req.method}: ${req.path}\n`,(err,data) => {
    next();
  }) 

})


app.use((req, res, next) => {
  console.log("Hello Middleware 2 is called");
  next();
})

//--------------------------------------------------------------
// This is the server side rendering
// Routes
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
  res.setHeader('X-MyName',"Suraj Kumar");
  return res.json(users);
});


app.post("/api/users", (req, res) => {
  //create a new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

//PATCH
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ status: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], ...body };

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "Error updating file" });
    }

    return res.json({ status: "success", updatedUser: users[userIndex] });
  });
});

//DELETE
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ status: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "Error deleting user" });
    }

    return res.json({ status: "success", deletedUser });
  });
});

app.listen(PORT, () => {
  console.log("Server is started on the port :" + PORT);
});
