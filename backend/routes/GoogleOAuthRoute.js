const express = require('express');
const router = express.Router();
const {getTokenGoogle,getInfoGoogle} = require ('../controllers/GoogleOAuthController');

router.get('/request',getTokenGoogle);
router.get('/', getInfoGoogle);

module.exports = router;