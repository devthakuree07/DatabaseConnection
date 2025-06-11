const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const userList = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({ message: "Users fetched successfully!", data: userList });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const createUser = await User.create({ username, email, password });

    if (!createUser) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    return res.status(200).json({ message: "User logged in successfully!" });
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User fetched successfully!", data: user });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({ where: { id: userId } });

    if (!deleted) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json({ message: "User updated successfully!", data: updatedUser });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  deleteUser,
  updateUser,
};
