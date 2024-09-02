require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Get the MongoDB URI from the environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
      console.log('Connected to MongoDB');
      // Retrieve the database name from the URI (for confirmation)
      const dbName = uri.split('/').pop().split('?')[0]; // Extracts the database name
      console.log(`Connected to MongoDB database: ${dbName}`);
    })
    .catch(err => console.error('Connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});