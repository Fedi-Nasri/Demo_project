const jwt = require('jsonwebtoken');
const authService = require('../services/authServices');

exports.refreshToken= async (req,res)=>{
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({message:'Unauthorized refresh token '});
    }
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};


exports.refreshTokenNew= async (req,res)=>{
  const { refreshToken } = req.body;
  try {
    const accessToken = await authService.refreshToken(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

exports.register = async (req,res) =>{
  const { name, email, password } = req.body;
  try {
    const { token, user } = await authService.registerUser({ name, email, password });
    res.status(201).json({ token, user });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}

exports.login = async (req,res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.loginUser({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: 'Something went wrong' });
  }
}
