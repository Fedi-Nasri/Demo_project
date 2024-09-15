const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to generate access and refresh tokens
exports.generateTokens = (userid) => {
  const accessToken = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '15m' }); 
  const refreshToken = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '7d' }); 
  return { accessToken, refreshToken };
};

