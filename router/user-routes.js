const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controller/user-controller");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);

module.exports = userRouter;
