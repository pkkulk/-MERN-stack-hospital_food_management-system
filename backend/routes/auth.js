const express = require("express");
const router = express.Router();
const UD = require("../models/UD");

const Pa = require("../models/patient");

const ta = require("../models/Task");
const Da = require("../models/DeliveryStaff");
const Pa2 = require("../models/PantryStaff");
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
router.get('/actives',async(req,res)=>{
      try{
        const pa=await Pa.countDocuments();
        const da1=await Da.countDocuments();
        const da2=await Da.countDocuments({availability:true});
        const pa2=await Pa2.countDocuments();
        const pa3=await Pa2.countDocuments({availability:true});
        
        const t1=await Task.countDocuments();
        const t2=await Task.countDocuments({status:'completed'});
        
        res.status(200).json({
          pa: pa,
          da1: da1,
          da2:da2,
          pa2: pa2,
          pa3:pa3,
          t1: t1,
          t2: t2,
        });
        console.log("patients data send",pa,da1,pa2,t1,t2);
      }
      catch(error){
        console.log("countDocument not working",error);
        res.status(500).json({ message: "Internal server error", error });
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
