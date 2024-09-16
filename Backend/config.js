// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

// Read the MONGO_URL from environment variables
const url = process.env.MONGO_URL;

const connectdb = async () => {
  try {
    await mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

module.exports = connectdb;
