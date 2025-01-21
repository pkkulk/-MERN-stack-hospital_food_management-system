const mongoose = require('mongoose');

const DietChartSchema = new mongoose.Schema({
    die_chart_id: { type: String, required: true, unique: true },
    morning: {
        ing: [String],
        ins: { type: String },
    },
    evening: {
        ing: [String],
        ins: { type: String },
    },
    night: {
        ing: [String],
        ins: { type: String },
    },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DieChart', DietChartSchema,'die_chart');
