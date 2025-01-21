const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://prathmeshkulkarni312:<db_password>@cluster0.8s9j9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas successfully!");
    return client; // Export this to use in your app
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if connection fails
  }
}

module.exports = connectDB;
