const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const DQ = require('../models/DeliveryStaff');
const PQ = require('../models/PantryStaff');
const { trusted } = require('mongoose');

// Route to delete a task
router.delete('/tasks', async (req, res) => {
  const { task_id} = req.body;
  console.log('Request body:', req.body); // Debugging log

  try {
    // Check if the task_id is provided
    if (!task_id) {
      return res.status(400).json({ message: 'Task ID is required' });
    }

    // Find and delete the task
    const result = await Task.deleteMany({task_id });  
    console.log('Delete result:', result);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

router.post('/update',async(req,res)=>{
  const { staff_id,delivery_id} = req.body;
  console.log("staff id",staff_id,'delivery id:',delivery_id);
  console.log('Request body:', req.body); // Debugging log
  try{
  const pan= await PQ.updateOne({staff_id:staff_id},{ $set : {availability:true}});
  const Dan= await DQ.updateOne({delivery_id:delivery_id},{ $set : {availability:true}});
  console.log("Delivery id and staff id updated",pan,"",Dan);
  }catch(error)
  {
    console.error('Error updating :', error);
    res.status(500).json({ message: 'Error deleting task', error });

  }

})
module.exports = router;
