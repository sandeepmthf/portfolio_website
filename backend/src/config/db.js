const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  const env = process.env.NODE_ENV || "development";
  
  if (!uri) {
    if (env === "production") {
      throw new Error("MONGO_URI is not configured");
    }
    // eslint-disable-next-line no-console
    console.warn("⚠️  MONGO_URI not configured. Running in demo mode.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    // eslint-disable-next-line no-console
    console.log("✅ MongoDB connected");
  } catch (error) {
    if (env === "production") {
      throw error;
    }
    // eslint-disable-next-line no-console
    console.warn("⚠️  MongoDB connection failed. Running in demo mode:", error.message);
  }
};

module.exports = connectDB;
