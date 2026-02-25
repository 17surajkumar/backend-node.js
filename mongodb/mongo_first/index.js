const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const { error } = require("console");
const { type } = require("os");
const app = express();
const PORT = 8000;


//connections
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo Error",err));

//Schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }
},
{timestamps : true}
);

// collection name is "user" using the model
const User = mongoose.model('user',userSchema);

app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  fs.appendFile('log.txt',`${Date.now()}: ${req.method}: ${req.path}\n`,(err,data) => {
    next();
  }) 
})


// This is the server side rendering
// Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});



// GET - All users
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});


// GET - User by ID
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({error: 'user not found'})
  return res.json(user);
});


//POST
app.post("/api/users", async (req, res) => {
  //create a new user
  const body = req.body;
  if(!body || !body.first_name || !body.email || !body.gender || !body.job_title || !body.last_name){
    return res.status(400).json({msg: "All fields are required"})
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  })

  console.log(result);
  return res.status(201).json({msg: "Success"});
  
});



//PATCH
app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
  return res.json({status: "success"});
});


//DELETE
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({status: "success"});
  
});




// Starting the SERVER
app.listen(PORT, () => {
  console.log("Server is started on the port :" + PORT);
});
