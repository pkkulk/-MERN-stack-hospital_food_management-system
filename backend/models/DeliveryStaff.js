const mongoose = require('mongoose');

const DeliveryStaffSchema = new mongoose.Schema({
    delivery_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contact: { type: String, required: true },
    availability: { type: Boolean, required: true }
});

module.exports = mongoose.model('DeliveryStaff', DeliveryStaffSchema,'delivery_staff');
