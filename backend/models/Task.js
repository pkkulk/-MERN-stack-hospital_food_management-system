const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task_id: { type: String, required: true, unique: true },
    die_chart_id: { type: String, required: true },
    staff_id: { type: String, required: true },
    delivery_id: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
    prepared_at: { type: Date },
    delivered_at: { type: Date },
    task_des: { type: String },
  meal: { type: String },
});

module.exports = mongoose.model('Task', TaskSchema,'tasks');
