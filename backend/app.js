const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/auth');
const authRouter = require('./oauth');
const requestRouter = require('./routes/requestOAuth');
// Use routes
app.use('/api/auth', authRoutes);
app.use('/oauth', authRouter);
app.use('/request', requestRouter);

module.exports = app;
