const mongoose = require('mongoose');

const PantryStaffSchema = new mongoose.Schema({
    staff_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    availability:{ type: Boolean, required: true }
});

module.exports = mongoose.model('PantryStaff', PantryStaffSchema,'pantry_staff');
