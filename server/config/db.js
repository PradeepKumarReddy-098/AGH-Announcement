const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(mongoUri);
  isConnected = true;

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
  });

  return mongoose.connection;
};

module.exports = connectDB;
