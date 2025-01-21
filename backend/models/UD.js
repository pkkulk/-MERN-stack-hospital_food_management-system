const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  contact: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // Role: Manager, Pantry Staff, etc.
});

// Export the Model
const UD = mongoose.model('UD', userSchema,'UD');
module.exports = UD;
