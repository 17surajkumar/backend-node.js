const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();


//GET - All users and POST
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);


//User by ID , PATCH , DELETE
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

// // GET - All users
// router.get("/", handleGetAllUsers);

// // GET - User by ID
// router.get("/:id", handleGetUserById);

// //POST
// router.post("/", handleCreateNewUser);

// //PATCH
// router.patch("/:id", handleUpdateUserById);

// //DELETE
// router.delete("/:id", handleDeleteUserById);
