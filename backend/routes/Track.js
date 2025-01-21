const express = require('express');
const router=express.Router();
const Task=require("../models/Task");

const Pa=require("../models/patient");
const Da=require("../models/DeliveryStaff");

const DT=require("../models/Diechart");
const PT=require("../models/PantryStaff");

router.get("/track",async(req,res)=>{
    try{
const data= await Task.find();
res.status(200).json(data);
    }
    catch(error){
        console.log("unable to fetch",error);
        res.status(500).json({message:"unable to fetch data "});
    }
});
router.post("/deliveryinfo",async(req,res)=>{
  try{
    const {delivery_id }= req.body;

    console.log(" got id in delivery info",delivery_id)
const data= await Da.findOne({delivery_id:delivery_id});
console.log("got data in deliveryInfo" ,data);

res.status(200).json(data);
  }
  catch(error){
      console.log("unable to fetch",error);
      res.status(500).json({message:"unable to fetch data "});
  }
});
router.post("/delivery2", async (req, res) => {
  try {
    const { delivery_id } = req.body;
    console.log(" got id",delivery_id)
    if (!delivery_id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await Task.findOne({ delivery_id: delivery_id });
    if (!data) {
      return res.status(404).json({ message: "No tasks found" });
    } 
    console.log("got data in delivery2",data);

    return res.status(200).json(data); // Correct status code
  } catch (error) {
    console.error("Unable to fetch data:", error);
    res.status(500).json({ message: "Unable to fetch data" });
  }
});
router.post("/delivery3", async (req, res) => {
  try {
    const { task_id } = req.body;
    console.log( "delivery id found for update",task_id );
    if (!task_id) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const data = await Task.findOne({ task_id });
    if (!data) {
      return res.status(404).json({ message: "No tasks found" });
    }
    data.status = "completed";
        data.save();
        console.log("status is saved as completed by delivery id",task_id);
    return res.status(200).json(data); // Correct status code
  } catch (error) {
    console.error("Unable to fetch data:", error);
    res.status(500).json({ message: "Unable to fetch data" });
  }
});
router.post("/track2", async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "Invalid ID" });
      }
  
      const data = await Task.findOne({ staff_id: id });
      if (!data) {
        return res.status(404).json({ message: "No tasks found" });
      }
  
      return res.status(200).json(data); // Correct status code
    } catch (error) {
      console.error("Unable to fetch data:", error);
      res.status(500).json({ message: "Unable to fetch data" });
    }
  });
  router.post("/die2", async (req, res) => {
    try {
      const  {die_chart_id} = req.body;
      console.log("got diechart id",die_chart_id);
      if (!die_chart_id) {
        return res.status(400).json({ message: "Invalid ID" });
      }
  
      const data = await DT.findOne({ die_chart_id});
      if (!data) {
        return res.status(404).json({ message: "No tasks found" });
      }
  
      return res.status(200).json(data); // Correct status code
    } catch (error) {
      console.error("Unable to fetch data:", error);
      res.status(500).json({ message: "Unable to fetch data" });
    }
  });
  router.post("/task2", async (req, res) => {
    try {
        const { staff_id,task_id, meal } = req.body; // Corrected destructuring syntax
        console.log("Got task ID for updating status", task_id);
        console.log("Got meal box number",meal);
        if (!task_id) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const data = await Task.findOne({ task_id });
        const d2=await PT.updateMany({staff_id},{$set: {availability:true} });
        if (!data) {
            return res.status(404).json({ message: "No tasks found" });
        }
        if (!d2) {
          console.log("no avalability change of staff");
        }

        // Update the task's status and meal
        data.status = "in progress";
        data.meal = meal; // Corrected assignment

        await data.save();
        return res.status(200).json(data); // Send the updated task data back
    } catch (error) {
        console.error("Unable to fetch data:", error);
        res.status(500).json({ message: "Unable to fetch data" });
    }
});

  

router.get("/patient-data",async (req,res)=>{
   try{
   const data=await Pa.find();
   res.status(200).json(data);
   }catch(error){
   console.log("unable to fetch",error)

   res.status(500).json({message:"unable to fetch data "})
   }})
   
   router.get("/delivery-data",async(req,res)=>{
   try{
      const data=await Da.find();
      console.log("data sent of delivery");
      res.status(200).json(data);

   }catch(error){
  console.log("errror in fetch");
   }

   })
   router.get("/pantry",async(req,res)=>{
    try{
       const data=await PT.find();
       console.log("data sent of pantry");
       res.status(200).json(data);
 
    }catch(error){
   console.log("errror in fetch");
    }
 
    })
    router.get("/die",async(req,res)=>{
        try{
           const data=await DT.find({}, { die_chart_id: 1, _id: 0 })
           console.log("data sent of diechart");
           res.status(200).json(data);
     
        }catch(error){
       console.log("errror in fetch");
        }
     
        });

        router.post("/updatePersonal", async (req, res) => {
          try {
              const { delivery_id, contact, name } = req.body;
              console.log("got information for updata of id",delivery_id);
      
              if (!delivery_id || !contact || !name) {
                  return res.status(400).json({ message: "Invalid input. delivery_id, contact, and name are required." });
              }
      
              // Update the document(s) matching the delivery_id
              const data = await Da.updateOne(
                  { delivery_id }, // Filter: Match the delivery_id
                  {
                      $set: {
                          contact, // Set the new contact value
                          name,    // Set the new name value
                      },
                  }
              );
      
              console.log("Delivery details updated:", data);
      
              if (data.modifiedCount === 0) {
                  return res.status(404).json({ message: "No delivery found with the specified delivery_id." });
              }
      
              res.status(200).json({ message: "Delivery details updated successfully.", data });
          } catch (error) {
              console.error("Error updating delivery details:", error);
              res.status(500).json({ message: "An error occurred while updating delivery details." });
          }
      });
      
      router.post("/updateAvailability", async (req, res) => {
        try {
            const { delivery_id, availability } = req.body;
            console.log("got information for updata of id",delivery_id);
    
            if (!delivery_id || !availability) {
                return res.status(400).json({ message: "Invalid input. delivery_id" });
            }
    
            // Update the document(s) matching the delivery_id
            const data = await Da.updateOne(
                { delivery_id }, // Filter: Match the delivery_id
                {
                    $set: {
                      availability
                    },
                }
            );
    
            console.log("Delivery details updated:", data);
    
            if (data.modifiedCount === 0) {
                return res.status(404).json({ message: "No delivery found with the specified delivery_id." });
            }
    
            res.status(200).json({ message: "Delivery details updated successfully.", data });
        } catch (error) {
            console.error("Error updating delivery details:", error);
            res.status(500).json({ message: "An error occurred while updating delivery details." });
        }
    });
    
     



module.exports=router;
