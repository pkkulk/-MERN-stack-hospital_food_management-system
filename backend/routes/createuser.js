const express=require('express');
const router =express.Router();
const UD=require("../models/UD");
const dri=require("../models/DeliveryStaff");
const Task=require("../models/Task");
const pant=require("../models/PantryStaff");

router.post("/create",async(req,res) => {
const {username,name,password,contact,role}=req.body;
      try{
    const user = await UD.insertMany([{username,name,password,contact,role}])
   
    console.log("the data of username ",user[0].username,"inserted succeesfully in UD");
    if (role === "Pantry Staff")
      {  const availability=true;

      const staff_id =username;
        const user1 = await pant.insertMany([{staff_id,name,contact,availability}])
        console.log("the data of username ",user1[0].username,"inserted succeesfully in Pantry Staff");
      }
    else if (role === "Delivery Personnel") {
      const availability=true;
      const delivery_id=username;
      const user2 = await dri.insertMany([{delivery_id,name,contact,availability}])
      console.log("the data of username ",user2[0].username,"inserted succeesfully in Delivery Staff");
    }
    else{ console.log("not inserted on both table");}
     res.status(200).json({message:"Done"});
   }
    catch(error){
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });  
    }
})
router.post("/delivery",async(req,res) => {
  const { task_id,patient_id,die_chart_id,staff_id,delivery_id,status,meal,task_des}=req.body;
        try{
      const user = await Task.insertMany([{task_id,patient_id,die_chart_id,staff_id,delivery_id,status,meal,task_des}])
     
         const b=await pant.updateOne({staff_id},{$set:{availability:false}});

         const b2=await dri.updateOne({delivery_id},{$set:{availability:false}});
      console.log("the data of task inserted succeesfully",user[0],"availability changes to false of",b,"availability changes to false of delivery",b2);
   res.status(200).json({message:"Done"});
     }
      catch(error){
          console.error("Error during login:", error);
          res.status(500).json({ message: "Internal server error", error: error.message });  
      }
  }
);

module.exports=router;