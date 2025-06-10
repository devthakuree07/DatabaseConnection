const User = require('../models/User');

const getAllUsers = async (req , res) => {

  const userList = await User.findAll({
    attributes: { exclude: ['password']}
  });

  return res.json({ message: "Users fetched successfully!", data: userList});
};

const registerUser = async (req , res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({  email });
  if(existingUser){
     return res.json({ message: "User already exists!"});
  }

  const createUser = await User.create({ username, email, password});
  if(!createUser){
    return res.json({ message: "Invalid credentials!"});
  }
  return res.json({ message: "User registered successfully!"});
};

const loginUser= async (req , res) => {
  const {  email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return resjson({ message: "Invalid credentials!" });
    }

  if(user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

return res.json({ message: "User logged in successfully!"});
};


// const getUserById = async (req , res) => {
  
// };

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.json({ message: "User fetched successfully!", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};


const deleteUser = async (req , res) => {

};
const updateUser = async (req , res) => {

};


module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  deleteUser,
  updateUser,
};
