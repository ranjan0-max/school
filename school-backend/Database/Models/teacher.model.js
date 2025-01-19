const { Schema, model } = require('mongoose');

const teacherSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String },
    date_of_joining: { type: Date, required: true },
    subject: { type: Array },
    father_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    mother_name: { type: String, required: true },
    address: { type: String, required: true },
    today_presence: { type: Boolean },
    remark: { type: String },
    role_id: { type: Schema.Types.ObjectId, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true }
});

const Teacher = model('Teacher', teacherSchema);
module.exports = Teacher;
