const {
  getAllUsers,
  getUserById,
  getUser,
  registerUser,
  imgUpload,
  updateUser,
  loginUser,
  deleteUser,
} = require("../controllers/UserController");
const {
  authenticateToken,
  authorization,
} = require("../middlewares/AuthMiddleware");
const express = require("express");
const router = express.Router();


router.post("/users/add-user", registerUser);

router.post('/users/login-user',loginUser);

router.post("/users/upload-image", imgUpload);


router.get("/users/getAll-users", authenticateToken, authorization("ADMIN"), getAllUsers);


router.get("/users/get-userById/:id", authenticateToken, authorization("ADMIN"), getUserById);


router.put("/users/update-user", authenticateToken, updateUser);


router.delete("/users/delete-userById/:id", authenticateToken, authorization("ADMIN"), deleteUser);


router.get("/users/login-userDetails", authenticateToken, getUser);

module.exports = router;
