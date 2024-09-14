const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from the environment variables
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    // Retrieve the database name from the URI (for confirmation)
    const dbName = uri.split('/').pop().split('?')[0]; // Extracts the database name
    console.log(`Connected to MongoDB database: ${dbName}`);
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
