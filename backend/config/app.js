const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
require('../middlewares')(app);

// routes
require('../routes')(app);

module.exports = app;
