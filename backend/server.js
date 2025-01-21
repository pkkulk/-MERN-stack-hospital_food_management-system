const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Tracer= require("./routes/Track");
const authRoutes = require("./routes/auth");
const creates = require("./routes/createuser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: "admin",
})
  .then(() => console.log("MongoDB connected successfully")
)
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/createuser", creates);

app.use("/api/Track", Tracer);
app.get("/", async (req, res) => {
  try {
    // Fetch list of collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    // Send collections as part of the root response
    res.status(200).json({
      message: "Welcome to the Hospital Management API!",
      collections: collectionNames,
    });
  } catch (err) {
    console.error("Error retrieving collections:", err);
    res.status(500).json({ message: "Failed to retrieve collections", error: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
