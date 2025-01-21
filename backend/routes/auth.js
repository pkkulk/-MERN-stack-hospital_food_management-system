const express = require("express");
const router = express.Router();
const UD = require("../models/UD");

const Task = require("../models/Task");

router.post("/login", async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      console.log("Request Body:", req.body);
  
      // Find user with matching Username
      const user = await UD.findOne({ username });
      console.log("Query:", { Username: req.body.username });
console.log("User Found:", user);
  
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
  
      // Check password
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }
  
      // Check role
      if (user.role !== role) {
        return res.status(403).json({ message: "Role mismatch!" });
      }
  
      res.status(200).json({ message: "Login successful", role: user.role });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  });
  
  (async () => {
    try {
      const testUser = await UD.find();
      console.log("All users:", testUser);

    } catch (err) {
      console.error("Test Query Error:", err);
    }
  })();
  
module.exports = router;
