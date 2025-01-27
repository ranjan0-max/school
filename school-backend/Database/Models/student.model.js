const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String },
    father_name: { type: String, required: true },
    father_cnt_number: { type: String, required: true },
    mother_name: { type: String, required: true },
    mother_cnt_number: { type: String },
    address: { type: String, required: true },
    class_roll_no: { type: Number },
    tenth_roll_no: { type: Number },
    twelth_roll_no: { type: Number },
    current_class: { type: Schema.Types.ObjectId },
    today_presence: { type: Boolean },
    role_id: { type: Schema.Types.ObjectId, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

const Student = model('Student', studentSchema);
module.exports = Student;
