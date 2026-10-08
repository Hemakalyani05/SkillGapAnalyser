const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set in environment variables.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = !!conn.connections[0].readyState;

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDB;
