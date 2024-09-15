
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateTokens } = require('../middlewares/authMiddleware');

exports.registerUser = async ({ name, email, password }) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = generateTokens(newUser.id);

    return { token, user: newUser };
    } catch (error) {
        throw error;
    }
};

exports.loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateTokens(user.id);

    return { token, user };
    } catch (error) {
        throw error;
    }
};
exports.refreshToken = async (refreshToken) => {
    try {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return reject('Unauthorized refresh token');
            }
            const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '15m' });
            resolve(accessToken);
            });
        });
    } catch (error) {
        throw error;
    }
};