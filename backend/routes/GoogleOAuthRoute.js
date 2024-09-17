const express = require('express');
const router = express.Router();
const {getGoogleAuthUrl,googleOAuthCallback } = require ('../controllers/GoogleOAuthController');

router.get('/request',getGoogleAuthUrl);
router.post('/google/callback', googleOAuthCallback );

module.exports = router;