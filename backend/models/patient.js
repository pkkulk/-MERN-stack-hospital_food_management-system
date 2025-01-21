const mongoose =require(`mongoose`);
const patientschema=new mongoose.Schema(
{  patient_id:{ type:String,required:true},
    name:{ type:String,required:true},
    diseases: [String],
    allergies: [String],
    room_number: { type: String, required: true },
    bed_number: { type: String, required: true },
    floor_number: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contact: { type: String, required: true },
    emergencyContact: { type: String, required: true },
}
);
module.exports=mongoose.model(`patient`,patientschema,`patients`);