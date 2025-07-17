const mongoose = require('mongoose');
require('dotenv').config()

const uri=process.env.DATABASE_URL || 'mongodb://localhost:27017/smartnotes';

const connectToMongo = async () => {
  try {
    await mongoose.connect(uri, {
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongo;