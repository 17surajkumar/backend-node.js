const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { error } = require("console");

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

// GET - All users

app.get("/api/users", (req, res) => {
  res.setHeader('X-MyName',"Suraj Kumar");
  return res.json(users);
});



//POST

app.post("/api/users", (req, res) => {
  //create a new user
  const body = req.body;
  if(!body || !body.first_name || !body.email || !body.gender || !body.job_title || !body.last_name){
    return res.status(400).json({msg: "All fields are required"})
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if(!user) return res.status(404).json({error: 'user not found'})
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


// Starting the SERVER

app.listen(PORT, () => {
  console.log("Server is started on the port :" + PORT);
});
