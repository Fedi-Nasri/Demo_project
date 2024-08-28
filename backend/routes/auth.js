const express = require('express');
const { register, login, getUser, updateUser, deleteUser, getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id',deleteUser);
router.get('/users', getAllUsers);

module.exports = router;
