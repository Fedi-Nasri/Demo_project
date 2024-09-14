const express = require('express');
const { register, login , refresheToken} = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh',refresheToken);


module.exports = router;
