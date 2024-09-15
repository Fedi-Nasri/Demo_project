const User = require('../models/User');
const userService = require('../services/usersServices');

exports.getUserNew = async (req,res) => {
  try {
      const user = await userService.getUser(req.params.id);
      res.status(200).json(user);
  } catch (error) {
      console.error('Error:', error);
      if (error.message === "User not found !") {
          return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.name = name || user.name;
      user.email = email || user.email;
  
      if (password) {
        user.password = await bcrypt.hash(password, 12);
      }
  
      const updatedUser = await user.save();
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      await User.findByIdAndDelete(req.params.id);
  
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };