const express = require('express');
const { register, login , refresheToken} = require('../controllers/authController');
const {verfiyToken} = require ('../middleswares/authMiddleware');
const {getUser, updateUser, deleteUser, getAllUsers}= require ('../controllers/usersController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh',refresheToken);
router.get('/users/:id',verfiyToken,getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id',deleteUser);
router.get('/users',getAllUsers);

module.exports = router;
